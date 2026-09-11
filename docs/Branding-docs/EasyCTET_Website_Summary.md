# EasyCTET Website — Full Content Summary (Current State)

Everything planned and built for the site so far, in one place, with what's confirmed vs. still open.

---

## 1. Site Purpose & Core Promise

A conversion-focused landing site whose only job is to drive Play Store downloads — not a general brochure. Every section either builds trust or pushes toward the download CTA.

**Core brand elements (confirmed from your app screenshot):**
- Name: **EasyCTET**
- Tagline: **सा विद्या या विमुक्तये** ("That alone is knowledge which liberates")
- Palette: dark navy background, amber/orange accents, blue interactive highlights, white open-book icon
- Premium tier name: **Pro Pass**
- Three genuine differentiators: **100% Offline Practice**, **Standard CTET Timing (1 min/question)**, **Zero Telemetry**

**Scope:** CTET Paper 1, Primary level (Classes 1–5), English medium, all 5 subjects — CDP, Language I (English), Language II (**Hindi**, confirmed from your uploaded study material), Mathematics, EVS.

**Exam date used for urgency messaging:** October 9, 2026 (CBSE's rescheduled CTET 22nd edition) — built as a single editable variable, not hardcoded, since CBSE has already moved this date once.

---

## 2. Page Structure (from the Website Plan)

Single long-scrolling landing page + supporting pages:
1. **Hero** — headline, tagline, live countdown to Oct 9, Play Store CTA
2. **Why EasyCTET** — the three trust pillars (offline / exam-timing / zero telemetry)
3. **What's Inside** — 5-subject breakdown, Pro Pass (All 5) callout
4. **Study However You Learn** — Quizzes, Study Guides, Audio Masterclasses
5. **Freemium & Referral** — Free vs. Pro Pass, referral hook
6. **What You'll Learn (Subject-Wise Content)** — topic briefs + sample questions per subject, built as either one section or 5 separate SEO-friendly pages
7. **Sample Mock Test** — the interactive 25-question timed test (see below)
8. **FAQ**
9. **Final CTA**
10. Footer + required **Privacy Policy** / **Terms of Service** pages (Play Store submission blockers — still need drafting)

---

## 3. Assets Already Built

| File | What it is |
|---|---|
| `EasyCTET_Branding_Launch_Plan.md` | Full launch checklist: domain, social handles, business/legal basics, Play Console setup |
| `EasyCTET_Website_Plan.md` | Site structure, persuasion flow, SEO approach, technical stack recommendation |
| `EasyCTET_Website_Copy.md` | Section-by-section hero/trust/feature/FAQ copy using real app branding |
| `EasyCTET_Subject_Wise_Content.md` | Topic briefs + illustrative sample Q&As for all 5 subjects (written before your real question bank was available — see note below) |
| `EasyCTET-Sample-Mock-Test.html` | **Live, working** 25-question timed mock test (5 per subject), built from your actual uploaded question bank — timer, marks, answer validation, subject-wise score breakdown, full review with explanations |
| `Podcast-01-Piaget-Source.md` | ~15-min audio masterclass source script for NotebookLM — "The Operating System of a Child's Mind," with branded intro/outro |
| `Podcast-02-MathsPedagogy-Source.md` | ~15-min audio masterclass source script for NotebookLM — "Numbers Aren't Just Numbers," with branded intro/outro |

**Note on the subject-wise content file:** it was written with illustrative sample questions before you uploaded the real 750-question bank. Since the sample mock test now uses real questions, worth deciding whether to swap the "What You'll Learn" section's sample Q&As for real ones too, for consistency — happy to do that swap.

---

## 4. How the Podcasts Fit the Site

Each podcast script includes:
- A **branded intro** naming EasyCTET and the tagline
- Full narrative content adapted from your real study guides (Piaget stages; Mathematics Pedagogy cluster — errors as diagnostic tools, pre-number concepts, ethnomathematics, concrete teaching aids, gender bias)
- A **branded outro** directing listeners to the app and easyctet.in
- A production note (clearly marked to exclude from the NotebookLM upload) referencing the Master AI Question-Generation Prompt, so each episode can get a matching practice-quiz set generated afterward, tagged to the right topic

On the site, these can live as embedded audio players in the "Study However You Learn" section, or as their own "Audio Masterclasses" page once more episodes exist.

---

## 5. Still Open / Needs Your Input

- **Privacy Policy & Terms of Service** — not yet drafted; required before Play Store submission
- **Real screenshots** from the app (quiz screen, study guide page, audio player) — highest-impact missing asset for the Features section
- **Actual question-bank counts** to replace placeholder numbers ("100+ CDP questions" etc.) once finalized
- **Referral reward specifics** (how many days of Pro Pass, exact mechanic)
- **Founder credibility note or early testimonials** for the Social Proof section
- **Decision on subject-wise sample questions**: keep the illustrative ones, or swap in real bank questions for consistency with the mock test
- **Whether to build this into an actual HTML page now**, or keep iterating on content first

Want me to tackle any of these next — Privacy Policy/ToS drafting, swapping in real questions for the subject-wise section, or building the full site as an HTML page you can preview?
