# EasyCTET — YouTube Shorts Content Specification

**Version:** 1.0
**Status:** Normative. This is the production standard every Short must conform to, regardless of who or what authored it.
**Applies to:** Script Engine (internal authoring), any external app producing scripts via Import, and Render Engine's compositions.

**Relationship to other documents:**

| Document | Role | Authority |
|---|---|---|
| [SCRIPT_FORMAT_SPEC.md](./SCRIPT_FORMAT_SPEC.md) | The machine-readable data contract (JSON Schema) | Authoritative for *shape* |
| **This document** | The editorial, visual, and audio standard | **Authoritative for *content*** |
| [SHORTS_VIDEO_DESIGN_RESEARCH.md](./SHORTS_VIDEO_DESIGN_RESEARCH.md) | Evidence and rationale behind these rules | Explanatory, not normative |
| [EasyCTET_YouTube_Shorts_Strategy.md](./EasyCTET_YouTube_Shorts_Strategy.md) | Pillars, calendar, long-term approach | Authoritative for *strategy*; its §1.3 shot templates are superseded by §4 here |
| [EasyCTET_YouTube_Automation_SSD.md](./EasyCTET_YouTube_Automation_SSD.md) | System architecture | Authoritative for *pipeline* |

Rules marked **[BLOCKING]** are enforced automatically by Render Engine's guardrail check and will halt production. Rules marked **[REVIEW]** are checked by a human at the dashboard's approval gate.

---

## 1. Universal Technical Standard

| Property | Value |
|---|---|
| Resolution | 1080 × 1920 (9:16) |
| Frame rate | 30 fps |
| Container / codec | MP4 / H.264 / AAC-LC (YouTube's own recommendation; Remotion's default — do not override) |
| Duration | 15–50 s depending on pillar (§3). Never exceed 60 s. |
| Audio loudness | −14 LUFS integrated, −1 dBTP true peak |
| Colour space | sRGB |

### 1.1 Safe Zones **[BLOCKING]**

YouTube's player UI occupies fixed regions. No text, icon, logo, or meaning-carrying element may enter them.

| Region | Reserved | Occupied by |
|---|---|---|
| Bottom | **380 px** | Channel name, date, Subscribe button |
| Right edge | **140 px** | Like / Comment / Share / Remix stack |
| Top | **220 px** | Progress bar, player controls |
| Left edge | 80 px | Design margin (not YouTube UI, but keeps text off the bezel) |

Effective content area: **x 80→940, y 220→1540.**

The left edge is uncontested by YouTube's UI — put persistent elements (watermark, micro-CTA) there, never bottom-right.

---

## 2. Universal Content Rules

These apply to every Short without exception.

### 2.1 The Second-One Rule **[BLOCKING]**

**The literal string "CTET" must appear on screen within the first 30 frames (1 second) of every video.**

Rationale: it is simultaneously the human audience filter, the algorithmic niche signal, and OCR-readable classification text. Format: `CTET Paper 1 · {Subject}`.

### 2.2 Language Split **[BLOCKING]**

| Layer | Language |
|---|---|
| Voiceover | Hinglish — Hindi grammar, English technical terms in Latin script |
| On-screen text | **English only** |
| Captions | **English only** — the script's `onScreen` text, never a transcript of the Hinglish audio |

**Exception — Language Pedagogy pillar content dealing with Hindi grammar itself:** VO in Hindi, on-screen text in Devanagari. Tag such videos in the title (`हिंदी व्याकरण`) and route them to the Language Pedagogy playlist.

A viewer must receive 100% of the content with sound off. If muting the video loses meaning, the video fails this spec.

### 2.3 Captions **[BLOCKING once audio exists]**

- Burned in, always. 60–85% of Shorts views are muted.
- 2–3 words per group, centred horizontally, positioned above the 380 px bottom danger zone.
- Bold, Warm Ivory `#F8FAFC`, with a subtle dark shadow for legibility over the background glow.
- Active word highlighted in Amber Dawn `#F59E0B`.
- Caption text is taken from the script's `onScreen` field — **never** from the Whisper transcript, which will render the spoken Hinglish.

### 2.4 Non-Affiliation Disclaimer **[BLOCKING]**

Every video description must contain, verbatim:

> ⚠️ EasyCTET is an independent exam-preparation app. Not affiliated with CBSE, NCTE, or any government body.

