# Security Specification: Carta de Marinheiro Glossary

## 1. Data Invariants
1. **Term Invariant**: A nautical term in `/terms/{termId}` must have a valid ID slug (`^[a-z0-9\\-]+$`), required fields (`term`, `category`, `definition`, `importance`), strings strictly bounded in length, and only authenticated users can submit/edit entries.
2. **User Isolation Invariant**: All documents under `/users/{userId}/*` (such as `/users/{userId}/bookmarks/{termId}` and `/users/{userId}/notes/{termId}`) are strictly isolated. A user can ONLY read, create, update, or delete their own bookmarks and notes (`request.auth.uid == userId`).
3. **No PII Leakage**: No public directory of user emails or sensitive data is exposed.
4. **No Identity Spoofing**: `userId` in incoming note and bookmark payloads must strictly match `request.auth.uid`.

## 2. The Dirty Dozen Payloads (Designed to break Identity, Integrity, and State)
1. **Unauthenticated Read on Private Notes**: An unauthenticated client attempting `get` on `/users/user123/notes/estibordo`. Must be REJECTED.
2. **Cross-User Bookmark Stealing**: User `alice` attempting to `list` or `get` `/users/bob/bookmarks`. Must be REJECTED.
3. **Identity Spoofing on Note Creation**: User `alice` submitting a note into `/users/alice/notes/term1` with `userId: "bob"`. Must be REJECTED.
4. **Cross-User Note Deletion**: User `attacker` attempting `delete` on `/users/victim/notes/term1`. Must be REJECTED.
5. **Junk ID Poisoning**: Attempting to write a term with ID containing special characters or exceeding 128 bytes (e.g. `../../../admin`). Must be REJECTED.
6. **Denial of Wallet Payload**: Submitting a definition or note containing 2MB of junk text. Must be REJECTED by string length boundaries (`<= 2000` for definition, `<= 1500` for note).
7. **Ghost Field Injection**: Adding an unauthorized field `{ isAdmin: true, bypassRules: true }` when creating a note or term. Must be REJECTED by `hasOnly` schema checks.
8. **Invalid Enum Poisoning**: Setting `importance: "super-extreme"` instead of `essencial`, `importante`, or `complementar`. Must be REJECTED.
9. **Unauthenticated Term Mutation**: Unauthenticated user trying to delete or overwrite `/terms/estibordo`. Must be REJECTED.
10. **Blanket List Scraping**: Attempting a collectionGroup query across all user notes without user boundary. Must be REJECTED.
11. **Path-Mismatch Injection**: Writing to `/users/alice/bookmarks/bombordo` with body `{ termId: "estibordo" }`. Must be REJECTED by cross-checking path variable with payload.
12. **Tampering with Note Owner**: User attempting to change `userId` during a note update. Must be REJECTED by immutability check.
