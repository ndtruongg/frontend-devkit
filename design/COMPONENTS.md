# Shared UI foundation — TASK-P0-002

Phạm vi: Tailwind/theme và primitives. Không bao gồm router, tool registry hay Workspace/Side Panel shell.

## Styles và tokens

- Import `src/app/styles/main.css` một lần tại entrypoint của từng app. WXT dùng `@tailwindcss/vite`; Tailwind chỉ scan `entrypoints/` và `src/`, không scan test fixtures để sinh utility ngoài ý muốn.
- `tokens.css`: neutral surface/panel/ink/muted, một accent xanh lá, semantic danger/success, control border/focus. Light/dark dùng cùng tên token; không hard-code màu trong view.
- Token tạo utility qua `@theme inline`: `bg-surface`, `bg-panel`, `text-ink`, `text-muted`, `text-danger`, `text-success`, `border-line`, `text-accent`, `rounded-control`.
- Spacing theo đơn vị 4px mặc định của Tailwind: gap-2 = 8px, p-3 = 12px, p-6 = 24px. Control radius 6px, min-height 40px; không thêm gradient/shadow nặng.
- Global focus-visible outline 2px, offset 3px. Motion chỉ dùng cho feedback; reduced-motion tắt transition/animation và giữ nguyên text trạng thái.
- Contrast token tests yêu cầu body/secondary/semantic text và primary button text ≥4.5:1; focus/control border ≥3:1. Disabled control không dùng làm dữ liệu tham chiếu contrast.

## Theme

1. Mỗi Vue app cài `createPinia()` trước khi mount.
2. Gọi `useThemeDocument()` đúng một lần ở app root.
3. Dùng `ThemeSelect` để chọn `system` / `light` / `dark`. Store kiểm tra giá trị trước khi đổi; chế độ system phản ứng với OS theme change.

Composable đặt `data-theme` trên document root, tháo listener/watch và khôi phục attribute cũ khi unmount. CSS tự theo OS trước khi Vue mount để không cần inline script trái CSP.

Theme hiện giữ trong memory của app đang mở. Reload/mở popup mới quay về system; chưa đồng bộ giữa surface hoặc lưu bền vững. Việc tích hợp storage có schema/migration thuộc TASK-P0-008, không dùng localStorage tạm để vượt dependency.

## Component contracts

| Component | Contract và accessibility |
| --- | --- |
| `UiButton` | Native button, mặc định `type="button"`; variant primary/secondary/danger. `loading` hoặc `disabled` chặn click bằng native disabled; loading có `aria-busy` và spinner ẩn khỏi SR. Cần label qua default slot, submit phải chọn tường minh |
| `UiTextField` | `v-model` string và visible `label`; ID tự sinh hoặc truyền `id`. `hint`/`error` liên kết bằng aria-describedby, invalid chỉ khi có error, lỗi dùng role=alert. Native required/disabled, attrs như autocomplete/placeholder chuyển vào input. Chỉ hiển thị validation của consumer, không tự parse dữ liệu tool |
| `UiStatus` | kind empty/loading/error/success, title bắt buộc, description tùy chọn. Heading có ID tự sinh hoặc headingId; empty là named region, error là alert, loading/success là status. Có nhãn chữ và loading indicator, không dựa riêng vào màu. Default slot cho hành động do consumer cung cấp |
| `CopyButton` | `text` bắt buộc; disabled khi text rỗng hoặc được yêu cầu. Chỉ ghi clipboard khi click, không copy lúc mount/đổi props. Loading chặn click lặp; status thông báo thành công/lỗi. Không lộ native error hoặc nội dung copy trong thông báo. Đổi text làm mất feedback cũ; promise cũ không báo success cho text mới |
| `ThemeSelect` | Native select với visible label “Giao diện”, hint về thời hạn áp dụng. Hỗ trợ bàn phím native, focus-visible và 3 lựa chọn rõ ràng |

Các component dùng Vue text interpolation, không inject HTML từ props. Không đọc Chrome API hoặc tự lưu input/history. Consumer phải bảo vệ thông tin nhạy cảm và chỉ truyền kết quả được người dùng chủ động muốn copy; CopyButton không tự phân loại secret.

Ví dụ dùng trong tool khi task tool được mở:

```vue
<UiTextField v-model="input" label="Dữ liệu đầu vào" :error="validationError" />
<UiButton variant="primary" :loading="pending" :disabled="!canRun" @click="run">
  Xử lý
</UiButton>
<CopyButton :text="output" :disabled="!hasResult" />
<UiStatus v-if="error" kind="error" title="Không thể xử lý" :description="error" />
```

## Verification và giới hạn

- Unit: theme transitions, invalid preference, contrast policy trên token thật.
- Component: labels/IDs/error references, input events, native disabled/loading, status semantics, clipboard success/denied/unavailable/in-flight/stale feedback, theme listener cleanup.
- E2E production extension: OS/manual theme, keyboard focus, light/dark axe scans, reduced motion, 360px overflow, reset preference sau reload; ảnh light/dark được attach vào Playwright report.
- Axe không chứng minh toàn bộ WCAG 2.2 AA. Chưa audit screen reader thật hoặc native clipboard trên các OS; primitives chưa có consumer tool sẽ được E2E thêm tại task tool liên quan.
- PermissionGate, editor, search palette, history và tool shell được triển khai khi task sở hữu được mở, không đưa vào primitives task này.
