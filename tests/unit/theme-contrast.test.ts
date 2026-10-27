import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../../src/app/styles/tokens.css', import.meta.url), 'utf8');
const blocks = [css.match(/:root\s*\{([^}]+)\}/)![1]!, css.match(/:root\[data-theme='dark'\]\s*\{([^}]+)\}/)![1]!];

function luminance(hex: string): number {
  const rgb = hex.slice(1).match(/../g)!.map((pair) => {
    const channel = parseInt(pair, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722;
}

describe('TASK-P0-002: token contrast policy', () => {
  it.each(['light', 'dark'])('%s tokens meet AA text and control contrast', (theme) => {
    const tokens = Object.fromEntries([...blocks[theme === 'light' ? 0 : 1]!.matchAll(/--ui-([\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [match[1], match[2]]));
    const pairs: [string, string, number][] = [
      ...['ink', 'muted', 'danger', 'success'].flatMap((ink): [string, string, number][] => [
        [ink, 'surface', 4.5], [ink, 'panel', 4.5],
      ]),
      ['on-accent', 'accent', 4.5], ['on-accent', 'accent-hover', 4.5],
      ['focus', 'surface', 3], ['focus', 'panel', 3], ['border', 'panel', 3],
    ];
    for (const [foreground, background, minimum] of pairs) {
      const a = luminance(tokens[foreground]!);
      const b = luminance(tokens[background]!);
      expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), `${theme}: ${foreground}/${background}`).toBeGreaterThanOrEqual(minimum);
    }
  });
});
