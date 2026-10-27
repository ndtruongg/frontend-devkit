# Testing Strategy

## Layers
- Unit (Vitest): pure domain, parsers, validators, converters, security edge cases.
- Component (Vue Test Utils): loading/error/empty, keyboard, clipboard feedback, responsive.
- Integration: mocked Chrome APIs, permission denial, message schema, storage migrations.
- E2E (Playwright + loaded unpacked extension): popup, Workspace, Side Panel, active tab interaction, permission and cleanup flows where supported.
- Manual browser matrix: latest stable Chrome on macOS/Windows; Chrome protected pages; offline; SPA navigation; revoked permission.

## Per-tool test contract
Each TOOL-xxx must implement the examples in `requirements/TOOLS.md`, plus malformed input, boundary, reset, keyboard navigation, permission denied if browser-dependent. Name tests `TOOL-xxx: scenario` for traceability.

## Security regression
Ensure JWT/password/cookie/auth data never enter history by default; no untrusted HTML rendering; no dynamic remote scripts; validate imported fixtures; redact logs; test cancellation and tab closure.

## CI gates
pnpm lint, pnpm typecheck, pnpm test, pnpm build; E2E for browser-dependent phase and release. Never report a test as passing if not executed.

## Lệnh chạy hiện tại (TASK-P0-006)

| Lệnh | Phạm vi |
| --- | --- |
| `pnpm lint` | ESLint TypeScript/Vue, warnings làm fail gate |
| `pnpm typecheck` | WXT prepare + vue-tsc strict; gồm source và test TypeScript |
| `pnpm test` | Cả ba project Vitest, chạy một lần, lỗi trả exit code khác 0 |
| `pnpm test:unit` | Node: `tests/unit/**/*.test.ts` và `src/**/__tests__/**/*.test.ts`, trừ `*.component.test.ts` |
| `pnpm test:component` | Happy DOM + Vue Test Utils: `tests/components/**/*.test.ts` và `src/**/__tests__/**/*.component.test.ts` |
| `pnpm test:integration` | Node: `tests/integration/**/*.test.ts`; test bootstrap build production và kiểm tra output |
| `pnpm build` | Build unpacked Chrome MV3 vào `.output/chrome-mv3` |
| `pnpm test:e2e` | Build production rồi chạy `tests/e2e/**/*.spec.ts` bằng Playwright |
| `pnpm test:e2e:headed` | Như E2E, có hiển thị Chromium |

### Môi trường và test doubles

- `vitest.config.ts` dùng Vue plugin và WXT Vitest plugin cho aliases/runtime environment/`wxt/browser` mock. Metadata dev server dùng fixed strict port để tránh dò cổng; không khởi động dev server cho test.
- `tests/support/browser.ts` cung cấp `fakeBrowser` và `resetTestBrowser()`. Setup tự reset spy, storage, tabs và event listeners, đồng thời gắn fake `chrome`/`browser` globals. Sau test khôi phục timers/globals/env. Component setup tự unmount và dọn DOM.
- Các API fake chưa được implement không tự động thành công. Với permission-denied/error case, dùng `vi.spyOn(browser.permissions, 'request').mockImplementation(async () => false)` hoặc mock lỗi tường minh. Test này chỉ giả lập API boundary, không chứng minh permission broker hoạt động.
- Không thêm fake secret thật vào fixture. Test domain không import Chrome APIs; test adapter dùng API double, browser flow dùng E2E thật.
- Tên test tool giữ `TOOL-xxx: scenario`; test infrastructure dùng task ID. Đặt test vào đúng project để tránh chạy E2E trong Vitest.

### E2E extension fixture

- Cài browser đúng phiên bản khóa: `pnpm exec playwright install chromium`; Linux dùng thêm `--with-deps`.
- Fixture dùng `chromium` channel + persistent context với profile tạm tự xóa sau khi close. Load production extension thật bằng đường dẫn tuyệt đối; không sửa manifest/build để thêm quyền hoặc service worker test-only.
- Bản bootstrap chưa có service worker nên fixture lấy ID từ trang quản lý extension; thao tác này phụ thuộc UI Chromium tiếng Anh. Browser được cài bởi Playwright mặc định sử dụng UI này; nếu thay locale/browser cần cập nhật fixture.
- E2E hiện mở `chrome-extension://<id>/popup.html`, kiểm tra render, offline/reload, light/dark, chiều rộng, page/console errors và HTTP requests ngoài ý muốn. Chưa bấm icon toolbar thật, chưa có Workspace/Side Panel hay flow permission để kiểm tra.
- Cấu hình `trace: retain-on-failure`, screenshot khi fail; HTML report không tự mở. Output trong `test-results/` và `playwright-report/`, được ignore khỏi source control. Không chạy đồng thời build khác khi E2E đang dùng cùng `.output`.
- CI có `forbidOnly`, không retry để lỗi không bị che; timeout hữu hạn. GitHub Actions chạy lint/typecheck/Vitest/build/E2E, quyền `contents: read`, upload diagnostics khi fail với retention 7 ngày. CI không thay thế manual matrix macOS/Windows hoặc gate TASK-P0-009.

### UI foundation coverage (TASK-P0-002)

- Unit tests cover theme preference validation/system transitions và contrast của token text/control/focus trong cả hai theme.
- Component tests cover button disabled/loading, field label/hint/error/unique IDs và inert text, status roles, clipboard states/races và theme listener cleanup. Clipboard dùng mock; không đưa dữ liệu thật vào system clipboard trong test.
- E2E `theme.spec.ts` kiểm tra native selector focus, manual/system changes, axe A/AA scan ở cả hai theme, reduced-motion styles, 360px layout và preference reset sau reload. Ảnh light/dark attach vào report cho visual QA.
- Chưa chạy screen reader/manual full WCAG audit hoặc clipboard E2E; bổ sung tại task có flow dùng các primitives này. Không coi axe pass là chứng nhận WCAG.
