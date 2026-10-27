# Task Backlog — source of truth

Trạng thái mặc định: TODO. Task ID bất biến. Dependency phải hoàn thành trước khi bắt đầu.

## P0 Foundation
- [x] **TASK-P0-001** Initialize WXT Vue TS pnpm workspace. Depends: none. Done: implementation + tests + docs. Evidence: [test report](../testing/reports/TASK-P0-001.md).
- [x] **TASK-P0-002** Tailwind theme, shared UI primitives. Depends: TASK-P0-001. Done: implementation + tests + docs. Evidence: [test report](../testing/reports/TASK-P0-002.md).
- [ ] **TASK-P0-003** Manifest MV3 entrypoints and routing. Depends: TASK-P0-001. Done: implementation + tests + docs.
- [ ] **TASK-P0-004** Typed tool registry + lazy loading. Depends: TASK-P0-003. Done: implementation + tests + docs.
- [ ] **TASK-P0-005** Workspace/popup/sidepanel shell and command palette. Depends: TASK-P0-002, TASK-P0-004. Done: implementation + tests + docs.
- [x] **TASK-P0-006** Vitest/Playwright, lint/typecheck CI. Depends: TASK-P0-001. Done: implementation + tests + docs. Evidence: [test report](../testing/reports/TASK-P0-006.md).
- [ ] **TASK-P0-007** Permission broker, message validation, tab lifecycle. Depends: TASK-P0-003. Done: implementation + tests + docs.
- [ ] **TASK-P0-008** Storage schemas, migrations, privacy settings. Depends: TASK-P0-006. Done: implementation + tests + docs.
- [ ] **TASK-P0-009** P0 E2E + architecture review. Depends: TASK-P0-005, TASK-P0-006, TASK-P0-007, TASK-P0-008. Done: implementation + tests + docs.

## P1 — tools
- [ ] **TASK-P1-001** Implement **TOOL-001 JSON Formatter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-001-01..06, unit/component tests.
- [ ] **TASK-P1-002** Implement **TOOL-002 JSON Diff**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-002-01..06, unit/component tests.
- [ ] **TASK-P1-003** Implement **TOOL-003 JSON ↔ CSV**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-003-01..06, unit/component tests.
- [ ] **TASK-P1-004** Implement **TOOL-004 JSON ↔ YAML**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-004-01..06, unit/component tests.
- [ ] **TASK-P1-005** Implement **TOOL-005 Mock Data Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-005-01..06, unit/component tests.
- [ ] **TASK-P1-006** Implement **TOOL-006 Data Explorer**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-006-01..06, unit/component tests.
- [ ] **TASK-P1-007** Implement **TOOL-007 JWT Decoder**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-007-01..06, unit/component tests.
- [ ] **TASK-P1-008** Implement **TOOL-008 Base64 Encoder**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-008-01..06, unit/component tests.
- [ ] **TASK-P1-009** Implement **TOOL-009 URL Encoder**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-009-01..06, unit/component tests.
- [ ] **TASK-P1-010** Implement **TOOL-010 Hash Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-010-01..06, unit/component tests.
- [ ] **TASK-P1-011** Implement **TOOL-011 UUID Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-011-01..06, unit/component tests.
- [ ] **TASK-P1-012** Implement **TOOL-012 Password Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-012-01..06, unit/component tests.
- [ ] **TASK-P1-013** Implement **TOOL-013 Regex Tester**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-013-01..06, unit/component tests.
- [ ] **TASK-P1-014** Implement **TOOL-014 Text Diff**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-014-01..06, unit/component tests.
- [ ] **TASK-P1-015** Implement **TOOL-015 Case Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-015-01..06, unit/component tests.
- [ ] **TASK-P1-016** Implement **TOOL-016 Timestamp Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-016-01..06, unit/component tests.
- [ ] **TASK-P1-017** Implement **TOOL-017 Number Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-017-01..06, unit/component tests.
- [ ] **TASK-P1-018** Implement **TOOL-018 HTML Entity Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-018-01..06, unit/component tests.

## P2 — tools
- [ ] **TASK-P2-019** Implement **TOOL-019 Color Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-019-01..06, unit/component tests.
- [ ] **TASK-P2-020** Implement **TOOL-020 Gradient Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-020-01..06, unit/component tests.
- [ ] **TASK-P2-021** Implement **TOOL-021 Box Shadow Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-021-01..06, unit/component tests.
- [ ] **TASK-P2-022** Implement **TOOL-022 Border Radius Generator**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-022-01..06, unit/component tests.
- [ ] **TASK-P2-023** Implement **TOOL-023 CSS Unit Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-023-01..06, unit/component tests.
- [ ] **TASK-P2-024** Implement **TOOL-024 Responsive Preview**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006. Done: AC-TOOL-024-01..06, unit/component tests.

## P3 — tools
- [ ] **TASK-P3-025** Implement **TOOL-025 Cookie Manager**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-025-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-026** Implement **TOOL-026 Storage Manager**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-026-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-027** Implement **TOOL-027 DOM Inspector**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-027-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-028** Implement **TOOL-028 CSS Inspector**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-028-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-029** Implement **TOOL-029 Page Metadata Inspector**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-029-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-030** Implement **TOOL-030 Accessibility Quick Audit**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-030-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-031** Implement **TOOL-031 Page Performance Snapshot**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-031-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P3-032** Implement **TOOL-032 Network Request Monitor**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-032-01..06, unit/component tests, browser integration/E2E.

## P4 — tools
- [ ] **TASK-P4-033** Implement **TOOL-033 API Request Builder**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-033-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-034** Implement **TOOL-034 API Collections**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-034-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-035** Implement **TOOL-035 cURL Converter**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-035-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-036** Implement **TOOL-036 Request Mocking**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-036-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-037** Implement **TOOL-037 Action Recorder**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-037-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-038** Implement **TOOL-038 Scenario Runner**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-038-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-039** Implement **TOOL-039 Form Auto Filler**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-039-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-040** Implement **TOOL-040 Snippet Runner**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-040-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-041** Implement **TOOL-041 HTTP Header Inspector**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-041-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P4-042** Implement **TOOL-042 Viewport Ruler**. Depends: TASK-P0-004, TASK-P0-005, TASK-P0-006, TASK-P0-007. Done: AC-TOOL-042-01..06, unit/component tests, browser integration/E2E.
- [ ] **TASK-P1-QA** Phase integration/regression gate. Depends: all TASK-P1-xxx. Done: acceptance and test report.
- [ ] **TASK-P2-QA** Phase integration/regression gate. Depends: all TASK-P2-xxx. Done: acceptance and test report.
- [ ] **TASK-P3-QA** Phase integration/regression gate. Depends: all TASK-P3-xxx. Done: acceptance and test report.
- [ ] **TASK-P4-QA** Phase integration/regression gate. Depends: all TASK-P4-xxx. Done: acceptance and test report.

## P5 Release & Hardening
- [ ] **TASK-P5-001** Security/privacy and dependency audit. Depends: TASK-P4-QA. Done: signed-off checklist and evidence.
- [ ] **TASK-P5-002** Cross-browser-flow E2E and performance hardening. Depends: TASK-P5-001. Done: signed-off checklist and evidence.
- [ ] **TASK-P5-003** User docs, installation, troubleshooting. Depends: TASK-P5-002. Done: signed-off checklist and evidence.
- [ ] **TASK-P5-004** Build/package and release checklist. Depends: TASK-P5-003. Done: signed-off checklist and evidence.
