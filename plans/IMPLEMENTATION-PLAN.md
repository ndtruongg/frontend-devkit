# Kế hoạch triển khai Frontend DevKit

Ngày lập: 2026-10-27. Phạm vi lần này: đọc tài liệu và lập kế hoạch code.

## 1. Hiện trạng và nguồn yêu cầu

- Đã đọc toàn bộ 18 file Markdown hiện có: `AGENTS.md`, `README.md`, `requirements/{PRD,TOOLS,ACCEPTANCE}.md`, `architecture/{SYSTEM,MODULES,STORAGE}.md`, `security/PERMISSIONS.md`, `design/UI-UX.md`, `testing/TEST-PLAN.md`, `plans/{ROADMAP,TASKS}.md`, `docs/{DECISIONS,TRACEABILITY}.md`, `prompts/{MASTER-PROMPT,IMPLEMENT-TOOL,REVIEW}.md`.
- Thư mục hiện chỉ chứa tài liệu; chưa có source, `package.json`, lockfile, cấu hình test hay thư mục `.git`. Chưa thể chạy lint/typecheck/test/build.
- `plans/TASKS.md` có 59 task TODO: 9 foundation, 42 tool, 4 phase QA và 4 release/hardening.
- `plans/TASKS.md` giữ vai trò source of truth về ID, dependency và trạng thái. Tài liệu này bổ sung cách thực hiện; không thay requirement hoặc đánh dấu task hoàn tất.
- Stack giữ nguyên: WXT, Vue 3, TypeScript strict, Tailwind CSS, pnpm; Pinia cho state chia sẻ; Vitest, Vue Test Utils và Playwright. Zod theo contract messaging của SYSTEM.
- Bắt đầu code từ `TASK-P0-001`. Chỉ mở task khi dependency đã hoàn tất; chỉ chuyển phase khi gate của phase trước đạt. Không triển khai 42 tool trong P0.

## 2. Thứ tự code P0

Một thứ tự tuần tự hợp lệ, đưa test infrastructure vào sớm:

`TASK-P0-001 → TASK-P0-006 → TASK-P0-002 → TASK-P0-003 → TASK-P0-004 → TASK-P0-007 → TASK-P0-008 → TASK-P0-005 → TASK-P0-009`

Thứ tự này không thêm hoặc đổi dependency trong backlog. Các file dưới đây là dự kiến; điều chỉnh tên theo convention WXT khi khởi tạo, giữ nguyên ranh giới module.

| Task | Dependency bắt buộc | Việc triển khai và file dự kiến | Bằng chứng nghiệm thu |
| --- | --- | --- | --- |
| TASK-P0-001 | Không | Khởi tạo workspace WXT + Vue + TS strict + pnpm; `package.json`, `pnpm-lock.yaml`, `wxt.config.ts`, `tsconfig.json`, `.gitignore`; entrypoint tối thiểu để build; cập nhật hướng dẫn chạy trong README | Cài từ lockfile và build được bản unpacked; ghi phiên bản runtime/dependency thực tế; chưa nhận hoàn tất test infrastructure của TASK-P0-006 |
| TASK-P0-006 | TASK-P0-001 | Scripts lint/typecheck/test/build/E2E; `eslint.config.*`, `vitest.config.ts`, `playwright.config.ts`, `tests/{unit,integration,e2e}`, fixture Chrome API, `.github/workflows/ci.yml` | Có test smoke có ý nghĩa và extension launch fixture; lint/typecheck/unit/build pass; CI tách rõ test tự động và kiểm tra manual |
| TASK-P0-002 | TASK-P0-001 | `src/app/styles/`, `src/components/` và theme state; tokens neutral/accent, spacing 4/8px, light/dark, focus và reduced motion; primitives cho button, field, trạng thái, copy feedback | Component tests cho keyboard, label, disabled/loading/error, copy thất bại; kiểm tra contrast và bố cục hẹp |
| TASK-P0-003 | TASK-P0-001 | `entrypoints/{popup,sidepanel,workspace}/`, `entrypoints/background.ts`, router trong `src/app/`, adapter điều hướng trong `src/services/chrome/`; workspace là tab riêng | MV3 build chứa đúng entrypoint; popup mở workspace, route trực tiếp hoạt động, side panel mở được; route sai trả friendly 404 |
| TASK-P0-004 | TASK-P0-003 | `src/tool-registry/{types,registry}.ts`, lookup/search và lazy loader; schema metadata, ID/slug/category/phase/surfaces/permissions/history policy | Test ID/slug duy nhất, lookup/filter, unknown route, lazy load và load failure; registry không eager-import toàn bộ view |
| TASK-P0-007 | TASK-P0-003 | `src/services/{chrome,messaging,permissions}/`; request/response schema, sender validation, timeout, capability result; tab navigation/close và permission revoke cleanup | Integration tests giả lập grant/deny/revoke, sender giả, payload sai, timeout, tab đóng/chuyển origin; E2E các flow quyền có thể tự động hóa |
| TASK-P0-008 | TASK-P0-006 | `src/services/storage/`, schema/types, migrations và privacy settings; adapter local/session/IndexedDB, favorites, history policy, import/export validation và TTL | Test migration, version không hỗ trợ, dữ liệu hỏng, quota/error, import quá giới hạn, xóa liên quan; dữ liệu nhạy cảm không vào history/export mặc định |
| TASK-P0-005 | TASK-P0-002, TASK-P0-004 | Workspace nav + tool canvas; popup search/recent/favorites/Open Workspace; side panel contextual shell; `src/components/`, `src/composables/`, `src/stores/`; command palette Cmd/Ctrl+K | Component/E2E cho arrow/Enter/Escape, focus return, search rỗng, theme, no active tab, unsupported URL, permission denied; tích hợp adapters của 007/008 đã có theo thứ tự đề xuất |
| TASK-P0-009 | TASK-P0-005, TASK-P0-006, TASK-P0-007, TASK-P0-008 | E2E ba surface; review architecture, permissions/CSP, storage và lifecycle; ghi evidence/known limitations vào `testing/` và cập nhật docs liên quan | Toàn bộ quality gate P0 pass; build nạp được vào Chrome; test restart/suspend recovery cho state cần bền vững; ghi rõ phần manual chưa chạy |

