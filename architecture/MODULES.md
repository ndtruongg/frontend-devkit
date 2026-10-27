# Module Design

```text
entrypoints/{popup,sidepanel,workspace,background.ts,content.ts}
src/{app,components,features,tool-registry,composables,stores,services,types,utils}
src/features/<tool-slug>/{index.ts,ToolView.vue,domain.ts,schemas.ts,__tests__/domain.test.ts}
src/services/{chrome,storage,messaging,permissions}
tests/{unit,integration,e2e}
```

## Typed tool contract (design pseudocode, không phải source)
`ToolDefinition = { id: 'TOOL-001', slug, title, category, phase, surface[], permissions[], component: lazy loader, inputSchema, outputSchema, historyPolicy }`

Pure `domain.ts` exports validate/transform functions; Chrome-dependent feature uses adapter interfaces with test doubles. Registry không import eagerly tất cả ToolView. Tool slug stable; route `/tools/:slug`; missing tool → friendly 404. Avoid circular dependencies and cross-feature imports; common abstractions in services only after ≥2 real consumers.

## Shared components
ToolShell, InputEditor, OutputViewer, ErrorPanel, CopyButton, PermissionGate, EmptyState, LoadingState, SearchPalette, FavoritesMenu, TabContextBar, HistoryPanel.
