# System Specification Document (SSD) — YouTube Content Automation
## EasyCTET: Script Engine → Render Engine → Upload Engine → Dashboard

**Revision:** v2.0 — Supersedes v1.0's single-pipeline design. Consolidates the three-engine architecture, narrowed content scope, multi-provider TTS router, and manual-status dashboard agreed across discussion.
**Parent documents:** [EasyCTET_YouTube_Shorts_Strategy.md](./EasyCTET_YouTube_Shorts_Strategy.md) (content tone/voice-register/compliance rules — still authoritative; its scope numbers are superseded by §1 below), [SCRIPT_FORMAT_SPEC.md](./SCRIPT_FORMAT_SPEC.md) (the formal Script Engine ↔ Render Engine contract), `docs/EasyCTET-SSD/easyctet_app_ssd_v2.md` (app SSD — format precedent)
**Status:** Design only. No code, credentials, or infrastructure exist yet. Nothing in this document has been executed.

---

## 1. Content Scope (Revised)

Not the full 750-question bank — a deliberately narrowed, pedagogy-focused pool, decided in discussion:

| Subject | Rule | Count |
|---|---|---|
| **CDP** | Everything — both study material and questions. The anchor subject. | 150 |
| **Mathematics** | Pedagogy-only (Van Hiele, errors-as-diagnostic, ethnomathematics, concrete teaching aids, gender bias). The 124 pure number-crunching questions are excluded from video content. | 26 |
| **EVS** | Pedagogy-only (constructivist unit planning, assessment types, field trips, sensitive-topic pedagogy). Facts/geography/animals/health content is excluded. | 55 |
| **Language Pedagogy** | English + Hindi pedagogy questions run as **one combined track** — shared theory (LSRW, second-language acquisition, assessment, error analysis) illustrated with examples from both languages, rather than two siloed subjects. Comprehension/grammar/poetry drills are excluded. | 143 (68 English + 75 Hindi) |

**Total working pool: 374 questions**, across four content areas: `CDP`, `Mathematics`, `EVS`, `Language Pedagogy`. This replaces every earlier reference to "5 subjects" or "750 questions" in the strategy doc and in `week1-schedule.json`'s pillar assignments — those numbers are now historical, not current scope. The five content-*pillar* formats (P1 Daily Drill, P2 Concept in 40, P3 Trap Buster, P4 Exam Craft, P5 Product Moment) from the strategy doc are unaffected by this — pillars are a video *shape*, subjects are a *source pool*, and only the pool narrowed.

---

## 2. Architecture — Three Independent Engines + a Dashboard

```
┌──────────────────┐        ┌───────────────────────┐        ┌───────────────────┐
│  SCRIPT ENGINE     │        │   RENDER ENGINE          │        │  UPLOAD ENGINE       │
│                    │        │   (Remotion — standalone,│        │  (YouTube Data API)  │
│  Produces files    │        │    reusable outside this │        │                      │
│  conforming to      │───────▶│    project)               │───────▶│  Takes: finished .mp4 │
│  SCRIPT_FORMAT_     │(once   │                          │(once   │         + metadata    │
│  SPEC.md, from two   │approved)  Takes: an approved     │rendered│  → uploads PRIVATE    │
│  sources:            │        script + generates its    │        │  → assigns playlist   │
│   • me, authoring    │        own audio via the TTS      │        │  → NEVER requests     │
│     against the real │        router (§4) — the ONLY     │        │    publish-capable     │
│     question bank     │        source of audio; nothing   │        │    OAuth scope — see  │
│   • Import Script,    │        is ever imported            │        │    §6                 │
│     from another app  │        pre-recorded                │        └──────────┬───────────┘
│     you build, once   │      → runs captions, thumbnail,  │                   │
│     validated against │        compliance guardrail check │                   │
│     the same schema   │      → produces finished .mp4      │                   │
└─────────┬─────────────┘        + generated metadata        │                   │
          │                    └───────────────────────────┘                   │
          │                                                                       │
          v                                                                       v
┌─────────────────────────────────── DASHBOARD ──────────────────────────────────────┐
│  Single local HTML page. Reads state from all three engines. One row per video,      │
│  status field editable by you: Scripted → Approved / Rejected → Audio Ready →        │
│  Rendered → Uploaded (Private) → Published → Completed / Hold / Retired               │
│                                                                                        │
│  Controls: Approve / Reject (batch-capable) · ▶ Process Now (global + per-row) ·      │
│  Import Script · manual status editor (including marking Published/Completed          │
│  yourself — the dashboard never auto-detects this)                                    │
└───────────────────────────────────────────────────────────────────────────────────┘
                                                                        │
                                                              (you, manually, in
                                                               YouTube Studio itself —
                                                               outside this system,
                                                               by design — see §6)
```

