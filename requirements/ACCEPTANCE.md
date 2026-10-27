# Acceptance & Definition of Done

## Global acceptance (mọi TOOL-xxx)
- AC-01 Input hợp lệ đúng output và serialization contract.
- AC-02 Input sai: actionable error, không crash, không silent data loss.
- AC-03 UI: empty, loading (nếu async), error, success, copy, reset; focus/keyboard/aria.
- AC-04 Bảo mật: không network ngoài ý muốn; secret masking; quyền chỉ xin khi dùng.
- AC-05 Unit tests: happy path, boundary, malformed input, regression; integration tests nếu có Chrome API.
- AC-06 Docs: input/output examples, known limitations, changelog khi sửa behavior.
- AC-07 Performance: input lớn có giới hạn hoặc worker; không block main thread vô thời hạn.

## Phase gates
- P0: shell, registry, permission broker, storage migrations, tests chạy được.
- P1/P2: tất cả tool trong phase đáp ứng AC-01..07.
- P3/P4: thêm permission-denied, cleanup, tab lifecycle, browser E2E.
- P5: no critical/high security findings, manual checklist, packaging, reproducible install.

## Requirement traceability
Mỗi TOOL-xxx liên kết một TASK-Px-yyy trong `plans/TASKS.md`; test name nên chứa TOOL ID. Trường hợp Chrome API không hỗ trợ phải ghi rõ `Unsupported` thay vì mô phỏng kết quả.
