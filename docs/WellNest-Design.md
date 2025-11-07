# WellNest Product Design Document

**Version:** 1.0  
**Last Updated:** 2025-11-07  
**Prepared by:** GPT-5 Codex  

---

## 1. Vision & Identity

| Attribute | Details |
| --- | --- |
| **App Name** | WellNest |
| **Tagline** | Build calm habits, one small step at a time. |
| **Target Audience** | Students and young professionals (ages 18–35) managing stress while balancing academic/workload and self-care. |
| **Core Value Proposition** | Unite daily mood journaling, guided micro-meditations, and habit gamification to cultivate consistent, meaningful self-care that fits into a busy schedule. |
| **Business Goal** | Deliver a high-retention wellness companion that can scale to premium content bundles and community-driven growth in later phases. |

**Design Principles**
- *Compassion first*: gentle language, warm visuals, no guilt-driven nudges.
- *Micro-wins*: 2–5 minute tasks that can be completed during short breaks.
- *Privacy by default*: users own their data; no public sharing without explicit consent.
- *Offline-first reliability*: core journal functions never blocked by connectivity.

**Initial Icon Brief**
- Bordered circle with an inner nest stroke motif and a centered heart glyph.
- Color palette: calming teal (#2CA9A3), neutral off-white background (#F7F5F2), dark gray line art (#27303F).
- Flat, minimal style with uniform line weight; contrast ratio ≥ 4.5:1 for accessibility.
- Delivered as vector (SVG/AI) with adaptive icon variants for Android.

**Primary Personas**
- **Alex – The Overloaded Graduate Student (24)**: Needs a lightweight way to monitor mood swings, build consistent hydration and study break habits, and decompress quickly.
- **Maya – The First-Year Consultant (27)**: Travels frequently, wants offline access to meditations and frictionless habit tracking to maintain balance between work and personal life.

**Success Metrics (Phase 1)**
- D7 retention ≥ 40%.
- ≥ 3 mood entries per user per week.
- ≥ 2 guided meditations consumed per user per week.
- ≥ 80% of users configure emergency resources during onboarding.

---

## 2. Feature Overview & Acceptance Criteria

| Pillar | Feature | Description | Acceptance Criteria (summary) |
| --- | --- | --- | --- |
| **Accounts** | Authentication | Email/password sign-up, login, logout, password reset via email (Firebase Auth or custom JWT service). | Given a registered user, when valid credentials are entered, the user is authenticated and routed to `Home`. Diff state persists after app restart. |
| **Accounts** | Profile & Preferences | Display name, avatar initials, timezone, notification preferences, region for helplines synced across devices. | When the user updates preferences, changes persist after sync and are reflected on secondary devices within 60s. |
| **Journal** | Daily Mood Entry | Capture mood (1–5 scale), optional tags, free-text note; offline creation/edit/delete. | Entries saved offline and synced when online; weekly summary updates within 5 minutes of sync completion. |
| **Journal** | Weekly Summary | Auto-generated weekly card with average mood, tag frequency, notable streaks. | Summary recalculates after journal change; displayed on `Insights`. |
| **Mindfulness** | Micro-meditations | API-fed list with duration/difficulty metadata; streaming and offline download; background playback with media controls. | Playback continues with screen off; download persists for 14 days or until manual deletion; progress tracked per user. |
| **Habits** | Habit Tracker with Gamification | Create habits with schedule/goals; daily check-ins accrue XP; streaks and badges shown on profile. | XP/streak counts reflect check-in history; badges unlock at defined thresholds (e.g., 7-day streak). |
| **Safety** | Emergency Support | One-tap access to region-tailored helplines; cached for offline use after first sync. | Resource list available offline; selecting an item initiates dialer or opens URL. |
| **Engagement** | Notifications & Reminders | Journaling and habit reminders via WorkManager + FCM with user-configured times. | Users can enable/disable each reminder; notifications fire within ±5 minutes of scheduled time. |
| **Productivity** | Search & Filter | Filter journal entries by mood, tag, date; text search across notes. | Filter results returned within 500 ms on Pixel 6-tier device; fuzzy search (case-insensitive) supported. |
| **Platform** | Data Sync & Conflict Resolution | Offline-first with Room + Retrofit + WorkManager background sync; conflict policy: last-write-wins with soft merge for note text. | When conflicting edits occur, user sees latest server copy plus appended local note diff. |
| **UX** | Accessibility & Localization | Dynamic type, screen reader labels, contrast compliance, English-first with locale-ready architecture. | Accessibility scanner passes baseline checks; all strings externalized for i18n; supports LTR/RTL layout mirroring readiness. |

Each feature will have detailed test cases in Part 2, covering happy path, connectivity loss, and error handling scenarios.

---

## 3. User Experience Design

### 3.1 Screen Inventory
1. **Onboarding** – Value proposition slides, notification opt-in, region selection.
2. **Authentication** – Sign In, Sign Up, Reset Password flows.
3. **Home (Today)** – Greeting, quick actions (`Log Mood`, `Meditate`, `Check Habits`), streak summary, highlights.
4. **Journal** – Calendar/timeline view, filters, entry detail & editing.
5. **Meditations** – Catalog with duration/difficulty chips, audio player, downloads.
6. **Habits** – Habit list, check-ins, streak badge shelf.
7. **Insights** – Weekly mood trends, habit streak charts, achievements.
8. **Emergency Support** – Regional helplines/resources with call/web deep links.
9. **Settings** – Profile, preferences, notifications, privacy controls, data export/delete.

### 3.2 Interaction Principles
- **Home-first actions**: most common tasks reachable in ≤2 taps from Home.
- **Guided journaling**: friendly prompts, tag suggestions, autosave drafts.
- **Gamification tone**: celebratory microcopy without guilt; e.g., “You kept the streak glowing!”
- **Mindful audio**: minimal UI during playback; large play/pause controls; progress scrubbing.
  
### 3.3 Low-Fidelity Wireframes (ASCII)

```
[Home]
 ┌──────────────────────────────┐
 │  Good evening, Alex          │
 │  • Log Mood   • Meditate     │
 │  • Check Habits              │
 │  Today: Streak 4 days 🔥     │
 ├──────── Meditations ─────────┤
 │  • 2-min Box Breathing ▶     │
 │  • 3-min Body Scan ▶         │
 ├────────── Journal ───────────┤
 │  • Yesterday: 😊 + “Focus”    │
 └──────────────────────────────┘

[Log Mood]
 ┌──────────────────────────────┐
 │ How do you feel today?       │
 │ (1 😞 2 🙁 3 😐 4 🙂 5 😄)      │
 │ Tags: [stressed] [focused]   │
 │ Notes: [ ................ ]  │
 │ [Save]                       │
 └──────────────────────────────┘

[Habits]
 ┌──────────────────────────────┐
 │ + Add Habit                  │
 │ • Hydrate   [Check ✅]       │
 │ • Walk      [Check ☐]        │
 │ Streak: 7 days  | XP: 240    │
 └──────────────────────────────┘
```

### 3.4 Navigation Flow

```
Onboarding → Auth → Home
   Home → Journal ↔ Log/Edit Entry
   Home → Meditations → Player
   Home → Habits → Add/Edit Habit
   Home → Insights
   Home → Emergency
   Home → Settings → (Profile | Notifications | Privacy)
```

### 3.5 Key User Journeys
- **Daily Check-in**: Notification → Home quick action → Log Mood → Weekly summary refresh → Habit streak update.
- **Stress Relief**: Home quick action → Meditations → Download/play → Completion grants XP badge.
- **Safety Access**: Home → Emergency → Tap helpline → Native dialer with prefilled number.

### 3.6 Accessibility & Localization Strategy
- Dynamic font scaling support across Compose typography tokens.
- Content descriptions on interactive components; custom actions for playback controls.
- Color palette validated against WCAG AA; dark theme parity.
- Strings stored in `strings.xml`; use resource qualifiers and `LocaleManager`.
- RTL layout mirroring tested with pseudo-locales; date/time formatted with `java.time`.

---

## 4. System Architecture

### 4.1 Android Client Architecture
- **Presentation:** Jetpack Compose UI backed by ViewModel (AndroidX) leveraging state flows.
- **Domain:** Use cases/interactors defined per feature module (`LogMoodUseCase`, `SyncJournalUseCase`, etc.).
- **Data:** Repository pattern bridging Room (SQLCipher) and Retrofit service interfaces.
- **Background Processing:** WorkManager for scheduled sync, reminder notifications, and download workers.
- **Dependency Injection:** Hilt for scoped dependencies, modularized per feature.
- **Modules (Gradle):**
  - `app`: Composition root, navigation graph.
  - `core-ui`: Theme, components, accessibility helpers.
  - `core-data`: Network, database, serialization, sync framework.
  - `feature-journal`, `feature-habits`, `feature-meditations`, `feature-insights`, `feature-profile`.
  - `testing`: Shared test utilities, fake repositories.

### 4.2 Backend Architecture
- **Services:** Stateless Node.js (NestJS) or Kotlin Ktor microservice exposing REST API.
- **Authentication:** JWT access + refresh tokens; optional integration with Firebase Auth for identity.
- **Database:** PostgreSQL for relational data; Prisma/TypeORM/Exposed as ORM; Redis for caching tokens, rate limits, background job queues.
- **Storage:** Object storage (AWS S3 / GCS) for meditation audio; served via signed URLs through CDN (CloudFront/Fastly).
- **Infrastructure:** Containerized deployments (Docker) on Render/Fly.io/Cloud Run with horizontal scaling, auto TLS.
- **Observability:** OpenTelemetry instrumentation; logs shipped to managed service (Datadog/Logtail); health checks and uptime monitors.
- **Notifications:** Firebase Cloud Messaging for device tokens and topic-based nudges.

### 4.3 Offline Sync Strategy
1. User action stored as local Room record with status `PENDING`.
2. Sync worker batches unsynced records, sending to API via Retrofit.
3. Server responds with authoritative payload; client updates local record to `SYNCED`.
4. Conflict resolution: if server version is newer, apply last-write-wins for scalar fields; append local note diff to preserve user input.
5. WorkManager uses backoff and network constraints; manual sync trigger available in Settings.

### 4.4 Security & Privacy
- Local encryption via SQLCipher and `EncryptedSharedPreferences`.
- TLS 1.2+ enforced; HSTS on API domain; OAuth scopes for future expansions.
- Secrets (API keys) stored in Gradle properties with CI-injected environment variables.
- GDPR/POPIA compliance: explicit consent dialog, data export and deletion endpoints, privacy policy versioning.
- Intrusion prevention: rate limiting, IP throttling, JWT blacklisting on password change, WAF on edge.

---

## 5. Domain & Data Model

### 5.1 Entities & Fields

| Entity | Field | Type | Notes |
| --- | --- | --- | --- |
| **User** | `userId` | UUID | Primary key |
|  | `email` | String | Unique, validated |
|  | `displayName` | String | Optional nickname |
|  | `region` | ISO country code | Drives emergency content |
|  | `prefs` | JSON | Notification times, locale preferences |
| **JournalEntry** | `id` | UUID | PK |
|  | `userId` | UUID | FK → User |
|  | `mood` | Int (1–5) | Required |
|  | `tags` | Array\<String> | Optional, choose from curated list |
|  | `note` | Text | Encrypted locally before sync |
|  | `timestamp` | Instant | ISO8601 UTC |
| **Habit** | `id` | UUID | PK |
|  | `userId` | UUID | FK |
|  | `name` | String | Required |
|  | `schedule` | Enum (`daily`, `custom`) | Determines recurrence |
|  | `goal` | Int | e.g., times per day/week |
|  | `streak` | Int | Derived server-side |
|  | `xp` | Int | Derived server-side |
| **CheckIn** | `id` | UUID | PK |
|  | `habitId` | UUID | FK → Habit |
|  | `date` | Date | Unique composite (`habitId`, `date`) |
|  | `value` | Boolean | Completion status |
| **Meditation** | `id` | UUID | PK |
|  | `title` | String | |
|  | `durationMin` | Int | 2–10 minutes |
|  | `difficulty` | Enum (`easy`, `medium`, `hard`) | |
|  | `mediaKey` | String | Storage key for CDN |
| **Resource** | `id` | UUID | PK |
|  | `region` | String | Filter key |
|  | `name` | String | Resource label |
|  | `type` | Enum (`phone`, `site`) | |
|  | `contact` | String | Tel or URL |

### 5.2 Relationships
- `User` 1—∞ `JournalEntry`
- `User` 1—∞ `Habit`
- `Habit` 1—∞ `CheckIn`
- `User` 1—∞ `MeditationProgress` (future extension for tracking completions)
- `Region` 1—∞ `Resource`

### 5.3 Local Cache Schema (Room)
- Tables mirror remote schema with additional metadata: `syncState`, `updatedAt`, `deletedAt`.
- FTS (Full Text Search) virtual table on journal notes for in-app search.
- `Downloads` table tracks meditation asset status and file path.

---

## 6. API Design

### 6.1 Conventions
- Base URL: `https://api.wellnest.app/v1/`
- RESTful endpoints with JSON payloads.
- `Authorization: Bearer <token>` for authenticated requests.
- Pagination via `page` and `pageSize`; default 20.
- Errors follow `{ "error": { "code": "JOURNAL_NOT_FOUND", "message": "..." } }`.

### 6.2 Endpoint Catalog (Summary)

| Domain | Method & Path | Request | Response |
| --- | --- | --- | --- |
| **Auth** | `POST /auth/register` | `{ email, password, displayName }` | `201 Created`, `{ accessToken, refreshToken, user }` |
|  | `POST /auth/login` | `{ email, password }` | `{ accessToken, refreshToken, user }` |
|  | `POST /auth/refresh` | `{ refreshToken }` | `{ accessToken }` |
| **User** | `GET /me` | — | User profile & prefs |
|  | `PATCH /me` | Partial updates | Updated profile |
| **Journal** | `GET /journal?from=&to=` | Query params optional | Array of entries |
|  | `POST /journal` | `{ mood, tags[], note, ts }` | `201 Created` entry |
|  | `PATCH /journal/{id}` | Partial update | Updated entry |
|  | `DELETE /journal/{id}` | — | `204 No Content` |
|  | `GET /journal/summary?range=week` | Default last 7 days | Aggregated stats |
| **Habits** | `GET /habits` | — | List of habits |
|  | `POST /habits` | `{ name, schedule, goal }` | New habit |
|  | `PATCH /habits/{id}` | Partial update | Updated habit |
|  | `DELETE /habits/{id}` | — | `204` |
|  | `POST /habits/{id}/checkin` | `{ date, value }` | Updated streak/xp |
|  | `GET /habits/summary?range=week` | — | XP, streak stats |
| **Meditations** | `GET /meditations?duration<=5` | Query filters | Catalog slice |
|  | `GET /meditations/{id}` | — | Metadata + signed audio URL (expires 10 min) |
|  | `POST /meditations/{id}/complete` | Optional (future) | Completion log |
| **Resources** | `GET /resources?region=ZA` | Region code | Array of helplines |
| **Notifications** | `POST /devices` | `{ token, platform }` | Register device |
|  | `DELETE /devices/{token}` | — | Unregister |

### 6.3 Validation & Error Handling
- Input validation via Zod/Joi; error code mapping to HTTP 400.
- Authentication errors use HTTP 401/403, refresh token invalidation.
- Rate limit responses: HTTP 429 with `Retry-After`.
- Server errors instrumented with unique trace IDs.

### 6.4 SDK & Mocking Strategy
- Generate Kotlin client via OpenAPI spec for Retrofit integration.
- Provide Postman collection and mock server (Prism/MSW) for frontend dev.
- Feature toggles (e.g., meditations) controlled through `GET /me` config payload.

---

## 7. UML Diagrams (Text Representations)

### 7.1 Use Case Diagram

```
Actor: User
  - Register/Login
  - Log Mood
  - Browse/Play Meditation
  - Create/Check-in Habit
  - View Insights
  - Configure Notifications
  - Access Emergency Resources

Actor: Admin (future)
  - Manage Meditations Catalog
  - Manage Resource Listings
```

### 7.2 Sequence Diagram – “Log Mood & Sync”

```
User → App: Open Log Mood
App → User: Display scale, tags, notes input
User → App: Submit entry
App → Local DB (Room): Save draft entry (status=PENDING)
App → API: POST /v1/journal {entry}
API → DB (PostgreSQL): Insert entry
API → App: 201 Created {id, timestamps}
App → Local DB: Update entry with server id (status=SYNCED)
App → User: Success toast & refresh insights cache
```

### 7.3 Component Diagram (High Level)

```
[Android App]
  - UI Layer (Jetpack Compose)
  - ViewModel Layer (StateFlows)
  - Repository Layer (Room + Retrofit)
  - Local DB (Room/SQLCipher)
  - WorkManager (Sync & Notifications)

[Backend Services]
  - Auth Service (JWT)
  - Journal Service
  - Habits Service
  - Meditations Service (CDN integration)
  - Resources Service
  - PostgreSQL, Redis
```

### 7.4 Class Diagram (Domain)

```
User
  + userId: String
  + email: String
  + displayName: String
  + region: String
  + prefs: Map<String, Any>

JournalEntry
  + id: String
  + userId: String
  + mood: Int
  + tags: List<String>
  + note: String
  + timestamp: Instant

Habit
  + id: String
  + userId: String
  + name: String
  + schedule: Schedule
  + goal: Int
  + streak: Int
  + xp: Int

Meditation
  + id: String
  + title: String
  + durationMin: Int
  + difficulty: Difficulty
  + mediaUrl: String (signed)
```

---

## 8. Project Plan

### 8.1 Timeline & Durations

| Task | Start | End | Duration |
| --- | --- | --- | --- |
| Requirements Finalization | 09 Sep | 11 Sep | 3 days |
| UX Wireframes & Icon | 10 Sep | 14 Sep | 5 days |
| API Schema & Contracts | 12 Sep | 16 Sep | 5 days |
| Backend MVP (Auth, Journal) | 15 Sep | 23 Sep | 9 days |
| Backend (Habits, Meditations) | 20 Sep | 28 Sep | 9 days |
| Android App: Auth + Home | 22 Sep | 29 Sep | 8 days |
| Android App: Journal Module | 26 Sep | 03 Oct | 8 days |
| Android App: Habits Module | 29 Sep | 06 Oct | 8 days |
| Android App: Meditations | 02 Oct | 09 Oct | 8 days |
| Sync & Notifications | 06 Oct | 11 Oct | 6 days |
| Insights & Charts | 09 Oct | 13 Oct | 5 days |
| Accessibility & Localization | 12 Oct | 14 Oct | 3 days |
| QA: Unit/Integration Tests | 10 Oct | 16 Oct | 7 days |
| Bug Fix & Polish | 15 Oct | 20 Oct | 6 days |
| Final Review & Submission | 20 Oct | 21 Oct | 2 days |

### 8.2 ASCII Gantt Preview

```
09 Sep |■■■ Req
10 Sep |■■■■■ UX
12 Sep |■■■■■ API
15 Sep |■■■■■■■■■ Backend1
20 Sep | ■■■■■■■■■ Backend2
22 Sep |  ■■■■■■■■ App Auth/Home
26 Sep |    ■■■■■■■■ Journal
29 Sep |      ■■■■■■■■ Habits
02 Oct |        ■■■■■■■■ Meditations
06 Oct |           ■■■■■■ Sync/Notif
09 Oct |             ■■■■■ Insights
12 Oct |               ■■■ Access/Loc
10 Oct |            ■■■■■■■ QA
15 Oct |               ■■■■■■ Fix
20 Oct |                    ■■ Submit
```

### 8.3 Milestones
- **M1 (16 Sep):** Requirements frozen, API mock available.
- **M2 (29 Sep):** Auth + Home + Journal create/read functional end-to-end.
- **M3 (09 Oct):** All core modules (Journal, Habits, Meditations) feature complete.
- **M4 (16 Oct):** QA exit criteria met; crash-free sessions ≥ 99% in test cohort.
- **M5 (21 Oct):** Submission-ready build and documentation bundle delivered.

### 8.4 Resourcing & Tools
- Team: 1 Android dev, 1 backend dev, 1 designer (shared), 1 QA.
- Tooling: Android Studio, Figma, Postman, GitHub Actions CI/CD, Sentry or Firebase Crashlytics (opt-in).
- Risk buffer: 15% slack for vacation/unknowns, integrated into overlapping tasks.

---

## 9. Testing & Quality Strategy
- **Unit Tests:** 70% coverage in domain layer; use coroutine test harness and fake repositories.
- **Instrumentation Tests:** Espresso for Compose UI, Robolectric for offline flows.
- **Backend Tests:** Jest/Kotest for service layer, contract tests against OpenAPI.
- **Performance Benchmarks:** Macrobenchmark tests for cold start and screen render; backend load tests simulating 5k DAU.
- **Security Testing:** OWASP MSTG checklist, static analysis (Detekt, SonarLint), penetration test before launch.
- **Release Process:** Feature flags for staged rollout, alpha testing with closed group, telemetry dashboards for crash rate and retention.

---

## 10. Key Risks & Mitigations
- **Content Licensing:** Micro-meditations require licensed content; plan for either curated public API or contracted audio assets. *Mitigation:* Start with open-licensed audio while negotiating licenses.
- **Offline Audio Storage Size:** Downloads may bloat storage. *Mitigation:* Limit to 10 items with automatic expiry + user management UI.
- **Habit Gamification Complexity:** XP/streak rules must be intuitive. *Mitigation:* Document XP matrix, run usability tests, provide in-app explanations.
- **Data Privacy Regulations:** Multi-region compliance overhead. *Mitigation:* Centralize consent management, schedule external legal review.
- **Notification Fatigue:** Overuse may cause churn. *Mitigation:* Provide granular controls, adaptive reminder scheduling based on engagement.

---

## 11. Next Steps Toward Prototype (Part 2)
1. Produce high-fidelity UI mockups in Figma with component library.
2. Define OpenAPI specification and generate client stubs.
3. Scaffold Android project with module structure and base navigation.
4. Stand up backend skeleton with auth and journal endpoints backed by PostgreSQL.
5. Implement automated build/test pipeline in GitHub Actions.

---

## 12. References
- Android Developers. *Guide to App Architecture (MVVM / Clean)*.
- Android Developers. *WorkManager & Background Processing*.
- Firebase. *Authentication & Cloud Messaging Documentation*.
- Jetpack Compose. *Accessibility & Design Guidelines*.
- OWASP. *Mobile Security Testing Guide (MSTG)*.
