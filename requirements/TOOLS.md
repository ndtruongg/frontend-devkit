# TOOL SPECIFICATIONS — 42 tools

Mỗi tool có ID cố định, phase, input/output, UI, algorithm, edge cases, acceptance criteria và test cases. `UI` chung: header + input + output + Copy/Reset, trạng thái empty/error/success; hỗ trợ keyboard và accessibility. Tất cả xử lý local trừ API/browser tools có quyền rõ ràng.

## JSON & Data (P1)

### TOOL-001 — JSON Formatter
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Format/minify/validate/tree/search/copy path.
- **Input:** JSON text, indent 2/4, search expression.
- **Output:** formatted text, tree nodes, parse diagnostics.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** JSON.parse, JSON.stringify; JSON Pointer path; tree lazy render. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** empty input; invalid JSON; huge arrays; Unicode; unsafe integer precision. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-001-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-001-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-001-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-001-04) keyboard + screen-reader dùng được; (AC-TOOL-001-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-001-06) có automated tests.
- **Test cases:** round-trip object; syntax error; deep tree; copy escaped path; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-002 — JSON Diff
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Structural JSON comparison.
- **Input:** left/right JSON text, ignore order option.
- **Output:** added/removed/changed nodes and paths.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** parse both, recursive compare, array comparison by index default. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** duplicate-looking array items; null vs missing; key order; large objects. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-002-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-002-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-002-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-002-04) keyboard + screen-reader dùng được; (AC-TOOL-002-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-002-06) có automated tests.
- **Test cases:** nested change; array reorder; invalid side; empty objects; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-003 — JSON ↔ CSV
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Bidirectional tabular conversion.
- **Input:** JSON array or CSV, delimiter, header toggle.
- **Output:** CSV/JSON and preview grid.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** RFC4180-aware parser; flatten only with explicit option. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** quoted commas; embedded newlines; BOM; mixed columns; nested values. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-003-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-003-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-003-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-003-04) keyboard + screen-reader dùng được; (AC-TOOL-003-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-003-06) có automated tests.
- **Test cases:** escaped quote; newline cell; missing key; empty row; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-004 — JSON ↔ YAML
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Convert between JSON and YAML.
- **Input:** JSON/YAML text, conversion direction.
- **Output:** converted text and validation errors.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** safe YAML parser without custom executable tags. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** anchors; dates; duplicate keys; null; unsafe YAML tags. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-004-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-004-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-004-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-004-04) keyboard + screen-reader dùng được; (AC-TOOL-004-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-004-06) có automated tests.
- **Test cases:** round-trip primitives; reject unsafe tags; invalid indentation; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-005 — Mock Data Generator
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Generate synthetic fixture data.
- **Input:** schema/template, record count, optional seed.
- **Output:** JSON array, downloadable fixture.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** schema-driven generators, deterministic seed, cap count. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** invalid schema; large count; unique constraints; Unicode. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-005-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-005-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-005-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-005-04) keyboard + screen-reader dùng được; (AC-TOOL-005-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-005-06) có automated tests.
- **Test cases:** same seed deterministic; constraints; max count; invalid schema; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-006 — Data Explorer
- **Phase / Nhóm:** P1 / JSON & Data
- **Mục tiêu:** Explore nested objects and arrays.
- **Input:** JSON input, filter/search/path.
- **Output:** virtualized tree/table and selected path.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** typed tree model; lazy expansion; filter matching nodes. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** circular input impossible in JSON; huge arrays; long strings. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-006-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-006-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-006-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-006-04) keyboard + screen-reader dùng được; (AC-TOOL-006-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-006-06) có automated tests.
- **Test cases:** path copy; filtering; pagination; empty values; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

## Encoding & Security (P1)

