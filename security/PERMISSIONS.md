# Chrome MV3 Security & Permission Matrix

## Principle
Request minimum permissions just-in-time. Avoid broad `<all_urls>` host permission by default. Clearly show what domain is accessed, what data is read/changed, and why. Never silently exfiltrate data.

## Capability groups
- Pure utilities TOOL-001..024: no site access required; clipboard via user gesture.
- DOM/Storage/Metadata/A11y/Performance/Viewport TOOL-026..031, TOOL-042: `activeTab`/`scripting` or optional host access depending on lifecycle; content scripts scoped to user-selected tab.
- Cookie Manager TOOL-025: `cookies` plus relevant host permissions; HttpOnly can be inspected via extension API but not page JS.
- Network Request Monitor TOOL-032 and Header Inspector TOOL-041: `webRequest` + host access for observable metadata/headers; response bodies generally unavailable via this API.
- API Builder TOOL-033: optional host permissions per destination; credentials never persisted by default.
- Request Mocking TOOL-036: `declarativeNetRequest` + applicable permissions; cannot promise arbitrary dynamic response body replacement.
- Recorder/Runner/Filler TOOL-037..039: scoped scripting/host permissions; redact password and sensitive fields.
- Snippet Runner TOOL-040: explicit confirmation, user-authored code only, CSP and execution world constraints; do not use eval/remote scripts in extension context.

## Threat model
Malicious webpage messages, XSS in preview, injection in cURL/YAML, secret leaks, extension privilege escalation, permission creep, import bombs. Controls: validate messages and sender, render text safely, size limits, no shell execution, secret redaction, CSP, dependency audit.

## Browser caveats
`chrome://` pages, Chrome Web Store and other protected pages may not allow injection. Cross-origin frames need separate permissions. Service worker can suspend. DevTools-only capabilities must use a dedicated DevTools surface if implemented; do not claim general Network body interception.
