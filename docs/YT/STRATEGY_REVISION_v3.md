# EasyCTET YouTube Automation — Strategy Revision v3

**Document Version:** 3.0 — first revision after real videos were rendered and watched (CDP drill, Maths step-by-step). Captures five decisions made in discussion on 2026-09-09, before any of them were built.
**Status:** Plan for review. Nothing in this document has been executed yet — no code changed, no data files written, beyond this document itself.
**Amends:** [MASTER_IMPLEMENTATION_PLAN.md](./MASTER_IMPLEMENTATION_PLAN.md) v2.0 (Phase 4 deferred, Content Scope table extended), [SHORTS_CONTENT_SPECIFICATION.md](./SHORTS_CONTENT_SPECIFICATION.md) (pricing/CTA copy, new video-type rules to follow).

---

## Executive Summary

Five changes, decided in discussion, not yet built:

1. **Question selection** moves from "374-question pedagogy pool, picked broadly" to a curated **top-10-highest-frequency-questions-per-subject** tier, visually marked with a 5-star badge and a "Most Asked Topic" caption.
2. **Pricing copy** changes to **₹299, no discount** — removes the SHORTS25 promo thread running through every script's end card and description.
3. **Dashboard build is deferred.** Upload Engine still ships; the human-review step that the dashboard would have surfaced happens manually instead (YouTube Studio's Private list, or direct delivery of each finished video).
4. **Upload Engine is authorized to build for real** — Claude creates + uploads (private only, per the existing Structural Publish Boundary), the user validates and publishes manually in Studio. Needs one new credential (YouTube Data API OAuth) before any code.
5. **New video format: 2 listicles per chapter** — "Top 5 Most Repeated Topics," each with a probability percentage, sourced from real topic-frequency data and captioned with its methodology.

Item 5 is the one with a genuine data dependency that was investigated as part of this revision — see §5 below for what was actually checked, not assumed.

---

## 1. Question Selection — "5-Star" Top-10-Per-Subject

**What changes:** Instead of drawing from the full 374-question pedagogy pool broadly, each subject's **top 10 highest-frequency questions** become a distinct, visually marked tier — a 5-star badge plus a "Most Asked Topic" caption in the canvas.

**Data source:** `topicTag` counts within `docs/Question-bank/*.json`. Confirmed in discussion (2026-09-09) that question volume per topic was deliberately weighted during content creation to reflect real CBSE past-paper topic emphasis — not arbitrary practice-volume padding. This makes the existing counts legitimate frequency data, usable today without new research.

**Decided (2026-09-10):**
- **Selection unit**: one representative question per top-10 topic (not the 10 individually-highest questions) — confirmed. `script-engine/rank-topics.js` computes the ranking (shared with the listicle format's math) and `pickRepresentative()` deterministically picks the first bank question matching that topic.
- **Star value**: flat 5★ on every qualifying question, by deliberate choice — an attention-grabbing signal, not a graded rating. `content.isTopTopic` (schema v1.2) drives a persistent on-screen badge; it does not vary with `topicRank`/`topicFrequencyPct`.
- **On-screen mention**: the fact that a question is a top-10 topic is stated in two places, not just implied by the star badge — the persistent badge itself ("★★★★★ Most Asked Topic") and a line in the hook's own on-screen/spoken text (e.g. "One of CDP's Top 10 most-asked topics"). First built example: `2026-09-19-p1-cdp-constructivism.json` (CDP-P1-065, Constructivism & Pedagogy, rank #2, 13%).

**Still open:**
- **Relationship to the 374/750 pool** — this creates a much smaller pool (10 × 5 subjects = 50 questions, repeating every ~7 weeks at 1/day). Not yet decided whether this *replaces* the broader pool going forward or sits alongside it as a featured/rotating tier.
- **Placement** — resolved in practice: the badge sits directly below the persistent `SubjectChip`, still inside the reserved top margin.

---

## 2. Pricing Copy — ₹299, No Discount

**What changes:** Every script's end-card and description currently reads "374+ pedagogy questions... SHORTS25 for 25% off Pro Pass." This becomes ₹299 flat, no coupon code.

**Build note:** This is the second pricing/copy change in two revisions (the 750-vs-374 question-count claim was the first, discussed but not yet executed either). Both point at the same underlying gap: these strings are currently hand-typed per script file. This revision is the trigger to finally centralize them — a `data/copy.json` (price, CTA line, question-count claim, app name) that every script/template reads from, so the next pricing change is a one-line edit instead of a find-and-replace across every script.

---

## 3. Dashboard — Deferred

**What changes:** Phase 4 of the Master Implementation Plan (the local HTML dashboard) is postponed indefinitely. Phase 3 (Upload Engine) still proceeds on schedule.

**Why this doesn't weaken the publish boundary:** The dashboard was always a convenience/aggregation layer sitting on top of the three engines — never a safety mechanism itself. The actual safety property (SSD §6 — Upload Engine's OAuth scope structurally cannot publish) doesn't depend on the dashboard existing. Deferring it just removes the one-page-summary convenience.

**Interim substitute for the dashboard's review function:**
- YouTube Studio's own Private/Unlisted content list, checked directly by the user, or
- Each finished video delivered directly (as has been happening) as it's produced, rather than batched into a dashboard view.

---

## 4. Upload Engine — Authorized to Build for Real

**What changes:** Confirmed division of labor — Claude builds the video and uploads it (private, per SSD §5), the user reviews and publishes manually in YouTube Studio. This matches the Structural Publish Boundary exactly as originally designed (SSD §6); nothing about the architecture changes, this just authorizes building the real thing instead of the design-only state it's been in.

**Blocking prerequisite:** A new OAuth credential — YouTube Data API v3, via Google Cloud Console, with a consent screen requesting **only** the `youtube.upload` scope (never anything publish-capable, e.g. never `videos.update` on privacy status). This is a third distinct credential system, after the Gemini key (working) and the still-unobtained Cloud TTS key. Not started — needs the credential before any Upload Engine code is written.

---

## 5. Listicle Video Format — "Top 5 Most Repeated Topics" per Chapter

**What changes:** A new video type — not a variant of the existing single-question drill. Two per chapter, each presenting the chapter's 5 most-repeated topics ranked, with a probability percentage per topic.

**What was actually checked before accepting this (2026-09-09):**
- `docs/Study-matearials/Study-guides.zip` — conceptual explainer content ("common exam traps," theory breakdowns). Useful for depth, not a source of frequency data.
- `docs/Question-bank/*.json` `source_exam` field, across all 5 files — CDP/EVS/Mathematics are tagged `"EasyCTET Original Prep / Concept Series"`; English/Hindi are tagged `"EasyCTET Paper 1 - Practice Set N (Month Year Pattern)"`. Neither is a verbatim transcription of an official CBSE paper — both are original content modeled on real exam patterns, written this way specifically to avoid copyright infringement (confirmed by the user).
- `topicTag` distribution per subject file — genuine, countable data, and per §1 above, confirmed to be deliberately weighted to reflect real paper emphasis rather than arbitrary coverage.

**Conclusion:** There is no digitized set of actual official CTET papers in this project, and the percentage claim cannot honestly cite "analysis of the last 5 exam papers" as a literal dataset lookup. It **can** honestly cite the `topicTag` frequency distribution, with a methodology line making clear what was actually analyzed — e.g. "Based on topic emphasis across EasyCTET's practice question bank, developed from analysis of official CTET Paper 1 exam patterns." This needs to be worded carefully to stay accurate to what's true (topic *emphasis*, grounded in real pattern analysis during content creation) without implying a literal recent-5-papers dataset that doesn't exist as structured data.

**Still open before build:**
- **Exact percentage formula** — most likely candidate is (topic's question count ÷ subject's total question count) × 100, but this hasn't been explicitly confirmed as the intended formula. This is the number that goes on screen — it should be pinned down precisely, not inferred, before any video ships.
- **Schema impact** — the current schema (`video-script.v1.schema.json`) is built entirely around one question with one correct answer. A ranked-topic list has no correct-answer concept at all; this likely needs a `videoType` discriminator (schema v1.2) separating "drill" (existing) from "topic-ranking" (new), with its own required fields (topic name, rank, percentage, subject) in place of `questionId`/`correct_answer`.
- **New beat template** — a ranked-list reveal (5→1, staggered), structurally different from the drill's hook→question→options→countdown→reveal→explanation flow. No `RevealCard`/`OptionsList`/`CountdownRing` equivalent exists for this shape yet.
- **"Chapter" scope** — "2 videos per chapter" needs the chapter list defined (5 subjects × 2 = 10 videos, or a finer per-topic-cluster breakdown = more) before volume/scheduling can be planned.
- **Required on-screen/description methodology line** — should be treated as a mandatory element of this video type, the same way the non-affiliation disclaimer is mandatory today, not optional flavor text.

---

## Build Order

The user authorized any order. Recommended sequencing, by dependency and risk:

1. **Price/copy centralization** (`data/copy.json`) — smallest change, unblocks nothing else directly, but removes an accumulating rot risk (this is the second pricing/copy change in two revisions) and is fast to do first.
2. **Listicle video format** — highest new capability; the frequency-ranking logic it needs is shared with item 3 below, so building it first avoids duplicating that work.
3. **5-star question selection** — reuses the ranking utility built for item 2.
4. **Upload Engine** — blocked on the user obtaining the YouTube Data API OAuth credential; can proceed in parallel once that exists.
5. **Dashboard** — deferred per §3, not scheduled.

---

## Open Decisions Needed Before Full Build

| Item | Needs |
|---|---|
| Selection unit for "top 10 per subject" | Individual top-10 questions, or one question per top-10 topic? |
| Star rating scale | Flat 5★ for all selected questions, or scaled to relative frequency? |
| Relationship of the 50-question "5-star" tier to the existing 374/750 pool | Replaces it, or sits alongside as a featured rotation? |
| Listicle percentage formula | Confirm exact calculation before any number appears on screen |
| Listicle schema shape | New `videoType` discriminator vs. a separate schema file |
| "Chapter" definition for the 2-per-chapter listicle plan | Subject-level (10 total) or finer-grained (more) |

None of these block starting item 1 (price/copy) or beginning schema/template design for item 2 — they block finishing those items, not starting them.

---

*This document supersedes no prior decision by itself — it records what was decided in discussion and what remains open, so build work has a fixed reference rather than conversation memory alone.*