### Ranh giới để P0 không lấn sang tool

- Entry UI trong 001 chỉ phục vụ build; layout/surface/routing hoàn thiện ở 003 và shell ở 005.
- Registry có contract và test fixture. Metadata của tool chưa triển khai phải được phân biệt rõ; không gắn placeholder rồi báo tool đã hoạt động.
- P0 không cần chạy thử JSON Formatter thật để chứng minh lazy loading; dùng fixture trong test.
- Chỉ tạo shared component/service cần cho P0. Abstraction dùng chung giữa feature chỉ tách khi có ít nhất hai consumer thực tế theo MODULES.
- Schema/storage nền tảng thuộc P0; UI và workflow API collections/scenarios/fixtures thuộc task tool tương ứng về sau.
- Ở 001, chạy build/typecheck khả dụng và ghi rõ kiểm tra nào chưa có. Hoàn thiện lint/unit/E2E infrastructure ở 006, sau đó kiểm tra lại scaffold trước gate P0. Không dùng script rỗng để báo pass.

## 3. Cấu trúc source và contract

```text
entrypoints/
  background.ts
  content.ts                  # chỉ thêm khi có consumer cần content script
  popup/
  sidepanel/
  workspace/
src/
  app/                        # router, providers, styles
  components/                 # UI primitives và shell components
  tool-registry/              # metadata, contract, lazy loaders
  features/<tool-slug>/
    index.ts
    ToolView.vue
    domain.ts
    schemas.ts
    __tests__/domain.test.ts
  composables/
  stores/                     # shared UI state; không lưu secret mặc định
  services/
    chrome/
    messaging/
    permissions/
    storage/
  types/
  utils/                      # pure functions, không gọi Chrome API
tests/
  unit/
  integration/
  e2e/
```

- Tool contract: ID và slug ổn định; category, phase, supported surfaces, required capabilities, lazy component, input/output schema, history policy. Validation đặt tại boundary trước khi thực thi.
- Messaging giữ envelope `{requestId, type, payload, tabId?}` và `{requestId, ok, data?, error?}`; không tin payload/sender chỉ vì message đến từ content script. Đối chiếu sender với loại message, tab/frame/origin được cấp quyền.
- Pure `domain.ts` xử lý biến đổi dữ liệu. Vue xử lý UI; browser adapter xử lý Chrome API. Không import feature này từ feature khác để dùng nội bộ.
- Async operation có loading, timeout và abort/cleanup; không dùng state trong service worker làm nguồn bền vững duy nhất.
- State mặc định theo vòng đời view; retention phải opt-in. Favorites/theme dùng shared state, history đi qua privacy policy và storage adapter.
- Lỗi browser phải phân biệt denied, unsupported, tab unavailable, timeout và lỗi thực thi; không chuyển thành success rỗng.
- Giới hạn bytes, số record, độ sâu và thời gian phải được xác định cho từng workflow trước khi code; tài liệu chưa đưa số cụ thể, không coi giá trị tùy chọn là requirement đã chốt.

## 4. Kế hoạch P1–P5 sau khi qua gate

Đây là kế hoạch cho các phase sau, không phải chỉ thị triển khai ngay. Mỗi tool là một đơn vị giao việc riêng với ID có sẵn.