### TOOL-007 — JWT Decoder
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** Decode JWT without assuming signature verified.
- **Input:** JWT compact token string.
- **Output:** decoded header/payload, exp/iat local dates, warning.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** split three segments, base64url decode UTF-8, parse JSON; never verify implicitly. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** malformed segments; invalid UTF-8; missing exp; clock skew. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-007-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-007-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-007-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-007-04) keyboard + screen-reader dùng được; (AC-TOOL-007-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-007-06) có automated tests.
- **Test cases:** valid JWT sample; invalid base64url; expired; no signature verification claim; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-008 — Base64 Encoder
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** Unicode and URL-safe Base64.
- **Input:** text/base64, encode/decode mode, url-safe flag.
- **Output:** encoded/decoded string.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** TextEncoder/TextDecoder + base64 byte conversion. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** invalid padding; emoji; whitespace; URL-safe alphabet. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-008-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-008-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-008-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-008-04) keyboard + screen-reader dùng được; (AC-TOOL-008-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-008-06) có automated tests.
- **Test cases:** Unicode round-trip; malformed input; empty string; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-009 — URL Encoder
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** URL and query parameter encoding.
- **Input:** URL or text, component/full URL mode.
- **Output:** encoded/decoded URL and parsed query table.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** encodeURIComponent/decodeURIComponent; URLSearchParams. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** malformed percent; duplicate query keys; plus vs space; fragments. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-009-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-009-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-009-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-009-04) keyboard + screen-reader dùng được; (AC-TOOL-009-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-009-06) có automated tests.
- **Test cases:** duplicate keys; malformed escape; Unicode URL; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-010 — Hash Generator
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** Compute SHA digests.
- **Input:** text/file bytes, SHA-256/384/512.
- **Output:** hex/base64 digest.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** Web Crypto subtle.digest, streaming caveat for huge files. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** empty data; huge file; Unicode normalization. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-010-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-010-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-010-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-010-04) keyboard + screen-reader dùng được; (AC-TOOL-010-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-010-06) có automated tests.
- **Test cases:** known test vectors; file digest; empty string; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-011 — UUID Generator
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** Generate UUID v4.
- **Input:** count, output case, separator option.
- **Output:** UUID list.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** crypto.randomUUID with secure-context fallback using getRandomValues. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** invalid count; quota; uniqueness across batch. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-011-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-011-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-011-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-011-04) keyboard + screen-reader dùng được; (AC-TOOL-011-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-011-06) có automated tests.
- **Test cases:** version/variant bits; count limit; no Math.random; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-012 — Password Generator
- **Phase / Nhóm:** P1 / Encoding & Security
- **Mục tiêu:** Generate secure random passwords.
- **Input:** length, charset toggles, exclude ambiguous.
- **Output:** password list and strength hints.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** crypto.getRandomValues with rejection sampling; guarantee selected groups. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** no charsets; very long length; clipboard sensitivity. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-012-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-012-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-012-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-012-04) keyboard + screen-reader dùng được; (AC-TOOL-012-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-012-06) có automated tests.
- **Test cases:** all groups present; invalid options; no Math.random; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

## Text & Developer Utilities (P1)

