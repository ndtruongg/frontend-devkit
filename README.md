# Frontend DevKit — AI-ready Specification Pack

**Phiên bản đặc tả:** 1.0.0 | **Ngôn ngữ:** Tiếng Việt, giữ thuật ngữ kỹ thuật English | **Trạng thái:** Đã hoàn tất TASK-P0-001, TASK-P0-006 và TASK-P0-002; P0 chưa đạt exit gate.

## Phạm vi
42 tools, 6 phase (P0–P5), Chrome Extension Manifest V3, WXT + Vue 3 + TypeScript + Tailwind CSS + Pinia + pnpm. Local-first, privacy-first, không có backend bắt buộc.

## Thứ tự đọc cho AI
1. `AGENTS.md` (quy tắc thực thi)
2. `requirements/PRD.md` và `requirements/TOOLS.md` (scope và contract)
3. `architecture/SYSTEM.md`, `architecture/MODULES.md`, `architecture/STORAGE.md`
4. `security/PERMISSIONS.md`, `design/UI-UX.md`, `testing/TEST-PLAN.md`
5. `plans/ROADMAP.md` rồi `plans/TASKS.md`
6. `prompts/MASTER-PROMPT.md` để khởi tạo, `prompts/IMPLEMENT-TOOL.md` cho từng tool.

## Nghiệm thu
Không tự động code toàn bộ 42 tools trong một lần. Bắt đầu P0; mỗi task phải có test và tài liệu. `plans/TASKS.md` là source of truth cho ID và dependency. Các tính năng giới hạn bởi Chrome API phải có fallback hoặc nhãn `unsupported` rõ ràng.

## Danh mục
- **JSON & Data**: 6 tools — P1
- **Encoding & Security**: 6 tools — P1
- **Text & Developer Utilities**: 6 tools — P1
- **CSS & UI**: 6 tools — P2
- **Browser & Debugging**: 8 tools — P3
- **API & Automation**: 10 tools — P4

## Chạy source hiện tại

Yêu cầu Node.js ≥22.17.1 và pnpm 10.34.9 (pin trong `packageManager`). `.nvmrc` ghi phiên bản Node đã dùng để kiểm tra. Nếu dùng nvm, chạy `nvm install` rồi `nvm use`; Corepack có thể cung cấp đúng pnpm qua `corepack pnpm`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`postinstall` sinh types/config của WXT trong `.wxt/`. `pnpm dev` chạy WXT cho Chrome MV3 và tự mở browser với extension development. Development dùng live reload của WXT; kiểm tra privacy/CSP phải dựa trên production build.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm test` chạy một lần các project Vitest `unit`, `component` và `integration`. WXT fake browser được reset sau mỗi test; component dùng Vue Test Utils + Happy DOM. Test bootstrap tự build extension rồi kiểm tra manifest, quyền, CSP và script trong output thực. Chưa có tool/domain logic để unit-test.

Chạy E2E trên extension unpacked thật bằng Chromium đi kèm Playwright, với profile tạm riêng cho từng test:

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

Trên Linux/CI, dùng `pnpm exec playwright install --with-deps chromium` để cài cả system dependencies. Có thể chạy `pnpm test:e2e:headed` để xem browser. Lệnh E2E luôn build production trước; không cần chạy dev server hay dùng profile Chrome cá nhân.

CI trong `.github/workflows/ci.yml` chạy khi push/pull request trên GitHub: frozen install → lint → typecheck → Vitest → build/E2E. Chưa có lượt chạy GitHub Actions từ thư mục local này. Cách thêm/chạy test và giới hạn browser automation được ghi trong [testing/TEST-PLAN.md](testing/TEST-PLAN.md).

Để nạp bản production: mở `chrome://extensions`, bật **Developer mode**, chọn **Load unpacked**, rồi chọn `.output/chrome-mv3`. Bấm biểu tượng extension để mở popup. Sau mỗi lần build lại, chọn **Reload** trên trang quản lý extension.

Bản hiện tại có popup thông báo nền tảng đang được xây dựng và bộ chọn giao diện Theo hệ thống/Sáng/Tối. Lựa chọn theme chỉ áp dụng trong phiên popup, reload sẽ quay về Theo hệ thống. Chưa có workspace, side panel, router, tool, storage hoặc permission broker. Production không xin quyền website, không inject content script, không có background capture và chặn network runtime qua CSP.

Tailwind tokens, Pinia theme state và shared primitives đã có; hướng dẫn sử dụng trong [design/COMPONENTS.md](design/COMPONENTS.md). UI dùng native controls, visible focus, reduced motion và text status; không tải font/icon/script từ CDN.

Kế hoạch: [plans/IMPLEMENTATION-PLAN.md](plans/IMPLEMENTATION-PLAN.md). Kết quả nghiệm thu và giới hạn: [TASK-P0-001](testing/reports/TASK-P0-001.md), [TASK-P0-006](testing/reports/TASK-P0-006.md), [TASK-P0-002](testing/reports/TASK-P0-002.md).