| Phase / gate mở | Task và tool | Trọng tâm khi code |
| --- | --- | --- |
| P1, sau P0 đạt gate | TASK-P1-001..006 / TOOL-001..006: JSON Formatter, JSON Diff, JSON ↔ CSV, JSON ↔ YAML, Mock Data Generator, Data Explorer | Parse an toàn, JSON Pointer escaping, precision warning, RFC4180, YAML tags/anchors giới hạn, seed deterministic, lazy/virtualized tree |
| P1 | TASK-P1-007..012 / TOOL-007..012: JWT Decoder, Base64 Encoder, URL Encoder, Hash Generator, UUID Generator, Password Generator | JWT không tuyên bố verify signature; UTF-8/base64url; query trùng key; Web Crypto; random an toàn và rejection sampling; không lưu secret mặc định |
| P1 | TASK-P1-013..018 / TOOL-013..018: Regex Tester, Text Diff, Case Converter, Timestamp Converter, Number Converter, HTML Entity Converter | Regex worker có thể terminate, zero-width/Unicode; diff có cap; acronym/digits; timezone/DST; BigInt; output HTML luôn inert |
| P1 gate | TASK-P1-QA | Nghiệm thu đủ 18 tool, AC-01..07, offline/privacy, component integration và regression |
| P2, sau TASK-P1-QA | TASK-P2-019..024 / TOOL-019..024: Color Converter, Gradient Generator, Box Shadow Generator, Border Radius Generator, CSS Unit Converter, Responsive Preview | Serialization CSS có validate; alpha/rounding; unit cần context; preview tab/window và browser limitations cho TOOL-024 |
| P2 gate | TASK-P2-QA | Đủ 6 tool, preview/copy/reset/keyboard; browser E2E cho TOOL-024 dù thuộc P2 |
| P3, sau TASK-P2-QA | TASK-P3-025..028 / TOOL-025..028: Cookie Manager, Storage Manager, DOM Inspector, CSS Inspector | Quyền theo origin; confirm sửa/xóa; cookie partitioning; page storage tách extension storage; selector/overlay cleanup; computed styles |
| P3 | TASK-P3-029..032 / TOOL-029..032: Page Metadata Inspector, Accessibility Quick Audit, Page Performance Snapshot, Network Request Monitor | SPA update; audit có giới hạn; metric unsupported; bounded capture chỉ metadata khả dụng; không hứa response body |
| P3 gate | TASK-P3-QA | Đủ 8 tool; grant/deny/revoke, protected pages, iframe boundaries, navigation/close, cleanup và E2E |
| P4, sau TASK-P3-QA | TASK-P4-033..035 / TOOL-033..035: API Request Builder, API Collections, cURL Converter | Destination permission, abort/redirect/response cap, secret masking; IndexedDB/interpolation cycle; tokenize cURL, tuyệt đối không chạy shell |
| P4 | TASK-P4-036 / TOOL-036: Request Mocking | Chỉ capability DNR được xác minh; scope tab, rule quotas và cleanup; body substitution không khả thi phải báo Unsupported |
| P4 | TASK-P4-037..039 / TOOL-037..039: Action Recorder, Scenario Runner, Form Auto Filler | Schema step/selector có validate, redact sensitive fields trước khi lưu, explicit start/stop, timeout/retry hữu hạn, không tự submit form |
| P4 | TASK-P4-040 / TOOL-040: Snippet Runner | Chốt thiết kế execution đáp ứng no eval/remote code trước khi implement; chưa có phương án phù hợp thì báo giới hạn và đề xuất change request |
| P4 | TASK-P4-041..042 / TOOL-041..042: HTTP Header Inspector, Viewport Ruler | Header redaction, duplicate/redirect handling; tọa độ scroll/zoom/transforms; stop overlay và tab cleanup |
| P4 gate | TASK-P4-QA | Đủ 10 tool; security regression và browser E2E, không nhận hoàn tất capability chưa được chứng minh |
| P5 | TASK-P5-001 → TASK-P5-002 → TASK-P5-003 → TASK-P5-004 | Security/privacy/dependency audit → E2E/performance hardening → user docs/install/troubleshooting → build/package/release checklist |

Trong từng nhóm, mặc định thực hiện theo số task tăng dần để giảm coupling. Trước mỗi task vẫn kiểm tra dependency thực trong TASKS; không suy diễn bảng nhóm là cho phép bỏ qua dependency hoặc gate.

## 5. Những điểm cần giải quyết trước task liên quan

Các điểm sau là phát hiện khi đọc tài liệu, chưa sửa requirement hoặc backlog.