### TOOL-013 — Regex Tester
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Regex test with matches/groups.
- **Input:** pattern, flags, sample text.
- **Output:** match spans, groups, diagnostics.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** RegExp exec with zero-width advancement; timeout guard via worker where possible. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** catastrophic backtracking; invalid regex; zero-width; Unicode. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-013-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-013-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-013-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-013-04) keyboard + screen-reader dùng được; (AC-TOOL-013-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-013-06) có automated tests.
- **Test cases:** named groups; zero-width; invalid flags; large input; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-014 — Text Diff
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Compare text by lines/characters.
- **Input:** left/right text, mode, whitespace toggle.
- **Output:** unified or side-by-side diff.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** diff algorithm with size caps and stable line mapping. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** CRLF; whitespace-only; huge text; Unicode. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-014-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-014-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-014-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-014-04) keyboard + screen-reader dùng được; (AC-TOOL-014-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-014-06) có automated tests.
- **Test cases:** insert/delete/change; CRLF; empty sides; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-015 — Case Converter
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Convert naming conventions.
- **Input:** text, source/target case.
- **Output:** converted text.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** tokenize camel/acronyms/digits; deterministic casing. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** HTTPServer; diacritics; consecutive separators; digits. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-015-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-015-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-015-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-015-04) keyboard + screen-reader dùng được; (AC-TOOL-015-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-015-06) có automated tests.
- **Test cases:** camel→snake; acronym; empty input; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-016 — Timestamp Converter
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Unix and ISO time conversion.
- **Input:** timestamp, unit, timezone.
- **Output:** ISO, local display, unix s/ms.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** Date conversion, timezone via Intl, strict range validation. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** 10 vs 13 digits; DST; invalid date; negative epoch. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-016-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-016-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-016-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-016-04) keyboard + screen-reader dùng được; (AC-TOOL-016-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-016-06) có automated tests.
- **Test cases:** epoch zero; DST display; invalid unit; milliseconds; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-017 — Number Converter
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Convert numeric bases.
- **Input:** integer string, input/output radix 2/8/10/16.
- **Output:** converted integer and validation.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** BigInt parser with explicit sign and radix. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** fractional inputs; huge integer; invalid digit; negative. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-017-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-017-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-017-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-017-04) keyboard + screen-reader dùng được; (AC-TOOL-017-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-017-06) có automated tests.
- **Test cases:** large BigInt; negative; invalid digit; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-018 — HTML Entity Converter
- **Phase / Nhóm:** P1 / Text & Developer Utilities
- **Mục tiêu:** Encode/decode HTML entities.
- **Input:** plain text/HTML entities, mode.
- **Output:** converted text.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** text-only DOM parser or safe entity map; never inject into page. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** unknown entities; numeric entities; ampersand; XSS strings. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-018-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-018-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-018-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-018-04) keyboard + screen-reader dùng được; (AC-TOOL-018-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-018-06) có automated tests.
- **Test cases:** &amp; round-trip; script text remains inert; invalid numeric; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

## CSS & UI (P2)

### TOOL-019 — Color Converter
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Convert HEX/RGB/HSL and alpha.
- **Input:** color text, target format.
- **Output:** converted values and swatch.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** CSS color parser with clamping/validation. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** short hex; alpha; invalid gamut; rounding. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-019-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-019-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-019-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-019-04) keyboard + screen-reader dùng được; (AC-TOOL-019-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-019-06) có automated tests.
- **Test cases:** hex↔rgb; transparent; invalid color; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-020 — Gradient Generator
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Generate linear/radial gradients.
- **Input:** type, angle, color stops.
- **Output:** live preview and CSS declaration.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** sort stops; serialize CSS safely. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** duplicate stops; out-of-range positions; one stop. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-020-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-020-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-020-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-020-04) keyboard + screen-reader dùng được; (AC-TOOL-020-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-020-06) có automated tests.
- **Test cases:** two-stop CSS; angle; invalid stop; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-021 — Box Shadow Generator
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Create layered box shadows.
- **Input:** layers with x/y/blur/spread/color/inset.
- **Output:** preview and CSS box-shadow.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** serialize layers and numeric units. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** negative blur; many layers; alpha colors. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-021-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-021-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-021-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-021-04) keyboard + screen-reader dùng được; (AC-TOOL-021-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-021-06) có automated tests.
- **Test cases:** multiple layers; inset; invalid blur; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-022 — Border Radius Generator
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Control per-corner radius.
- **Input:** 4 or 8 radii, unit.
- **Output:** preview and border-radius CSS.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** serialize elliptical radius syntax. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** negative radius; percentage; oversized values. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-022-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-022-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-022-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-022-04) keyboard + screen-reader dùng được; (AC-TOOL-022-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-022-06) có automated tests.
- **Test cases:** four corners; elliptical; invalid negative; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-023 — CSS Unit Converter
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Convert px/rem/em/vw/vh with context.
- **Input:** value, from/to unit, root/font/viewport context.
- **Output:** converted number and explanation.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** context-based formulas; never assume em without element font size. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** zero context; zoom; missing viewport; rounding. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-023-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-023-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-023-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-023-04) keyboard + screen-reader dùng được; (AC-TOOL-023-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-023-06) có automated tests.
- **Test cases:** 16px→1rem at 16; viewport; invalid context; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