Exam Craft (P4) videos must additionally carry this as on-screen microcopy.

### 2.5 Banned Vocabulary **[BLOCKING]**

Never appears in VO, on-screen text, title, or description:

> "guys" · "bro" · "dosto" · "guaranteed" (in any outcome claim) · "sirf 3 din mein" · "crack the exam in N days" · "trick" · "shortcut" · "jugaad" · "official CTET" · "99% fail this" or any fear-framing variant · any shouted/all-caps opener

### 2.6 Address & Register **[REVIEW]**

- Address the viewer as **आप**. Never तू, never तुम.
- Register: a composed senior teacher explaining to a colleague. Not a coach, not a hype man.
- Never Sanskritised/news-reader Hindi; never filmi/over-casual Hindi.

### 2.7 Content Sourcing **[BLOCKING]**

- On-screen question text, options, and explanations for P1/P3 must be **verbatim** from `docs/Question-bank/*.json`. No paraphrase, no invention.
- `content.questionId` must resolve to a real bank entry with a populated `correct_answer`.
- Content scope is the narrowed 374-question pool only: **CDP** (all 150), **Mathematics** (pedagogy-tagged only, 26), **EVS** (pedagogy-tagged only, 55), **Language Pedagogy** (English + Hindi pedagogy combined, 143). Anything outside this is rejected.

### 2.8 Prohibited Claims **[BLOCKING]**

Never state or imply: guaranteed qualification, a guaranteed score, a first-attempt result, official/government affiliation, or coverage of Paper 2 or subjects outside the current scope.

---

## 3. Pillar Specifications

| Pillar | Name | Duration | Frames | Share of output |
|---|---|---|---|---|
| **P1** | Daily Drill | 28–35 s | 840–1050 | 45% |
| **P2** | Concept in 40 | 40–50 s | 1200–1500 | 25% |
| **P3** | Trap Buster | 25–35 s | 750–1050 | 15% |
| **P4** | Exam Craft | 20–30 s | 600–900 | 10% |
| **P5** | Product Moment | 15–20 s | 450–600 | **5% — hard cap [BLOCKING]** |

P5 frequency is enforced automatically: a 21st P5 in any rolling window of 20 videos is refused.

---

## 4. Beat Structure — P1 Daily Drill (Reference Implementation)

960 frames / 32 s. Other pillars follow the same principles with different beat counts.

| # | Beat | Frames | On screen | VO |
|---|---|---|---|---|
| 0 | **Hook** | 0–75 | `CTET Paper 1 · CDP` (chip) + concrete scenario headline + curiosity question + topic icon | Hook line |
| 1 | Question | 75–300 | Full question verbatim from bank, icon top-right | Question read |
| 2 | Options | 300–450 | 4 cards, numbered circular badges, staggered entry 8 frames apart | Options read |
| 3 | Countdown | 450–600 | Animated ring + numeral 5→1 | **Silence** (soft tick SFX only) |
| 4 | Reveal | 600–660 | Checkmark card, Sage Green, spring entrance | "Sahi jawab hai — option N." |
| 5 | Explanation | 660–900 | The why **+ why the near-miss is wrong**, key term highlighted amber | Compressed reasoning, one sentence |
| 6 | End card | 900–960 | Logo + specific promise + `SHORTS25` | CTA, matching on-screen wording |

**Persistent across all beats:** top accent rule, subject chip, progress bar, watermark (bottom-left), micro-CTA from 60% onward.

**Beat 5 rule [REVIEW]:** the explanation must explain why the attractive *wrong* answer is wrong, not merely restate why the right one is right. This is the difference between a quiz channel and a teaching channel.

---

## 5. Hook Specification

The single highest-leverage element. 50–60% of viewers leave within 3 seconds.

### 5.1 Required structure

```
Line 1 — small, amber:      CTET Paper 1 · {Subject}
Line 2 — large, ivory:      A concrete, visual scenario in ≤10 words
Line 3 — medium, amber:     An open question
```

### 5.2 Rules

1. **[BLOCKING]** The hook beat's `onScreen` field must contain the scenario line — not merely a category label. The strongest line must be visible, not confined to `vo`.
2. **[REVIEW]** Lead with a concrete image (a child, an object, a classroom moment), never an abstract term.
3. **[REVIEW]** Name the concept *after* the reveal, when it has been earned — never in the hook.
4. **[REVIEW]** Open a genuine information gap that the video actually closes.

