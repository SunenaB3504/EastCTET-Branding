# EasyCTET Shorts — Video Design Research & Specification

**Version:** 1.0
**Purpose:** Research-backed answer to: how should the video look, sound, and be structured to (a) stop the scroll, (b) reach the right audience, (c) drive Play Store installs — without violating the brand bible's anti-hype position.
**Method:** Web research on Shorts mechanics, safe zones, faceless-educational formats, algorithm behaviour, and app-install CTAs, then applied against the actual v2 render.
**Status:** Research + recommendations. Nothing changed in code from this document yet.

---

## 1. The Six Findings That Actually Matter

| # | Finding | Source of truth | Consequence for us |
|---|---|---|---|
| 1 | **50–60% of viewers drop within 3 seconds; ~67% decide in that window.** Target intro retention >70%. | Shorts retention research | Our hook is currently invisible — see §3 |
| 2 | **60–85% of Shorts views happen on mute.** | Multiple 2026 sources | Validates the Hinglish-voice/English-text split; makes burned-in captions mandatory, not optional |
| 3 | **Using sound lifts conversions 20%+** on Shorts ads | Google Ads guidance | Getting TTS live is a conversion lever, not just a polish item |
| 4 | **The algorithm seeds each Short to 10–100 niche-matched viewers**, then expands on retention/engagement | YouTube algorithm research | Niche signals in frame 1 matter — see §5 |
| 5 | **It takes dozens-to-200 Shorts for the algorithm to "learn" a channel.** | Algorithm research | Consistency beats per-video perfection; don't over-polish video #1 |
| 6 | **Text-screen format works best broken into 5–7 discrete screens, one idea each** | Faceless-format research | Our beat structure is already close to correct |

---

## 2. Safe Zones — And a Real Bug in the Current Build

Current 2026 guidance for a 1080×1920 Short:

| Region | Reserved by YouTube's UI | Our current setting |
|---|---|---|
| Bottom | **380 px** — channel name, date, Subscribe button | ✅ 380 px |
| Right edge | **~140 px** — Like / Comment / Share / Remix stack | ❌ **not accounted for** |
| Top | ~100–170 px — progress bar, controls | ✅ 220 px (conservative, fine) |
| Effective safe area | ≈ 880 × 1310, starting around (40, 170) | partially correct |

**The bug:** the persistent logo watermark I placed at `bottom: 48, right: 48` sits **inside both danger zones at once** — it will be covered by the Like/Comment/Share button stack and the channel-name row. On a real phone it is either hidden or colliding with YouTube's own UI. Same applies to anything else drifting into the right 140 px.

**Fix:** add `right: 140` to the `SAFE` token, and move the watermark to roughly `bottom: 420, left: 80` (bottom-left, above the danger band) — the left side is uncontested because YouTube stacks its buttons on the right.

---

## 3. Diagnosis: What the Current v2 Render Scores

| Criterion | Research benchmark | v2 actual | Verdict |
|---|---|---|---|
| Hook visible in first 3s | Text + verbal, promise/curiosity gap | Small chip reading "• CDP · Jean Piaget" | ❌ The strongest line ("Nine-month-old baby… CTET's favourite question") exists only in the `vo` field and is invisible |
| Works on mute | Captions carrying full meaning | No captions at all yet | ❌ |
| Sound | Present, drives 20%+ conversion lift | Silent | ❌ (blocked on TTS token) |
| Niche identifiable | Clear signal for algorithm + humans | Word "CTET" never appears until the very end | ❌ |
| Duration | 30–60 s | 32 s | ✅ |
| Screen count | 5–7 discrete idea screens | 7 beats | ✅ |
| Safe zone compliance | Bottom 380 / right 140 | Watermark violates both | ❌ |
| Visual interest during holds | Continuous motion | 6–8 s static holds after type-on completes | ❌ |

Structure is right. Presentation is what's failing.

---

## 4. The Hook Specification (Highest-Priority Change)

**Rule: the first 3 seconds must contain, simultaneously — a curiosity gap, the word CTET, and motion.**

Current beat 0 shows a category label. Category labels don't stop scrolls; unanswered questions do.

**Recommended hook beat (0–75 frames / 2.5 s):**

```
Line 1 (small, amber):     CTET Paper 1 · CDP
Line 2 (huge, ivory):      "9-month-old Ishaan finds
                            the hidden rattle."
Line 3 (medium, amber):    What does that prove?
```

- Line 1 does the audience-signalling job (§5).
- Line 2 is a concrete image, not an abstract term — a baby and a hidden toy is legible to anyone in half a second.
- Line 3 opens the curiosity gap, which is what research says actually holds the viewer.

**Schema implication:** the script format needs the hook beat's `onScreen` to carry this properly. Right now our test script has `onScreen: "CDP · Jean Piaget"` while the good line sits in `vo`. Every P1 script should be rewritten so the hook beat's on-screen text is the *question-shaped* line, not the category tag — the category tag moves to the persistent chip, which already exists.