### TOOL-024 — Responsive Preview
- **Phase / Nhóm:** P2 / CSS & UI
- **Mục tiêu:** Preview breakpoints using test tab.
- **Input:** target URL, width/height presets, zoom.
- **Output:** preview viewport metadata and screenshots when permitted.
- **UX:** Workspace two-pane (input bên trái, kết quả bên phải); inline validation, Copy, Clear, history opt-in.
- **Logic xử lý:** open isolated preview tab/window; communicate limitations of actual viewport emulation. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** cross-origin iframe blocked; login state; device pixel ratio; zoom. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-024-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-024-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-024-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-024-04) keyboard + screen-reader dùng được; (AC-TOOL-024-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-024-06) có automated tests.
- **Test cases:** preset selection; blocked iframe fallback; cleanup; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure).

## Browser & Debugging (P3)

### TOOL-025 — Cookie Manager
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Inspect/edit/delete authorized site cookies.
- **Input:** active tab origin, cookie selection, editable fields.
- **Output:** cookie list and mutation result.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** chrome.cookies permission + optional host access; respect HttpOnly rules. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** partitioned cookies; SameSite; secure; expiry; permission denied. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-025-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-025-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-025-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-025-04) keyboard + screen-reader dùng được; (AC-TOOL-025-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-025-06) có automated tests.
- **Test cases:** list by origin; denied host; update; delete; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-026 — Storage Manager
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Inspect localStorage/sessionStorage.
- **Input:** active tab, key/value, storage type.
- **Output:** entries, edits, deletion confirmation.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** content script messaging in allowed origin; sessionStorage per tab. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** cross-origin frames; quota; JSON-looking raw strings; denied access. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-026-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-026-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-026-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-026-04) keyboard + screen-reader dùng được; (AC-TOOL-026-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-026-06) có automated tests.
- **Test cases:** read/edit/delete; iframe isolation; denied permission; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-027 — DOM Inspector
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Pick element and copy selector.
- **Input:** active tab, picker trigger.
- **Output:** selector, attributes, DOM preview.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** content script overlay, elementFromPoint, stable selector heuristic. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** shadow DOM; iframe; dynamic classes; page navigation. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-027-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-027-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-027-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-027-04) keyboard + screen-reader dùng được; (AC-TOOL-027-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-027-06) có automated tests.
- **Test cases:** pick nested; escape selector; stop picker; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-028 — CSS Inspector
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Inspect computed styles.
- **Input:** selected DOM element.
- **Output:** computed styles and selected declarations.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** getComputedStyle via content script; copy declaration. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** pseudo elements; CSS variables; inaccessible frames. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-028-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-028-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-028-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-028-04) keyboard + screen-reader dùng được; (AC-TOOL-028-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-028-06) có automated tests.
- **Test cases:** computed value; copy; invalid selection; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-029 — Page Metadata Inspector
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Inspect SEO metadata.
- **Input:** active page URL.
- **Output:** title, description, OG, canonical, heading outline.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** read document metadata via scoped content script. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** SPA navigation; duplicates; empty title; iframe. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-029-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-029-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-029-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-029-04) keyboard + screen-reader dùng được; (AC-TOOL-029-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-029-06) có automated tests.
- **Test cases:** canonical; duplicate meta; SPA route; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-030 — Accessibility Quick Audit
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Run bounded accessibility checks.
- **Input:** active tab, rule toggles.
- **Output:** issues with selector, severity, explanation.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** DOM checks for alt, labels, headings, basic contrast; no full WCAG certification. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** hidden elements; SVG; complex backgrounds; dynamic content. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-030-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-030-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-030-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-030-04) keyboard + screen-reader dùng được; (AC-TOOL-030-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-030-06) có automated tests.
- **Test cases:** missing alt; label association; no false certification; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-031 — Page Performance Snapshot
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Capture available page timing metrics.
- **Input:** active tab, capture request.
- **Output:** navigation/resource timing summary and supported Web Vitals.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** Performance APIs via content script; label unsupported metrics clearly. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** buffer limits; SPA; privacy filtering; missing paint entries. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-031-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-031-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-031-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-031-04) keyboard + screen-reader dùng được; (AC-TOOL-031-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-031-06) có automated tests.
- **Test cases:** navigation timing; unsupported metric; SPA caveat; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-032 — Network Request Monitor
- **Phase / Nhóm:** P3 / Browser & Debugging
- **Mục tiêu:** Observe request metadata within extension limits.
- **Input:** tab, filters, capture start/stop.
- **Output:** request URL/method/status/timing when observable.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** webRequest metadata or devtools panel when available; no promise of response bodies. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** service workers; cache; opaque response; host permissions. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-032-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-032-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-032-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-032-04) keyboard + screen-reader dùng được; (AC-TOOL-032-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-032-06) có automated tests.
- **Test cases:** filter URL; stop capture; missing body clearly noted; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