### 5.3 Approved patterns

> ✅ "9-month-old Ishaan finds the hidden rattle. What does that prove?"
> ✅ "Ye question aksar confuse karta hai."
> ✅ "CTET isko is tarah poochta hai."
> ✅ "Ek chhota sa fark hai — dhyaan dijiye."

### 5.4 Banned patterns

> ❌ Bare category labels ("CDP · Jean Piaget") — meaningless to a new viewer
> ❌ Fabricated stakes ("99% fail this!")
> ❌ Undefined jargon before it's earned
> ❌ Any hook whose promise the video does not keep

---

## 6. Visual System

### 6.1 Palette

| Token | Hex | Use |
|---|---|---|
| Midnight Slate | `#0F172A` | Video background |
| Heritage Navy | `#1E293B` | Panels, split-screen halves |
| Amber Dawn | `#F59E0B` | Accents, chip, countdown ring, active caption word |
| Sage Green | `#059669` | Correct answer only |
| Terracotta Red | `#DC2626` | Incorrect/trap indication only |
| Warm Ivory | `#F8FAFC` | Primary text |

**[BLOCKING]** Sage Green is reserved exclusively for correctness. Never decorative.

### 6.2 Type scale

| Role | Size (px) | Weight |
|---|---|---|
| Hook headline | 60 | 800 |
| Question | 52 | 600 |
| Option | 42 | 600 |
| Explanation | 38 | 600 |
| Chip / label | 28 | 700 |
| Caption | 44 | 800 |

Font: Inter (or system sans fallback). Line height 1.3–1.35. Maximum 3 lines of question text on screen at once.

### 6.3 Background

- Midnight Slate base with slow-drifting amber and sage radial glows (continuous motion, never static)
- Optional dot/grid texture at ≤3% opacity
- Top accent rule: 6 px, amber→sage gradient, full width
- Thin progress bar showing position through the video

### 6.4 Iconography

