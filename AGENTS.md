# AGENTS.md — Quy tắc bắt buộc cho AI coding agent

1. Đọc README → PRD → TOOLS → SYSTEM → PERMISSIONS → ROADMAP → TASKS trước khi sửa code.
2. Chỉ làm task được chỉ định và dependency đã hoàn thành. Không tự triển khai phase kế tiếp.
3. Tech stack: WXT, Vue 3, TypeScript strict, Tailwind CSS, Pinia khi có shared state, pnpm, Vitest, Playwright. Không tự thêm backend hoặc cloud.
4. Mỗi tool dùng `TOOL-xxx` làm định danh ổn định. Mỗi task dùng `TASK-Px-yyy`. Không đổi ID. Phải có UI, validation, errors, empty/loading/success states, accessibility và test.
5. Chrome Manifest V3: least privilege, optional permissions/host permissions, không remote code/eval, không tự động thu thập secret. Tính năng không khả thi phải nêu giới hạn, không giả vờ thành công.
6. Input không tin cậy. Không đưa token/cookie/headers nhạy cảm vào log, telemetry, clipboard mặc định. Không inject HTML trực tiếp.
7. Local-first: storage có version/migration, import/export có validate và giới hạn kích thước; mặc định không đồng bộ dữ liệu lên mạng.
8. Trước khi đánh dấu task hoàn tất: chạy lint/typecheck/unit tests; E2E cho flow liên quan Chrome; ghi kết quả và hạn chế còn lại.
9. Không thay đổi requirement hoặc scope âm thầm; đề xuất change request trước.
10. Cuối mỗi task trả: task ID, file đã đổi, lệnh chạy, test pass/fail, rủi ro, next task có thể bắt đầu.
11. Dùng `requirements/ACCEPTANCE.md` làm quality gate và `testing/TEST-PLAN.md` làm chuẩn test.
12. Luôn giữ source modular, không viết mega-component, không truy cập Chrome API trực tiếp từ utility pure functions.
