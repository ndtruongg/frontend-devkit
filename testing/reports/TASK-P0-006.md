# TASK-P0-006 — Test infrastructure và CI

Ngày: 2026-10-27. Trạng thái: DONE. Dependency TASK-P0-001 đã DONE. Phạm vi: test tooling, fixtures, smoke coverage, CI và tài liệu; không thay UI/runtime của extension.

## Thay đổi

- Vitest 5 projects: Node unit, Happy DOM component, Node integration; Vue SFC plugin và WXT mock/aliases; project scripts chạy riêng hoặc toàn bộ.
- WXT fake browser có setup/reset spies, state, events và globals; component auto-unmount/DOM cleanup; không giả lập mọi Chrome API thành công.
- Vue Test Utils 2.4.6 và Happy DOM 21.0.4. Không dùng VTU 2.5.1 vì dependency transitive `nopt@10.0.1` yêu cầu Node mới hơn 22.17.1 đã pin; engine-strict giữ nguyên.
- Playwright 1.64.1, Chromium/Chrome for Testing 156.0.8078.4 (revision 1248), fixture nạp production unpacked extension trong disposable persistent context.
- E2E popup render/accessible landmarks, offline reload, light/dark, overflow và no unexpected network/console errors. Lấy extension ID từ Chrome manager vì bootstrap chưa có worker.
- `test:e2e` build trước khi test; có headed mode, timeout, forbidOnly trong CI, failure diagnostics, không retry. Không đổi production manifest để phục vụ test.
- GitHub Actions workflow: read-only checkout, pnpm từ packageManager, Node từ `.nvmrc`, frozen install, lint/typecheck/Vitest, cài Chromium system dependencies, build/E2E và upload diagnostics khi fail.
- Bootstrap build test dùng Node chạy WXT CLI thay vì phụ thuộc shell executable `.bin/wxt`, thuận tiện cho kiểm tra trên Windows về sau.

## File thêm/sửa

- `package.json`, `pnpm-lock.yaml`, `vitest.config.ts`, `playwright.config.ts`.
- `tests/support/browser.ts`, `tests/setup/{browser,dom}.ts`.
- `tests/unit/browser-harness.test.ts`, `tests/components/popup.test.ts`, `tests/integration/bootstrap.test.ts`.
- `tests/e2e/{fixtures.ts,popup.spec.ts}`.
- `.github/workflows/ci.yml`, `README.md`, `testing/TEST-PLAN.md`, `plans/TASKS.md`, báo cáo này.

## Evidence local

Môi trường: macOS arm64, Node 22.17.1, pnpm 10.34.9. Source UI/manifest vẫn là bản TASK-P0-001.

| Lệnh | Kết quả |
| --- | --- |
| `pnpm add -D …` với dependency đã pin | PASS sau khi chọn VTU tương thích Node; lockfile cập nhật |
| `pnpm install --frozen-lockfile --offline` | PASS, lockfile up to date, WXT prepare thành công |
| `pnpm lint` | PASS, 0 warnings |
| `pnpm typecheck` | PASS, TypeScript strict gồm tests/fixtures |
| `pnpm test` | PASS, 3 file / 6 tests: 3 unit harness, 1 Vue component, 2 build integration |
| `pnpm exec playwright install chromium` | PASS, browser revision 1248 và phụ thuộc đi kèm được tải |
| `pnpm exec playwright test --list` | PASS, đúng 1 test / 1 file trong project chromium-extension |
| `pnpm test:e2e` | PASS, production build và 1 E2E; extension load/render/offline/theme/width/error/network assertions đều pass |
| Kiểm tra YAML bằng js-yaml có sẵn trong dependency tree | PASS cú pháp và presence của các quality gates/read-only permission; không thay thế lượt chạy GitHub Actions |

Trong quá trình sửa, suite đã trả exit code 1 khi assertion reset tabs sai kỳ vọng: fake browser reset về tab mặc định, không phải danh sách rỗng. Đã đổi test so sánh với trạng thái ban đầu rồi chạy lại pass. WXT plugin lúc đầu dò localhost bị sandbox chặn; đã cấu hình fixed strict port chỉ cho metadata test, không mở server.

## Giới hạn

- Chưa có Git repository/remote trong thư mục này nên chưa chạy workflow trên GitHub Actions. Chỉ xác nhận local gates đã chạy; không tuyên bố remote CI pass.
- Chưa kiểm tra Linux runner thật, Windows hoặc toolbar action. Fixture phụ thuộc cấu trúc/UI tiếng Anh của trang `chrome://extensions`; khi Chromium thay UI cần điều chỉnh test fixture.
- Fake API permission denial chỉ kiểm tra test double; broker/schema/storage migrations chưa được triển khai, thuộc các task tiếp theo. Không có tool/domain tests vì chưa có tool.
- Trace/screenshot failure retention đã cấu hình; lượt E2E pass không tạo failure screenshot. Chỉ dùng dữ liệu synthetic trong các suite sau để tránh secret trong diagnostics.
- Chưa có coverage threshold hoặc security audit toàn bộ dependency; không thuộc gate của task infrastructure này. Dependency transitive `glob@10.5.0` báo deprecated khi cài VTU 2.4.6; chưa đổi runtime hoặc override transitive dependency để xử lý ngoài phạm vi task.

## Task kế tiếp

Theo thứ tự IMPLEMENTATION-PLAN: **TASK-P0-002 — Tailwind theme và shared UI primitives**. TASK-P0-003 và TASK-P0-008 cũng đã đủ dependency, nhưng chưa được bắt đầu trong task này. P0 vẫn chưa đạt exit gate.

## Nguồn đã đối chiếu

- [WXT unit testing](https://wxt.dev/guide/essentials/unit-testing.html).
- [Vitest test projects](https://vitest.dev/guide/projects.html).
- [Vue Test Utils](https://test-utils.vuejs.org/guide/).
- [Playwright extension testing](https://playwright.dev/docs/chrome-extensions).
- Official repositories của [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [upload-artifact](https://github.com/actions/upload-artifact), [pnpm/action-setup](https://github.com/pnpm/action-setup).