**Why three engines instead of one pipeline (v1.0's design):** each engine is independently testable, independently replaceable, and — for Render Engine specifically — genuinely reusable outside this project, since it takes nothing project-specific as input, only a schema-conformant script and whatever audio its own TTS router produces. The engines talk to each other only through files on disk (a script file, a rendered video file, a state ledger) — never through direct function calls or a shared process — so any one of them could be rebuilt or replaced without touching the other two.

---

## 3. Script Engine

**Input:** a real question-bank entry (or, for P2/P4 concept videos, study material / established pedagogical theory) from the §1 content scope.
**Output:** a file conforming to [SCRIPT_FORMAT_SPEC.md](./SCRIPT_FORMAT_SPEC.md) — a beat timeline (frame ranges, `onScreen` English text, `vo` Hinglish text) plus YouTube metadata (title/description/tags/playlist), landing in the dashboard's queue with status `Scripted`.

**Two sources, one contract:**

1. **Authored here, by me.** Grounded in the actual bank JSON — question text, options, and explanation copied verbatim into `onScreen` fields, never paraphrased or invented. This is a standing rule carried over from every script written so far in this project (see the Week 1 scripts already delivered as worked examples).
2. **Imported**, from another app you build later, once it emits files matching the same schema. The dashboard's **Import Script** action validates any incoming file against `SCRIPT_FORMAT_SPEC.md` before it's accepted into the queue — a file that fails validation is rejected with the specific field that failed, never silently coerced. Once accepted, an imported script is indistinguishable from an internally-authored one to every downstream engine; only `source.origin` in the file itself records where it came from.

**What Script Engine explicitly does not do:** generate question text, explanations, or hooks with an LLM at render time. Scripts are authored ahead of time, reviewed for accuracy against the bank, and sit as static files before anything downstream touches them — script quality is a human/authoring-time decision, never something invented live inside an unattended run. It also never touches audio — confirmed: **audio is Render Engine's job alone, regardless of a script's origin.**

**VO-minimum rule (applies to every script, either source):** the spoken `vo` line carries only the hook, the question, the reveal, and one compressed reasoning sentence. The fuller explanation lives in `onScreen` text only — reading is free, every spoken character draws down a TTS provider's quota (§4).

---

## 4. Render Engine

**Standalone and reusable** — takes an approved script file and produces a finished, captioned, thumbnailed `.mp4` with generated metadata. It has no knowledge of where the script came from, and no knowledge of what happens to the video after it hands off a finished file — clean boundaries in both directions.

### 4.1 TTS — Multi-Provider Router

**100% AI voice. No human-recorded audio exists anywhere in this system.** The only human involvement in the entire pipeline is at the dashboard: approving scripts and later marking status in YouTube Studio.

**Why a router instead of one provider:** free-tier limits are the real constraint at this volume, not money — a single provider is a single point of failure if its free tier runs tight in a given month or a preview model's daily request cap gets hit mid-batch. A ranked list means a batch degrades to a slightly different voice instead of stopping.

| Rank | Provider | Voice | Free tier (as documented) | Notes |
|---|---|---|---|---|
| 1 | **Google Cloud TTS** | Chirp 3 HD (`hi-IN`) | 1M chars/month, recurring | Primary. Best-quality option with a clearly documented, non-expiring free tier. |
| 2 | Google Cloud TTS | Neural2 (`hi-IN`) | 1M chars/month, recurring — **verify at setup whether this shares Chirp 3 HD's pool or has its own**; Google's documentation is ambiguous here | Same-vendor fallback, same SSML lexicon technique applies. |
| 3 | Azure Neural | `hi-IN-SwaraNeural` | 500K chars/month, recurring | **Genuinely independent quota** — different vendor entirely, the real hedge if Google's pool (ranks 1–2) is exhausted in a month. |
| 4 | Sarvam Bulbul | Hinglish-specialist voice | No meaningful recurring free tier — paid from first character | Last resort so a batch never fully blocks; trivial cost (~$36/1M chars) at this volume. |
| 5 (pending) | Gemini 3.1 Flash TTS | — | Ambiguous whether audio *output* is covered by the preview free tier | **Held out of the rotation until an actual A/B test against Chirp 3 HD, on real vocabulary, once the token is shared.** Not added to the ranked list on documentation alone. |

**Mechanism — a local usage ledger, not a live balance check.** None of these providers reliably expose a "remaining quota" endpoint to a plain API key:

* `data/tts_usage_ledger.json` — append-only log: `{provider, timestamp, charactersSent}` per successful call.
* `data/tts_providers.json` — per-provider config: API key env var, a conservative safety cap set *below* the documented free-tier limit, and that provider's reset date.
* Before generating audio for a video, the router computes the script's character count, walks the ranked list, and uses the first provider whose (used-this-month + this video) stays under its safety cap.
* If every provider would breach its cap, generation halts for that video and it's flagged on the dashboard — never silently falls through to an unplanned paid overage.

**SSML note:** `lexicon.json`'s phoneme overrides and the `<lang xml:lang="en-IN">` wrapping technique are provider-specific in syntax, not principle — Render Engine's TTS router owns a thin per-provider SSML adapter so one `lexicon.json` entry works regardless of which ranked provider ends up handling a given video.

**Duration is always measured, never hardcoded** — a video's actual synthesized-audio length sets its Remotion `durationInFrames`.

### 4.2 Captions

Runs Whisper locally on the generated audio for word-level timestamps, then **overrides the caption text with the script's own `onScreen` field, not Whisper's transcript** — Whisper transcribes the Hinglish audio as spoken; captions must show the English wording. This substitution is what makes the whole "Hinglish voice, English screen" design actually hold in the output file, not an incidental step.

### 4.3 Compositions & Rendering

Selects a Remotion composition by the script's `pillar` field (`DailyDrill`, `ConceptCard`, `TrapBuster`, `ExamCraft`, `ProductMoment`), passes the script's beats, generated audio, and caption timing as props, renders to `.mp4` (H.264/AAC-LC in an MP4 container — YouTube's own recommended format, Remotion's default export, nothing to override).

### 4.4 Thumbnail

Shorts: YouTube auto-generates one from the video. Long-form: a dedicated 1280×720 Remotion still-frame composition using the same brand tokens, so it stays visually consistent without a separate design tool.

### 4.5 Metadata Generation

Templated, not freely generated, so every upload is consistent without per-video review of boilerplate. Fields mirror the YouTube Data API's own `snippet` object directly (per `SCRIPT_FORMAT_SPEC.md` §1.5), carried straight through from the script file — Render Engine doesn't invent metadata, it consumes what the script already specifies and fills in template placeholders (`{play_store_link}`, `{website_link}` from `data/links.json`).

The non-affiliation disclaimer is hardcoded into the description template, not optional per-video.

### 4.6 Compliance Guardrail Check (blocking)

Before Render Engine hands a finished file to Upload Engine, an automated check scans the script and generated description against:

* The banned-vocabulary list (strategy doc §2.4)
* Presence of the non-affiliation disclaimer
* A resolvable `correct_answer` for the referenced `questionId` (catches a broken reference before it becomes a wrong-answer video)
* P5 (Product Moment) frequency — refuses to let a 21st P5 render for every 20 total, enforcing the strategy doc's hard 5% cap automatically

**Failing this halts Render Engine for that video. Nothing gets to Upload Engine — the check exists specifically so nothing depends on you catching it later.**

---

## 5. Upload Engine

**Deliberately the narrowest of the three engines.** Takes a finished `.mp4` and its metadata, and does exactly two things:

1. `youtube.videos.insert` with `status.privacyStatus = "private"` — **always, unconditionally.** There is no configuration flag anywhere in Upload Engine that sets a video public.
2. Assigns the video to its target playlist (from the script's `metadata.playlist` field, one of the six fixed channel playlists).

Records the resulting `videoId` and private watch URL to the state ledger with status `Uploaded (Private)`, then stops. It does not watch the video, does not read back its status, does not post comments, does not do anything else.

**Quota note:** each upload costs 1,600 units against YouTube's default daily quota of 10,000 units — roughly 6 uploads/day before hitting the ceiling. Comfortable for this project's cadence; would need a quota-increase request only if bulk-backfilling many videos in one sitting.

---

## 6. The Structural Publish Boundary

**This is the one property the whole system exists to protect, and it's now stronger than v1.0's design.** In v1.0, publishing was *gated* — a "Publish Now" button existed inside the system, restricted to approved videos only. In v2.0, **the capability doesn't exist in the codebase at all.**

Upload Engine's OAuth consent flow requests only the scopes needed for `videos.insert` and playlist management. It never requests the scope required to call `videos.update` with a privacy-status change. This means:

* No bug, no misconfiguration, no future code change made in a hurry can make a video public — the running process is not authorized by Google to do it, independent of anything the code itself checks.
* **Publishing happens entirely in YouTube Studio, done by you, outside this system.** The dashboard's status field lets you record that it happened (see §7) for your own tracking — it does not cause it to happen.

Keep this deliberately: don't let Upload Engine's OAuth scope grow to include publish capability later "for convenience." That's what makes this a structural guarantee rather than a policy one.

---

## 7. Dashboard

Single local HTML page (`dashboard/index.html`), served locally only — no public hosting, no internet exposure. Reads state from all three engines' output (script files, the render/upload state ledger) and presents one row per video.

### 7.1 Status vocabulary

Editable via a config file, not hardcoded — but the default set:

```
Scripted → Approved / Rejected → Audio Ready → Rendered → Uploaded (Private) → Published → Completed
                                                                                              ↕
                                                                                        Hold · Retired
```

* `Scripted` through `Uploaded (Private)` are set automatically by the respective engine completing its step.
* **`Published` and `Completed` are set manually, by you**, after you've actually published in YouTube Studio — the dashboard never polls YouTube to infer this, by design (no read-scope beyond what upload needs). `Completed` means published *and* every post-publish task (pinned comment, playlist double-checked) is done — a distinct, later state than `Published` alone. *(Flagging this interpretation explicitly — correct me if you meant `Completed` to replace `Published` rather than follow it.)*
* `Hold` and `Retired` are parking states, not pipeline stages — a script approved but deliberately not processed yet, or a video no longer wanted in the active view. Settable at any point regardless of what stage a row is otherwise in.

### 7.2 Controls

| Control | Action |
|---|---|
| **Approve / Reject** | Batch-capable — select several `Scripted` rows and approve or reject them together. Approving does not trigger production; it only makes a row eligible for processing. |
| **▶ Process Now** (global) | Processes every currently-`Approved` row: generates audio via the TTS router → renders → uploads private. This is the sole point where local CPU and API quota get spent — nothing happens on a timer, nothing happens without this click. |
| **Process just this one** (per-row) | Same, scoped to a single approved row — for when you've approved several scripts but only want to spend resources on one right now. |
| **Import Script** | Accepts a file, validates it against `SCRIPT_FORMAT_SPEC.md`, and — only if valid — adds it to the queue at `Scripted` status alongside internally-authored scripts. |
| **Status editor** (per-row) | Manually set any status, including flipping to `Published` or `Completed` after you've published in YouTube Studio, or parking a row at `Hold`/`Retired`. |
| **👁 Preview** | Opens the private YouTube link for an uploaded row. |

The dashboard holds no YouTube credentials itself — control actions go through the same local process that holds the OAuth token, never through anything exposed to the network.

---

## 8. Scheduling — Manual Only, Local Only

No background scheduler, no cron, no Windows Task Scheduler entry, no GitHub Actions. You decide when anything runs, via **▶ Process Now**. Consequences worth stating plainly:

* Nothing renders, uploads, or costs any API quota unless explicitly started.
* All credentials stay on this machine, used only while the local process you started is running.
* Trade-off: there's no safety net catching a missed session. If you forget to process a batch a few days ahead of when you want it live, that video simply isn't ready in time — the strategy doc's "batch ahead" buffer is a habit you keep, not something the system enforces.

---

## 9. Error Handling

Each engine gets a deterministic error tag so failures are traceable without re-diagnosing from scratch, following the app SSD's own convention (§7.7 there):

| Code | Meaning |
|---|---|
| `SE-SCHEMA-001` | An imported script failed validation against `SCRIPT_FORMAT_SPEC.md` — specific field named in the error |
| `SE-DATA-002` | A script's `questionId` not found in the question bank JSON |
| `RE-TTS-003` | TTS API call failed or returned empty audio |
| `RE-TTS-004` | All ranked providers would breach their safety cap — generation halted, nothing sent to a provider that would risk an overage |
| `RE-CAP-005` | Whisper timing failed or produced zero segments |
| `RE-RENDER-006` | Remotion render threw or produced a 0-byte file |
| `RE-GUARD-007` | Compliance guardrail check failed — banned phrase, missing disclaimer, or P5 quota exceeded |
| `UE-UPLOAD-008` | YouTube API upload failed (auth, quota, network) |

A failed step halts that video's progress through its engine and logs the code plus raw error — never silently retried into a partially-broken state.

---

## 10. What This System Deliberately Does Not Do

* Does not write question text, explanations, or hooks with an LLM at render time — scripts are authored ahead of time, by me or via Import.
* Does not decide what topic to cover on which day — that's a human scheduling decision reflected in which scripts get authored/approved.
* Does not choose thumbnails for Shorts (YouTube handles that itself for the Shorts surface).
* Does not respond to comments or moderate the community.
* **Cannot publish a video, structurally — not gated, not permitted at all (§6).**
* Does not accept pre-generated audio via Import — Render Engine is the sole source of audio, regardless of a script's origin (§3).
* Does not poll YouTube for live status — `Published`/`Completed` are always set by you, manually.

---

## 11. Build Roadmap (once this design is approved)

```
Phase 0 — Credentials & Scaffolding
  ├── 0.1 Google Cloud project + Cloud TTS + YouTube Data API v3 enabled
  ├── 0.2 OAuth consent flow scoped to upload + playlist ONLY — verify no publish-capable scope requested
  ├── 0.3 Azure Speech + Sarvam API keys as fallback providers (§4.1)
  └── 0.4 Repo scaffold: data/schedule/, data/links.json, data/lexicon.json, data/tts_providers.json, data/state_ledger.json

Phase 1 — Script Engine
  ├── 1.1 JSON Schema validator against SCRIPT_FORMAT_SPEC.md
  ├── 1.2 Author scripts against the §1 content scope (374-question pool)
  └── 1.3 Import Script path — same validator, `source.origin: external-import`

Phase 2 — Render Engine
  ├── 2.1 TTS router: provider ranking, usage ledger, safety-cap enforcement
  ├── 2.2 Whisper timing + English-caption override
  ├── 2.3 Remotion compositions wired to strategy doc's five pillar templates
  ├── 2.4 Metadata template resolution from script + data/links.json
  └── 2.5 Compliance guardrail check (banned list, disclaimer, P5 cap)

Phase 3 — Upload Engine
  ├── 3.1 videos.insert, privacyStatus hardcoded to private
  └── 3.2 Playlist assignment from script metadata

Phase 4 — Dashboard
  ├── 4.1 Local HTML page reading the shared state ledger across all three engines
  ├── 4.2 Approve/Reject (batch) · Process Now (global + per-row) · Import Script · manual status editor
  └── 4.3 Status vocabulary as an editable config, not hardcoded

Phase 5 — Dry Run
  ├── 5.1 One real script through all three engines end to end
  ├── 5.2 You review the private upload and approve
  ├── 5.3 You manually publish in YouTube Studio and mark status on the dashboard
  └── 5.4 Confirm §6's structural boundary — check the OAuth consent screen itself lists no publish-capable scope, don't just trust the code
```

**Nothing above has been built.** This document is the design for review; no credentials created, no API called, nothing rendered.

---

*EasyCTET — Serious CTET Paper 1 prep, simplified.*
