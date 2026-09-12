# Paper 2 Content Roadmap — Gap Analysis

**Purpose:** a target list for authoring Paper 2 question-bank content, derived from `pyq_trends_matrix_paper2.json` and cross-checked against what currently exists in `docs/Question-bank/`. As of this writing, **`docs/Question-bank/` contains only Paper 1 content** (CDP, EVS, English, Hindi, Mathematics — 750 questions total, 5 files). There is no Paper 2 question file yet in any subject or stream. Everything in Part 2 below is a genuine gap, not a scripting backlog.

---

## Part 1 — Paper 1 content gaps still open

Most Paper 1 topics flagged as high-frequency in `pyq_trends_matrix.json` already have question-bank content and a produced video. Three exceptions, found while reconciling the PYQ data against the bank:

| Topic | Frequency | Status | Gap type |
|---|---|---|---|
| **NEP 2020** | 100%, Tier 1 | Content exists, but only as scattered subtopics under 4 different topicTags (`Constructivism & Pedagogy`, `Multilingualism & Second Language Pedagogy`, both Hindi pedagogy tags) — no dedicated topicTag or video | Video/tagging gap, not a content gap |
| **Howard Gardner & Intelligence** | 82%, Tier 2 | Real topicTag, 5 questions, zero videos made | Video gap only |
| **Chomsky's LAD / Universal Grammar** | 92%, Tier 1 | Zero matching questions anywhere in the bank | **Real content gap** — needs at least one new question authored |

Recommendation: author 1+ new question(s) for Chomsky (Language Acquisition Device, Universal Grammar, innatist vs. behaviorist framing) to close this before scripting it — the other two just need scripting against what already exists.

---

## Part 2 — Paper 2: full gap list (nothing exists yet)

16 topics, drawn from `pyq_trends_matrix_paper2.json`, ranked by real-exam frequency (2018–2024). None have question-bank content today. Ordered as a suggested authoring priority — highest frequency first:

| # | Topic | Stream | Frequency | Priority | Avg Q/session |
|---|---|---|---|---|---|
| 1 | Modern History & 1857 Revolt | SST — History | 96% | Tier-1 | 3.6 |
| 2 | Formal Operational Stage & ZPD (Piaget/Vygotsky) | CDP-P2 | 95% | Tier-1 | 3.5 |
| 3 | Science Pedagogy & Validities (cognitive/process/environmental) | Science-P2 | 94% | Tier-1 | 2.8 |
| 4 | Inclusive Education for CWSN (RPWD Act 2016) | CDP-P2 | 92% | Tier-1 | 2.8 |
| 5 | Algebraic Expressions & Identities | Math-P2 | 92% | Tier-1 | 3.2 |
| 6 | Moral Development & Gilligan's Feminist Critique | CDP-P2 | 90% | Tier-1 | 2.2 |
| 7 | Van Hiele Levels & Error Analysis (upper-primary) | Math-P2 | 90% | Tier-1 | 2.5 |
| 8 | Acids, Bases & Indicators | Science-P2 | 89% | Tier-1 | 2.0 |
| 9 | Constitution & Democratic Governance | SST — Civics | 89% | Tier-1 | 2.5 |
| 10 | Geometry & Euler's Formula | Math-P2 | 88% | Tier-1 | 2.1 |
| 11 | Marginalization & Adivasis (incl. Sachar Committee) | SST — Civics | 87% | Tier-1 | 2.2 |
| 12 | Physics: Motion, Light & Sound | Science-P2 | 85% | Tier-1 | 2.5 |
| 13 | Historical Inquiry & Primary Sources (pedagogy) | SST — Pedagogy | 85% | Tier-1 | 2.0 |
| 14 | Longitude & Standard Time Calculations | SST — Geography | 82% | Tier-1 | 1.9 |
| 15 | Ancient Empires & Socio-cultural History | SST — History | 80% | Tier-2 | 1.8 |
| 16 | Cell Structure & Plant/Animal Reproduction | Science-P2 | 78% | Tier-2 | 1.7 |

**Suggested starting depth:** 5–10 questions per Tier-1 topic (14 topics × ~5–10 = 70–140 questions minimum for a first pass), 3–5 per Tier-2 topic, mirroring how Paper 1's ~150-questions-per-subject bank is distributed unevenly across topics by real emphasis rather than split evenly.

**One addition not in either PYQ JSON, worth including anyway:** `CTET Paper 2 Trend Analysis.md`'s narrative treats **Erikson's "Identity vs. Role Confusion"** (psychosocial development, adolescent identity formation) as a core CDP-P2 pillar, but it has no entry in the JSON topic list at all. Recommend authoring it as a 17th topic — likely Tier-1 given how prominently the narrative discusses it, though no frequency % is available since it's absent from the structured data.

---

## Schema to follow (matches Paper 1 exactly, for pipeline compatibility)

New Paper 2 questions should use the same structure as `docs/Question-bank/*.json` so they work immediately with the existing script-engine/render pipeline (`rank-topics.js`, `resolve.js`, `DailyDrill.jsx`) with zero code changes:

```json
{
  "schemaVersion": "2.0",
  "id": "CDP-P2-001",
  "subject": "Child Development & Pedagogy",
  "paper": "Paper 2",
  "source_exam": "EasyCTET Original Prep / Concept Series",
  "q_number": "Q1",
  "topicTag": "Formal Operational Stage & ZPD",
  "subtopic": "Hypothetico-Deductive Reasoning",
  "difficulty": "Easy | Moderate | Challenging",
  "question_text": "...",
  "options": {"1": "...", "2": "...", "3": "...", "4": "..."},
  "correct_answer": "1",
  "explanation": "...",
  "stimulus": null
}
```

Suggested file naming: `docs/Question-bank/CDP-P2-Questions.json`, `Mathematics-P2-Questions.json`, `Science-P2-Questions.json`, `SST-P2-Questions.json` (one file per stream/subject, matching the Paper 1 convention of one file per subject).

**A-R format reminder:** Paper 2's biggest documented trend is the rise of Assertion-Reason items (see `CTET Paper 2 Trend Analysis.md`'s psychometric-shift discussion). Worth deliberately including A-R-formatted questions from the start for Paper 2 topics, not just plain factual MCQs — the same `options`/`correct_answer` structure handles both, no schema change needed (confirmed against the existing Paper 1 A-R questions in `CDP-Questions-150.json`).

---

## Not covered by this roadmap

- Video scripting/production sequencing (separate discussion — depends on when this content lands).
- The English/Hindi Paper 1 gaps (Poetry, Reading Comprehension, Grammar & Vocabulary; Prose/Poetry Comprehension) — explicitly deprioritized per current direction, not included here.
