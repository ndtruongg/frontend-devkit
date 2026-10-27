# TASK-P0-002 — Tailwind theme và shared UI primitives

Ngày: 2026-10-27. Trạng thái: DONE. Dependency TASK-P0-001 đã DONE; test infrastructure TASK-P0-006 đã có trước khi thực hiện.

## Kết quả

- Tailwind CSS / Vite plugin 4.3.3 tích hợp với WXT; utility classes được build local, không CDN hoặc runtime network.
- Semantic light/dark tokens, spacing theo đơn vị 4px, radius 6px cho controls, focus-visible và reduced motion. Giữ bảng màu neutral có sẵn, accent xanh lá dùng nhất quán.
- Pinia 4.1.0 cho shared theme state. Default system; select hỗ trợ Sáng/Tối/System, phản ứng với OS thay đổi, validate preference. Root composable cleanup listener/watch và khôi phục document attribute khi unmount.
- Theme chỉ giữ trong phiên app; không thêm storage/migration trước TASK-P0-008.
- Năm primitives: UiButton, UiTextField, UiStatus, CopyButton, ThemeSelect. Native semantics, visible labels, empty/loading/error/success, disabled/loading guard, actionable clipboard error, inert text rendering. UiStatus có nhãn chữ cho trạng thái để không dựa riêng vào màu.
- Popup dùng shared styles/status/theme selector. Không triển khai router, registry, Workspace/Side Panel, permission broker hoặc tool.

## File đã thêm/sửa

- `package.json`, `pnpm-lock.yaml`, `wxt.config.ts`.
- `src/app/styles/{main,tokens,primitives}.css`.
- `src/stores/theme.ts`, `src/composables/useThemeDocument.ts`.
- `src/components/{UiButton,UiTextField,UiStatus,CopyButton,ThemeSelect}.vue`.
- `entrypoints/popup/{main.ts,App.vue,style.css}`.
- `tests/unit/{theme,theme-contrast}.test.ts`.
- `tests/components/{popup,primitives,copy-button,theme}.test.ts`.
- `tests/e2e/theme.spec.ts`.
- `README.md`, `design/COMPONENTS.md`, `testing/TEST-PLAN.md`, `plans/TASKS.md`, báo cáo này.

## Lệnh và kết quả

Môi trường local: macOS arm64, Node 22.17.1, pnpm 10.34.9, Chrome for Testing 156.0.8078.4/Playwright 1.64.1.

| Kiểm tra | Kết quả thực tế |
| --- | --- |
| `pnpm add pinia@4.1.0` và dev dependencies Tailwind/axe đã pin | PASS; lockfile cập nhật |
| `pnpm install --frozen-lockfile --offline` | PASS; lockfile up to date và WXT prepare thành công |
| `pnpm lint` | PASS, 0 warnings |
| `pnpm typecheck` | PASS, strict và exactOptionalPropertyTypes giữ nguyên |
| `pnpm test` | PASS, 8 file / 22 tests: 7 unit, 13 component, 2 integration |
| `pnpm test:e2e` | PASS, production build và 2 E2E; output khoảng 82.99 kB |
| Token contrast | PASS, cả light/dark: text/primary button ≥4.5:1, focus/control border ≥3:1 |
| Axe A/AA scans | PASS, 0 violations trong cả light/dark với tags wcag2a/wcag2aa/wcag21aa/wcag22aa |
| Keyboard/reduced motion/layout | PASS: Tab focus selector, visible outline, reduced transition, không overflow ngang ở 360px |
| Visual QA | Đã xem ảnh light/dark 380px, nội dung và control không bị cắt; ảnh attach trong Playwright report |

Các lượt đầu có lint warnings về optional prop defaults và một lỗi strict typecheck do default undefined; đã sửa defaults/ID fallback và chạy lại lint/typecheck/tests/E2E thành công. Không hạ strict mode hoặc bỏ rule để vượt gate.

## Coverage có ý nghĩa

- Theme state: system change, override thủ công, trở lại system, invalid input không phá state.
- Document lifecycle: media listener update, manual choice precedence và listener/attribute cleanup khi unmount.
- Button: không submit form ngoài ý muốn, native disabled/loading chặn click, aria-busy.
- Field: label/hint/error associations, required/disabled, emitted input, unique generated IDs, lỗi có nội dung HTML vẫn inert.
- Status: named region/status/alert, busy và visible status label.
- Clipboard: không tự ghi khi mount/đổi input; click mới copy; success, denied/unavailable, retry khả dụng, chặn click lặp khi pending và không báo success cho text đã thay đổi. Không đưa native error details vào thông báo.
- Regression bootstrap: manifest không thêm permission/host access, CSP và local script contract vẫn pass. Popup offline/no errors/no external requests vẫn pass.

## Giới hạn và rủi ro còn lại

- Theme sẽ reset về system khi reload/mở lại popup; persistence và cross-surface synchronization chờ storage task. UI có hint rõ về phạm vi phiên.
- Clipboard được kiểm tra bằng component mocks; chưa có tool consumer để chạy copy flow browser thật. Chưa chạy screen reader hoặc Windows/manual browser matrix.
- Axe và token contrast pass không chứng minh toàn bộ WCAG 2.2 AA. Các primitives chưa được dùng trong popup cần được kiểm tra browser trong flow consumer tương ứng.
- GitHub Actions vẫn chưa có lượt chạy remote; local quality gates đã pass. P0 chưa đạt exit gate.
- Không có tool nào được đánh dấu hoàn tất. Public component usage và giới hạn được ghi trong `design/COMPONENTS.md`.

## Task tiếp theo

Theo IMPLEMENTATION-PLAN: **TASK-P0-003 — Manifest MV3 entrypoints và routing**. Dependency TASK-P0-001 đã hoàn tất; task này có thể bắt đầu. TASK-P0-004/005 vẫn chờ dependency và không được triển khai trong lần này.

## Tài liệu đối chiếu

- [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite), [theme variables](https://tailwindcss.com/docs/theme), [dark mode](https://tailwindcss.com/docs/dark-mode).
- [Pinia stores](https://pinia.vuejs.org/core-concepts/).
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).
