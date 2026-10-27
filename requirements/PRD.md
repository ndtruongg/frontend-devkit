# Product Requirements Document

## Problem & goals
Frontend developers phải chuyển tab qua nhiều website để format data, debug trang và chạy test lặp lại. DevKit gom workflow trong một Chrome Extension offline-first.

## Personas & workflows
- Frontend developer: format JSON, decode JWT, kiểm tra DOM/CSS, responsive.
- QA/frontend hybrid: lưu API collection, tạo mock fixtures, record/replay form.
- Maintainer: thêm tool theo registry mà không sửa core routing.

## Surfaces
- Workspace: tab lớn, navigation/search, split-pane, history và favorites.
- Popup: launcher, recent/favorites, shortcut tới Workspace.
- Side Panel: contextual actions trên active tab, xin quyền khi cần.

## Non-functional requirements
- No backend mandatory; offline for pure utilities.
- Tool registry typed; lazy loading; safe parsing; worker cho tính toán nặng.
- Keyboard navigation, visible focus, screen-reader labels, light/dark.
- No automatic collection/transmission of browsing data; retention configurable.
- Browser actions require explicit consent and minimum permissions.
- Error messages actionable; không làm treo UI trên input lớn.

## Out of scope v1
- Sync cloud, accounts, collaboration, full replacement for Chrome DevTools, arbitrary code execution on any website, unrestricted network body interception.

## Release criteria
P0–P4 hoàn tất theo acceptance; P5 audit, E2E, permissions review, package và hướng dẫn cài đặt.
