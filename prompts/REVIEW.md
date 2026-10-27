# REVIEW PROMPT

Review diff của `{TASK_ID}` / `{TOOL_ID}` dựa trên `AGENTS.md`, `requirements/TOOLS.md`, `requirements/ACCEPTANCE.md`, `security/PERMISSIONS.md` và `testing/TEST-PLAN.md`. Ưu tiên: correctness, data loss, privacy, privilege escalation, MV3 feasibility, edge cases, UX accessibility, tests. Trả về: severity (critical/high/medium/low), file/line, reproduction, fix recommendation, missing tests, go/no-go. Không khẳng định đã chạy test nếu chưa chạy.
