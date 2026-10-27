import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');
const outputDir = join(projectRoot, '.output/chrome-mv3');

// Check generated output, so WXT defaults and bundler changes are covered too.
beforeAll(() => {
  const wxtCli = fileURLToPath(new URL('../bin/wxt.mjs', import.meta.resolve('wxt')));
  execFileSync(process.execPath, [wxtCli, 'build', '-b', 'chrome', '--mv3'], {
    cwd: projectRoot,
    stdio: 'pipe',
    timeout: 55_000,
  });
});

function filesUnder(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

describe('TASK-P0-001: unpacked extension bootstrap', () => {
  it('builds an MV3 popup without site access, background capture or content injection', () => {
    const manifest = JSON.parse(readFileSync(join(outputDir, 'manifest.json'), 'utf8'));

    expect(manifest).toMatchObject({
      manifest_version: 3,
      name: 'Frontend DevKit',
      version: '0.1.0',
      action: { default_popup: 'popup.html' },
    });
    expect(manifest.permissions ?? []).toEqual([]);
    expect(manifest.host_permissions ?? []).toEqual([]);
    expect(manifest.optional_permissions ?? []).toEqual([]);
    expect(manifest.optional_host_permissions ?? []).toEqual([]);
    expect(manifest.content_scripts ?? []).toEqual([]);
    expect(manifest.background).toBeUndefined();
    expect(manifest.externally_connectable).toBeUndefined();
  });

  it('ships only local scripts with a CSP that blocks runtime network and eval', () => {
    const manifest = JSON.parse(readFileSync(join(outputDir, 'manifest.json'), 'utf8'));
    expect(manifest.content_security_policy.extension_pages).toBe(
      "script-src 'self'; object-src 'none'; connect-src 'none'",
    );

    const html = readFileSync(join(outputDir, 'popup.html'), 'utf8');
    const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)];
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) {
      const src = script[1]!;
      expect(src).toMatch(/^\/(?:assets|chunks)\/[\w.-]+\.js$/);
      expect(statSync(join(outputDir, src.slice(1))).isFile()).toBe(true);
    }
    expect(html).not.toMatch(/<script\b[^>]*>(?!\s*<\/script>)/);

    const bundle = filesUnder(outputDir)
      .filter((path) => path.endsWith('.js'))
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');
    expect(bundle).not.toMatch(/\beval\s*\(|\bnew Function\s*\(/);
  });
});