## API & Automation (P4)

### TOOL-033 — API Request Builder
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Compose and send HTTP requests.
- **Input:** method, URL, headers, auth, body.
- **Output:** status, headers, text/JSON response, timing.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** fetch from extension context where host permission granted; abort controller. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** CORS/host access; redirects; binary; timeout; secret masking. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-033-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-033-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-033-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-033-04) keyboard + screen-reader dùng được; (AC-TOOL-033-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-033-06) có automated tests.
- **Test cases:** GET/POST; timeout; permission denied; secret redaction; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-034 — API Collections
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Store request collections and environments.
- **Input:** request definitions, environment variables.
- **Output:** saved collections, active environment.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** IndexedDB schema, versioning, variable interpolation with cycle detection. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** missing variable; secret fields; import conflict. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-034-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-034-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-034-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-034-04) keyboard + screen-reader dùng được; (AC-TOOL-034-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-034-06) có automated tests.
- **Test cases:** save/load; variable interpolation; migration; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-035 — cURL Converter
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Import/export supported cURL commands.
- **Input:** cURL text or request definition.
- **Output:** request model or cURL text.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** tokenize safely without shell execution; support common flags only. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** shell substitutions; files; multiline quotes; unsupported flags. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-035-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-035-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-035-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-035-04) keyboard + screen-reader dùng được; (AC-TOOL-035-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-035-06) có automated tests.
- **Test cases:** GET import; POST data; reject command substitution; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-036 — Request Mocking
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Provide controlled request/response mocking.
- **Input:** URL match rules, mock response, tab scope.
- **Output:** rule status and observable mock result.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied. Bắt buộc có Start/Stop, confirmation, status rõ ràng và cleanup khi đóng tab.
- **Logic xử lý:** documented declarativeNetRequest redirects to extension resources where feasible; otherwise devtools/test harness alternative. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** dynamic body substitution unsupported; HTTPS; rule quotas; cross-origin. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-036-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-036-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-036-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-036-04) keyboard + screen-reader dùng được; (AC-TOOL-036-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-036-06) có automated tests.
- **Test cases:** supported redirect; unsupported body warning; remove rule; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-037 — Action Recorder
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Record user actions in authorized tabs.
- **Input:** tab, start/stop, redaction options.
- **Output:** ordered steps with selectors and timestamps.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied. Bắt buộc có Start/Stop, confirmation, status rõ ràng và cleanup khi đóng tab.
- **Logic xử lý:** content script event capture, stable selectors, mask sensitive fields. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** password fields; iframe; SPA route; duplicate events. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-037-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-037-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-037-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-037-04) keyboard + screen-reader dùng được; (AC-TOOL-037-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-037-06) có automated tests.
- **Test cases:** click/input; password redacted; navigation; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-038 — Scenario Runner
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Replay recorded scenarios.
- **Input:** scenario, timeout, retry policy.
- **Output:** step results, screenshots/logs where permitted.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied. Bắt buộc có Start/Stop, confirmation, status rõ ràng và cleanup khi đóng tab.
- **Logic xử lý:** content script action dispatch + waits/assertions; stop on failure. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** stale selector; async loading; cross-origin navigation. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-038-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-038-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-038-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-038-04) keyboard + screen-reader dùng được; (AC-TOOL-038-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-038-06) có automated tests.
- **Test cases:** successful replay; timeout; missing selector; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-039 — Form Auto Filler
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Fill forms with synthetic fixtures.
- **Input:** field mapping, fixture template.
- **Output:** filled fields and summary.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** match by name/id/label, dispatch input/change events. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** password fields; rich text editor; hidden fields. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-039-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-039-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-039-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-039-04) keyboard + screen-reader dùng được; (AC-TOOL-039-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-039-06) có automated tests.
- **Test cases:** mapping; change event; skip sensitive fields; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-040 — Snippet Runner
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Run user-authored snippets with strict guardrails.
- **Input:** snippet, explicit target tab, execution consent.
- **Output:** logs/result/errors.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied. Bắt buộc có Start/Stop, confirmation, status rõ ràng và cleanup khi đóng tab.
- **Logic xử lý:** avoid remote code; extension CSP; explicit opt-in and isolated execution design. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** page context isolation; unsafe eval; permission denied; CSP. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-040-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-040-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-040-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-040-04) keyboard + screen-reader dùng được; (AC-TOOL-040-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-040-06) có automated tests.
- **Test cases:** consent; deny remote snippet; error isolation; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-041 — HTTP Header Inspector
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Inspect response/security headers when accessible.
- **Input:** tab/request selection.
- **Output:** header table and basic security observations.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** observe webRequest responseHeaders with host permission; no body capture. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** headers unavailable; redirects; duplicate headers. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-041-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-041-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-041-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-041-04) keyboard + screen-reader dùng được; (AC-TOOL-041-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-041-06) có automated tests.
- **Test cases:** CSP display; multiple Set-Cookie redaction; denied permission; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).