---

## 5. "Avoid Confusing Non-CTET Aspirants" — Answered

This is a real strategic question, and the research answers it cleanly.

**Because the algorithm seeds each Short to only 10–100 niche-matched viewers first, the video's job in second 1 is to be unmistakably identifiable.** Two different outcomes, both good:

- A CTET aspirant sees "CTET Paper 1" and stops — they're being told this is for them.
- A non-aspirant sees it and swipes within a second — that's a *cheap, clean* negative signal. It doesn't hurt you the way a confused 4-second watch does, and it helps YouTube learn who your audience isn't.

**The failure mode is ambiguity, not rejection.** A viewer who can't tell what they're looking at watches 3–4 confused seconds and leaves — the worst possible signal, because it looks like weak content rather than wrong audience.

**Practical rules:**

1. **The literal string "CTET" must be on screen within the first second, every single video.** It is simultaneously the human filter, the algorithmic niche signal, and OCR-readable text YouTube can classify on.
2. **Never open on undefined jargon.** "CDP · Jean Piaget" means nothing to a new aspirant, let alone a stranger. Open on the *scenario* ("a 9-month-old finds a hidden rattle"), then name the concept after the reveal, when it's earned.
3. **Say who it's for, not just what it is** — "CTET Paper 1" beats "CDP" because it names an exam people are searching for, not an internal syllabus code.
4. **Accept the narrow funnel.** 374 pedagogy questions is a deliberately niche library. Niche is an advantage under a seed-audience algorithm — don't broaden the content to chase general viewers.

---

## 6. Visual System Specification

### 6.1 Background

Keep the Midnight Slate base and the drifting glow — it's on-brand and reads as calm/premium rather than the shouting-thumbnail aesthetic of the category. Additions worth making:

- **A subtle grid or dot texture at ~3% opacity.** Flat fills read as "unfinished slide"; a faint texture reads as "designed surface." Cheap to add, disproportionate effect.
- **A thin progress bar** across the top (below the accent rule) showing position through the video. Gives an implicit "this is nearly over, stay" signal, which measurably helps completion.
- **Beat-linked colour shift**: background hue can drift very slightly warmer during the countdown beat and cooler on reveal. Subliminal, but it makes the video feel authored rather than templated.

### 6.2 Branding placement — corrected

| Element | Where | When |
|---|---|---|
| Top accent rule (amber→sage) | y=0, full width | Always |
| Subject chip ("CTET Paper 1 · CDP") | top-left, inside safe area | Always — including the hook beat |
| Logo watermark | **bottom-left, y≈420 from bottom** (out of the danger zones) | Always, ~30% opacity |
| Full logo + wordmark | centre | End card only, animated |

The watermark being *always visible but never loud* is right — the fix is only its position.

### 6.3 Imagery — the biggest missing piece

Pure text on navy is the main reason it reads as a slide deck. But you have no designer and no budget, so the answer isn't custom illustration.

