# TASK-P0-001 — Khởi tạo workspace

Ngày kiểm tra: 2026-10-27. Dependency: không có. Trạng thái: DONE cho phạm vi bootstrap.

## Implementation

- WXT 0.21.5 + Vue 3.5.44, TypeScript 5.9.3 strict, vue-tsc 3.3.13; pnpm 10.34.9 và Node 22.17.1 trên macOS arm64.
- Dùng `@wxt-dev/module-vue` 1.0.3; WXT build production qua Vite 8.3.5 từ lockfile. Tắt auto-import để source dùng import tường minh.
- Pin dependency trực tiếp và commit-ready `pnpm-lock.yaml`; ignore generated files/cache/secrets. Không khởi tạo Git vì thư mục chưa có `.git` và task không yêu cầu.
- Popup Vue tối thiểu, width 380px, heading/region có accessible name, system light/dark; hiển thị rõ chưa có tool.
- Production manifest MV3 không yêu cầu quyền hoặc host access; không background/content script. CSP `script-src 'self'; object-src 'none'; connect-src 'none'`.
- ESLint 10 + TypeScript/Vue rules, vue-tsc và Vitest bootstrap tests là kiểm tra tối thiểu cho scaffold; chưa đánh dấu TASK-P0-006 hoàn tất.

## File thêm/sửa

- `package.json`, `pnpm-lock.yaml`, `.npmrc`, `.nvmrc`, `.gitignore`.
- `wxt.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`.
- `entrypoints/popup/{index.html,main.ts,App.vue,style.css}`.
- `tests/integration/bootstrap.test.ts`.
- `README.md`, `plans/TASKS.md`, tài liệu báo cáo này.

## Lệnh và kết quả thực tế

| Lệnh / kiểm tra | Kết quả |
| --- | --- |
| `pnpm install` | PASS; tải dependency, tạo lockfile, WXT prepare thành công |
| `pnpm install --frozen-lockfile --offline` | PASS khi chạy với cache pnpm đã dùng lúc install; không resolve lại dependency |
| `pnpm lint` | PASS, 0 warnings; lỗi format Vue ở lần đầu đã sửa và chạy lại |
| `pnpm typecheck` | PASS; WXT prepare + vue-tsc --noEmit với strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes |
| `pnpm test` | PASS, 1 file / 2 tests; test tự chạy production build |
| `pnpm build` | PASS; MV3 manifest + popup HTML + JS/CSS local, tổng output khoảng 63.70 kB |
| Playwright CLI: load unpacked, mở popup trên extension origin | PASS trên Chrome for Testing có sẵn; extension enabled, Vue render heading và trạng thái chưa có tool |
| Playwright CLI: console/network | PASS ở lượt load online: 0 errors/warnings, không có request ngoài static assets |
| Playwright CLI: offline + reload | PASS; popup vẫn render đầy đủ |
| Playwright CLI: dark mode + screenshot | PASS; đã xem ảnh ở viewport 380 × 440, không cắt nội dung |

Hai automated tests kiểm tra output thực thay vì chỉ lặp lại config source:

1. Manifest MV3 đúng tên/version/popup; không có permissions/host permissions/content script/background hoặc externally_connectable.
2. CSP chặn eval/network; popup trỏ tới JS local tồn tại; không inline script hoặc eval/new Function trong bundle.

Browser smoke dùng Playwright CLI, profile test riêng trong `/private/tmp/frontend-devkit-p0-001-profile`, không dùng profile cá nhân. Đã xác nhận extension xuất hiện trong `chrome://extensions`; popup được kiểm tra qua URL `chrome-extension://<id>/popup.html`. Chưa tự động bấm toolbar action.

## Giới hạn và rủi ro còn lại

- Chưa có tool/domain logic nên chưa có unit tests của tool. Vitest hiện chỉ kiểm tra build contract; component suite, Playwright E2E tái chạy được từ repo và CI thuộc TASK-P0-006.
- Chưa kiểm tra thao tác bấm icon toolbar thật hoặc browser matrix Chrome macOS/Windows. Browser smoke này không thay gate TASK-P0-009.
- Chưa chạy WXT dev/live reload; CSP/không-network nêu trên áp dụng cho production build đã kiểm tra.
- Scaffold chưa có Tailwind/theme primitives, router, workspace/side panel, registry, permissions/messaging hoặc storage; P0 chưa đạt exit gate.
- `connect-src 'none'` cần được review khi đến API/browser task có network được user cho phép; không mở quyền network sớm trong bootstrap.
- Môi trường sandbox lần đầu không truy cập được registry; install qua quyền network được cấp đã thành công. Lần chạy frozen/offline không escalation ban đầu gặp pnpm store context mismatch/no-TTY; chạy cùng store context với lần install đã pass. Đây không phải lỗi lockfile.
- Chưa chạy security/dependency audit P5; không suy diễn build pass là đã hoàn tất audit.

## Task kế tiếp

TASK-P0-002, TASK-P0-003 và TASK-P0-006 đã đủ dependency TASK-P0-001. Theo kế hoạch, ưu tiên **TASK-P0-006** để hoàn thiện test infrastructure/CI trước các thay đổi tiếp theo. Không có task nào ngoài TASK-P0-001 được đánh dấu DONE.

## Tài liệu kỹ thuật đã đối chiếu

- [WXT installation](https://wxt.dev/guide/installation.html): scripts build/postinstall và cách khởi tạo.
- [WXT frontend frameworks](https://wxt.dev/guide/essentials/frontend-frameworks.html): module Vue.
- [WXT TypeScript configuration](https://wxt.dev/guide/essentials/config/typescript.html): kế thừa `.wxt/tsconfig.json`.
