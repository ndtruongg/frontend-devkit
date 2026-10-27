# System Architecture

## Runtime boundaries
Workspace tab, popup và side panel là Vue UI entrypoints; background MV3 service worker xử lý Chrome events, permissions, tab coordination; content scripts chỉ đọc/tương tác DOM ở host được cho phép. Pure utility modules không phụ thuộc Chrome APIs.

## Message protocol
`{requestId, type, payload, tabId?}` → `{requestId, ok, data?, error?}`; schema validation (Zod), sender/origin validation, timeout, no secret logging. Không gửi message tùy ý đến trang không tin cậy.

## Tool lifecycle
Registry metadata → route lazy-load → input validation → execute pure/browser adapter → result serialization → optional history. Abort/cleanup khi unmount, navigation, permission revoke.

## Technology
WXT, Vue 3, TypeScript strict, Tailwind, Pinia (shared UI state), pnpm, Vitest, Playwright. WXT entrypoints cho popup, sidepanel, workspace/new tab tùy implementation. Manifest V3 CSP, no eval/remote scripts.

## Performance & reliability
Large payload guard, lazy components, virtualized tables/trees, worker for CPU-heavy diff/regex where feasible; timeout, cancellation and bounded retry for network tasks. Background service worker có thể bị suspend: không dựa vào memory để lưu state bền vững.