- **Source: open-licence stroke icon sets only** — [Lucide](https://lucide.dev) (ISC) or [Phosphor](https://phosphoricons.com) (MIT). Both are monoline with rounded terminals, matching the Open Dawn logo's construction.
- One icon per beat, amber, 120–180 px on the hook beat and smaller thereafter.
- **[BLOCKING]** No raster stock imagery, no photos of real people, no third-party copyrighted material.

### 6.5 Branding placement

| Element | Position | Visibility |
|---|---|---|
| Top accent rule | y = 0, full width | Always |
| Subject chip | top-left, inside safe area | Always, including hook |
| Logo watermark | **bottom-left, ≥420 px from bottom** | Always, ~30% opacity |
| Micro-CTA pill | bottom-left, below watermark | From 60% of duration |
| Full logo + wordmark | centre | End card only |

**[BLOCKING]** The watermark must never sit in the bottom 380 px or right 140 px.

### 6.6 Motion

- **[REVIEW]** No beat may hold fully static for more than 2 seconds. Use slow scale (1.0→1.03), progressive word highlighting, or icon micro-motion.
- Entrances: `spring()` with damping 200 for standard, damping 10–12 for the reveal's deliberate overshoot.
- Options stagger 8 frames apart.
- Beat transitions: cross-dissolve, 10 frames.
- **[REVIEW]** Motion must never induce anxiety — no flashing, no shake, no rapid strobing. Calm Focus is a brand principle.

---

## 7. Audio Specification

| Property | Value |
|---|---|
| Voice | 100% AI. Google Cloud TTS **Chirp 3 HD (`hi-IN`)** primary; ranked failover per SSD §4.1 |
| Human recording | **Not used anywhere in the pipeline** |
| Pace | 140–155 wpm |
| Music | Ambient bed at −28 dB maximum, or none. **[BLOCKING]** Never trending audio on YouTube (Reels only) |
| SFX | Soft tick on countdown; subtle confirm on reveal. Nothing casino-like, nothing alarming |

### 7.1 VO-Minimum Rule **[REVIEW]**

The spoken line carries only: hook, question, options, reveal, one compressed reasoning sentence, CTA. The fuller explanation lives in on-screen text only.

Reading is free; every spoken character consumes TTS quota. Target ≤600 characters of VO per 30-second Short.

### 7.2 SSML

VO text is stored as **plain text** in the script. Render Engine builds provider-specific SSML using `lexicon.json`: English technical terms wrapped in `<lang xml:lang="en-IN">`, phoneme overrides for proper names, `<break time="400ms"/>` before every reveal.

---

## 8. Metadata Specification

### 8.1 Title **[BLOCKING format]**

```
{Subject}: {TopicTag} | CTET Paper 1 {Pillar Name}
```
Example: `CDP: Object Permanence | CTET Paper 1 Daily Drill`
Maximum 100 characters.

### 8.2 Description template

```
{one-line hook restating the scenario}

📱 Practice this and 374+ original pedagogy questions — free to start.
👉 EasyCTET on Play Store: {play_store_link}
🎁 Use code SHORTS25 for 25% off Pro Pass.

📴 100% offline. Exam-accurate timing. Zero telemetry.

Topic: {topicTag} — {subtopic}

#CTET #CTETPaper1 #CTET2026 #{subjectHashtag}

⚠️ EasyCTET is an independent exam-preparation app. Not affiliated with CBSE, NCTE, or any government body.

🌐 {website_link}
```

Links resolve from `data/links.json` — never hardcoded per video.

### 8.3 Tags

Always included: `CTET`, `CTET Paper 1`, `CTET 2026`, `CTET preparation`
Subject-mapped, plus per-video `{topicTag}` and `{subtopic}`.
Combined length must stay under YouTube's 500-character cap; the generator truncates by priority and logs a warning.

### 8.4 Fixed fields

| Field | Value |
|---|---|
| `categoryId` | `27` (Education) |
| `defaultLanguage` | `hi` for Hindi-content videos, `en` otherwise |
| Made for kids | `false` — set explicitly |
| Privacy on upload | **`private`, always** — publishing is manual, in YouTube Studio |

### 8.5 Playlists

`CDP Concepts` · `Daily Drill` · `Trap Busters` · `Exam Craft` · `Language Pedagogy` · `Audio Masterclasses`

---

## 9. Call to Action

- **[REVIEW]** Verbal and on-screen CTA must match word-for-word.
- The end card must promise something **specific** — "374 pedagogy questions. Free to start." — never a generic "Download now."
- Persistent micro-CTA pill from 60% of duration.
- `SHORTS25` gives a reason to act without a fabricated deadline.
- Pinned comment carries the actual Play Store link (Shorts descriptions are barely read).

**Exception — exam-day and eve-of-exam videos carry no CTA at all.** No link, no code, no promotion. This is deliberate.

---

## 10. Pre-Publish QA Checklist

Automated **[BLOCKING]** — Render Engine refuses to produce output if any fail:

- [ ] "CTET" on screen within first 30 frames
- [ ] Non-affiliation disclaimer present in description
- [ ] No banned vocabulary in VO, on-screen text, title, or description
- [ ] `questionId` resolves to a real bank entry with `correct_answer`
- [ ] Subject within the 374-question scope
- [ ] P5 frequency cap not exceeded
- [ ] No element inside bottom 380 px or right 140 px
- [ ] Hook beat's `onScreen` contains a scenario line, not just a category label

Human **[REVIEW]** at the dashboard approval gate:

- [ ] Watched full-screen, with sound
- [ ] Audio matches on-screen text and the actual correct answer
- [ ] Pronunciation of proper names and technical terms is correct
- [ ] Captions read the English script, not a Hinglish transcript
- [ ] Explanation addresses why the near-miss option is wrong
- [ ] No beat holds static longer than 2 seconds
- [ ] Register is calm and respectful; addresses viewer as आप
- [ ] Title, description, playlist, and links all correct
- [ ] Video still makes complete sense with sound muted

---

## 11. Pending Schema Changes

This specification requires two additions to `SCRIPT_FORMAT_SPEC.md`, currently at v1.0. Both need a schema bump to **v1.1** before they can be authored against:

1. **`beats[].icon`** — string, the Lucide/Phosphor icon name for that beat (§6.4).
2. **Hook beat convention** — no schema change needed structurally, but §5.2's blocking rule (hook `onScreen` must carry the scenario line) must be added to the validator's business rules.

Until the schema is bumped, scripts conform to v1.0 and icons are unavailable.

---

*EasyCTET — Serious CTET Paper 1 prep, simplified.*
*सा विद्या या विमुक्तये*
