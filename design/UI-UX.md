# UI/UX Specification

## Layout
- Workspace: left nav (search, favorites, categories), top bar (active tab, theme, settings), tool canvas (input/output), optional history drawer.
- Popup 360–420px: search, recent, favorites, Open Workspace.
- Side Panel: contextual tools, tab URL, permission status, narrow responsive layouts.

## Interaction
Command palette `Cmd/Ctrl+K`, keyboard arrow navigation, Enter to open, Escape close. Each tool: heading, short description, input, options, action, output, copy/download/reset, error hints. Never auto-run destructive browser action. Tool state remains isolated on route changes unless user enables retention.

## Accessibility
WCAG 2.2 AA target; contrast, focus visible, label, live region for results, no color-only statuses, reduced motion, keyboard support.

## Design tokens
Neutral surfaces, restrained accent, 4/8px spacing grid, consistent border radius, compact but readable density. Light/dark theme. Avoid heavy gradients and excessive cards.

## Key states
First-run onboarding, no active tab, unsupported URL (chrome://), permission denied, loading, timeout, empty results, success, validation error, partial browser capability, offline.