**Recommendation: a single line-art icon per beat, from an open-licence icon set** — [Lucide](https://lucide.dev) (ISC) or [Phosphor](https://phosphoricons.com) (MIT). Both are SVG, both are stroke-based with rounded caps, which is *exactly* the same visual language as the Open Dawn logo (monoline, round terminals, geometric). They will look native to the brand, not bolted on.

Practical usage:
- Hook beat: a baby / rattle icon at ~180 px, amber, above the headline
- Question beat: same icon, smaller, top-right of the text block
- Options beat: numbered circular badges instead of "1." "2." text
- Reveal: the existing checkmark (already good)
- Explanation: a lightbulb or brain icon
- Add an `icon` field to the script schema so the author picks it per beat

This is a schema addition, so worth deciding before more scripts are written.

### 6.4 Captions

Mandatory once audio exists, given 60–85% muted viewing. Spec:
- 2–3 words per group, centred, **above** the 380 px bottom danger zone
- Bold, ivory, with a subtle dark shadow for legibility over the glow
- Active word highlighted in amber
- **Caption text = the English `onScreen` script text, not the Whisper transcript of the Hinglish audio** — already specified in the SSD; this research reinforces why it matters

### 6.5 Motion — killing the dead air

The 6–8 s static holds are a retention leak. Fixes, cheapest first:

1. **Slow continuous scale** on the text block (1.0 → 1.03 over the beat) — imperceptible consciously, but stops the frame feeling frozen
2. **Progressive highlight**: as the VO reaches a key term, that word shifts to amber
3. **Icon micro-motion**: a 2–3° rotation or gentle float
4. **True cross-dissolves** between beats (currently fade-in only — a known simplification I flagged in the code)

---

## 7. CTA / App Install Specification

Research is explicit: **use verbal and visual CTA together**, and sound lifts conversion 20%+.

- **End card (2 s)** is too short and too late to be the only ask. Add a **persistent micro-CTA** from ~60% through the video: a small pill, bottom-left, "EasyCTET · Play Store" at low opacity.
- **The end card should promise something specific**, not generic. "374 pedagogy questions, free to start" outperforms "Download now."
- **Pinned comment** carries the actual link — Shorts descriptions are barely read. Already in the plan.
- **The `SHORTS25` code** gives a reason to act now without fear-framing — it's a discount, not a deadline threat. On-brand.
- Verbal CTA in the VO must match the on-screen CTA word-for-word.

---

## 8. The Brand Tension — Resolved

Research says: create urgency, curiosity gaps, and pace aggressively. Your brand bible forbids hype, fear-framing, and "crack it in 3 days" energy.

**These are not actually in conflict, and conflating them is the trap most of this category falls into.**

- **Curiosity is not hype.** "What does that prove?" is a genuine open question with a real answer 20 seconds later. "99% FAIL THIS!" is a fabricated threat. The first is legitimate craft; only the second violates the brand.
- **Pace is not panic.** Fast cuts and continuous motion are about respecting attention, not manufacturing anxiety. A calm voice over a well-paced edit is entirely coherent.
- **Specificity outperforms exaggeration anyway.** "9-month-old Ishaan finds the hidden rattle" is a stronger hook than "CTET's HARDEST question!" — it's concrete, it's true, and it makes the viewer picture something.

The banned-vocabulary list in the strategy doc stays exactly as it is. Nothing in this research requires breaking it.

---

## 9. Revised P1 Beat Structure

| Beat | Frames | On screen | Change from current |
|---|---|---|---|
| Hook | 0–75 | `CTET Paper 1 · CDP` + **"9-month-old Ishaan finds the hidden rattle."** + *"What does that prove?"* + baby icon | **Major** — real hook text, was invisible |
| Question | 75–300 | Full question, verbatim from bank, icon top-right | Add icon, add slow scale |
| Options | 300–450 | 4 cards, numbered circular badges, staggered | Badges instead of "1." text |
| Countdown | 450–600 | Ring + numeral (already good) | Keep; add soft tick SFX when audio exists |
| Reveal | 600–660 | Checkmark card (already good) | Keep |
| Explanation | 660–900 | Why + **why the near-miss is wrong**, key term highlighted in amber | Add progressive highlight |
| End card | 900–960 | Logo + "374 pedagogy questions. Free to start." + `SHORTS25` | Specific promise, not generic |

Persistent throughout: accent rule, subject chip, progress bar, watermark (bottom-**left**), micro-CTA from 60%.

---

## 10. Priority Order

1. **Fix the hook beat** — the single highest-leverage change. The good line exists; it's just in the wrong field. Cheap to fix, biggest retention impact.
2. **Fix the safe-zone violation** — the watermark is currently hidden behind YouTube's UI on real devices.
3. **Put "CTET" on screen in second 1** — audience signalling + algorithm signalling, near-zero cost.
4. **Add icons** (`icon` field in schema + Lucide/Phosphor) — kills the slide-deck feel.
5. **Get TTS live** — unlocks captions, unlocks the 20% sound-conversion lift, makes the countdown silence read as intentional.
6. **Kill the static holds** — slow scale, progressive highlight, cross-dissolves.
7. **Persistent micro-CTA + specific end-card promise.**

Items 1–4 are all doable before the token arrives.

---

## Sources

- [YouTube Shorts Hook Formulas That Drive 3-Second Holds — OpusClip](https://www.opus.pro/blog/youtube-shorts-hook-formulas)
- [The First 3 Seconds: Hook Structures That Stop Scroll on Shorts — Virvid](https://virvid.ai/blog/first-3-seconds-hook-faceless-shorts-2026)
- [YouTube Shorts Best Practices 2026 — Miraflow](https://miraflow.ai/blog/youtube-shorts-best-practices-2026-complete-guide)
- [YouTube Shorts Safe Zone 2026 — Kreatli](https://kreatli.com/guides/youtube-shorts-safe-zone)
- [YouTube Shorts Dimensions: The Safe Zone Pixel Map — YouTube Toolkit](https://youtubetoolkit.com/blog/youtube-shorts-dimensions)
- [YouTube Shorts ads: Asset specs and best practices — Google Ads Help](https://support.google.com/google-ads/answer/16041697?hl=en)
- [Best CTA Formats for Short Videos — DriveEditor](https://driveeditor.com/blog/best-cta-formats-for-short-videos)
- [Text-On-Screen Shorts 2026 — Fluxnote](https://fluxnote.io/guides/youtube-shorts-text-on-screen-format-2026)
- [How the YouTube Algorithm Decides Who Sees Your Shorts in 2026 — Miraflow](https://miraflow.ai/blog/how-youtube-algorithm-decides-who-sees-your-shorts-2026)
- [YouTube Shorts Algorithm 2026 — SocialChamp](https://www.socialchamp.com/blog/youtube-shorts-algorithm/)

---

*EasyCTET — Serious CTET Paper 1 prep, simplified.*