| Điểm chưa thống nhất / chưa đủ chi tiết | Cách xử lý trong kế hoạch |
| --- | --- |
| ROADMAP yêu cầu tuần tự P0 → P5 nhưng dependency của nhiều task tool chỉ trỏ về P0 | Áp dụng đồng thời dependency task và phase gate; nếu muốn đổi dependency ghi trong TASKS, đề xuất change request riêng |
| QA ghi “all TASK-Px-xxx”, có thể bị hiểu gồm chính task QA | Dùng tập task tool của phase để xét gate; khi viết automation kiểm tra dependency cần làm rõ cách biểu diễn, tránh self-dependency |
| PERMISSIONS xếp TOOL-001..024 vào pure utilities trong khi TOOL-024 mở preview tab/window, zoom/screenshot | Trước TASK-P2-024, xác minh API/quyền theo capability thực tế; đề xuất chỉnh matrix nếu cần. Không xin quyền site cho 001..023 |
| TOOL-040 yêu cầu snippet text nhưng cấm eval/remote code, chưa xác định execution mechanism | Cần kiểm chứng với tài liệu Chrome chính thức trước task; xác định capability, cancellation và môi trường chạy; phương án đổi chức năng/API cần ADR/change request |
| Các tool dùng dữ liệu liên quan nhưng backlog chưa nêu dependency tool-to-tool, ví dụ 034/033, 038/037, 028/027 | Đi theo thứ tự đề xuất; xem chúng có thật sự cần dùng implementation của nhau hay chỉ chung contract. Nếu có dependency mới bắt buộc, đề xuất cập nhật trước, không thêm ngầm |
| Chưa có con số cho import/input cap, TTL mặc định, timeout, browser minimum version và schema chi tiết của nhiều tool | Chốt, ghi rõ và test tại task sở hữu; không dùng giá trị tùy ý như thể đã được đặc tả |
| Chưa có ma trận tương thích phiên bản WXT/Tailwind/Node/pnpm hoặc CI provider được xác nhận | Trước 001/006 kiểm tra docs chính thức, chọn bộ tương thích và lock version; `.github/workflows/ci.yml` là vị trí CI dự kiến nếu repo dùng GitHub |

## 6. Quy trình cho mỗi task code

1. Đọc lại phần requirement liên quan; kiểm tra dependency đã DONE và phase đang mở. Nêu ID, phạm vi và file dự kiến trước khi sửa.
2. Với tool: chốt input/output schema, algorithm, UI states, edge cases, permission và limit; map AC-TOOL-xxx-01..06 cộng AC-07 performance của global acceptance.
3. Viết domain/schema, adapter nếu cần, UI, registry và test. Không truy cập Chrome API từ pure utility; không thêm backend/cloud hoặc telemetry.
4. Viết ví dụ input/output và known limitations trong docs của tool; cập nhật traceability/ADR khi có thay đổi đã được chấp thuận.
5. Chạy kiểm tra thực tế; ghi pass/fail, lỗi môi trường và manual checks chưa thực hiện. Sửa lỗi trong phạm vi task.
6. Chỉ tick TASKS khi implementation, tests và docs đều đạt acceptance. Báo file thay đổi, lệnh đã chạy, kết quả, rủi ro và task kế tiếp có dependency hoàn tất.

Lệnh đích sau khi TASK-P0-006 có cấu hình thật:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`test` phải chạy một lần, không chờ watch trong CI. Script `test:e2e` là tên dự kiến cần tạo ở 006. E2E phải dùng extension unpacked thật với profile test riêng; page harness không thay thế bằng chứng Chrome integration. Flow không được automation hỗ trợ cần ghi manual result, không báo pass khi chưa chạy.

## 7. Tiêu chí kết thúc P0 và bước bắt đầu

- Workspace, popup và side panel hoạt động; navigation/search/command palette dùng keyboard được, theme và các trạng thái nền tảng đầy đủ.
- Registry typed/lazy hoạt động, route sai/load error có xử lý; tool chưa triển khai không bị trình bày như đã hoạt động.
- Permission/message boundary có validate, least privilege, timeout và cleanup; CSP không dùng eval hoặc remote script.
- Storage có version/migration, privacy defaults, import/export validation/limits và khả năng phục hồi lỗi đã test.
- Lint/typecheck/unit/integration/build và E2E P0 đạt; evidence và phần manual/known limitations được ghi rõ theo ACCEPTANCE và TEST-PLAN.
- Chỉ sau gate P0 mới bắt đầu `TASK-P1-001 / TOOL-001` khi được giao phase/task tiếp theo.

Task có thể bắt đầu ngay khi chuyển sang thực thi code: **TASK-P0-001**. Sau khi 001 hoàn tất, 002/003/006 đủ dependency; thứ tự đề xuất chọn **TASK-P0-006** trước.

Kết quả của lần lập kế hoạch: chỉ thêm tài liệu này; chưa triển khai source, chưa tick task và chưa có test nào được chạy hoặc được nhận là pass.
