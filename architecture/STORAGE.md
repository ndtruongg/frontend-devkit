# Storage & Data Model

## Storage split
- `chrome.storage.local`: UI settings, favorites, permission preferences, lightweight metadata.
- IndexedDB: optional histories, saved API collections, scenarios, mock fixtures, request presets.
- `chrome.storage.session`: ephemeral capture state if needed; no assumption of persistence.
- Page localStorage/sessionStorage belong to website and must never be conflated with extension storage.

## Logical stores
`settings(key,value,version)`, `favorites(toolId,createdAt)`, `history(id,toolId,createdAt,inputRedacted,resultSummary,ttl)`, `collections(id,name,requests,updatedAt)`, `environments(id,name,variables,secretRefs)`, `scenarios(id,name,steps,updatedAt)`, `fixtures(id,name,schema,seed)`.

## Versioning and privacy
Schema version integer; forward migration functions and rollback/export strategy; imports validated and capped. Default history disabled for JWT, passwords, cookies, authorization headers, and snippets. No plaintext secret persistence by default; user must opt in with clear warning. Export excludes secrets unless explicitly requested with warning. Deletion includes associated records; retention TTL configurable.
