# IMPLEMENT TOOL PROMPT

Thay `{TOOL_ID}` và `{TASK_ID}` bằng ID thực từ `requirements/TOOLS.md` và `plans/TASKS.md`.

Hãy triển khai duy nhất `{TASK_ID}` / `{TOOL_ID}`. Đọc `AGENTS.md`, đặc tả tool, architecture, permissions, acceptance và testing. Kiểm tra dependency đã DONE. Trước khi code: trình bày UI states, input/output schema, algorithm, edge cases, quyền cần xin, danh sách tests. Sau đó implement domain logic, Vue UI, registry entry, tests, docs. Không thay đổi tool khác ngoài shared abstractions cần thiết. Chạy lint/typecheck/test/build; nếu browser tool, chạy E2E phù hợp. Báo files, kết quả, known limitations, next task.