### TOOL-042 — Viewport Ruler
- **Phase / Nhóm:** P4 / API & Automation
- **Mục tiêu:** Measure DOM element sizes and spacing.
- **Input:** active tab, selected elements.
- **Output:** pixel dimensions, distances, overlay.
- **UX:** Side Panel + Workspace; chỉ kích hoạt trên tab được chọn, permission prompt và trạng thái permission denied.
- **Logic xử lý:** content-script boundingClientRect + scroll offsets. Không thay đổi dữ liệu gốc ngoài hành động do user xác nhận.
- **Validation / Edge cases:** transforms; zoom; sticky elements; cross-origin frames. Trả lỗi có ngữ cảnh, không crash hoặc silent fallback.
- **Acceptance criteria:** (AC-TOOL-042-01) Input hợp lệ cho kết quả đúng theo logic; (AC-TOOL-042-02) input lỗi được thông báo cụ thể và không làm hỏng state; (AC-TOOL-042-03) thao tác Copy/Reset/Stop (nếu có) đúng; (AC-TOOL-042-04) keyboard + screen-reader dùng được; (AC-TOOL-042-05) không rò rỉ dữ liệu nhạy cảm và tôn trọng permission; (AC-TOOL-042-06) có automated tests.
- **Test cases:** measure distance; scroll; stop overlay; test boundary, empty input, reset state, keyboard accessibility.
- **Dependency:** TASK-P0-004 (tool registry), TASK-P0-005 (UI shell), TASK-P0-006 (test infrastructure); TASK-P0-007 (Chrome permission broker).
