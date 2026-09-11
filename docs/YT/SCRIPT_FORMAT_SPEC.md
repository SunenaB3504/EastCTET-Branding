# EasyCTET Video Script Format — Specification v1.0

**Status:** Draft for review. Not yet implemented as a validator; no code exists against this spec.
**Purpose:** The single contract between anything that *authors* a script (Script Engine, or an external app you build later) and Render Engine, which is solely responsible for turning an approved script into a finished, uploaded video — audio included.

---

## 1. Design principles

1. **A script file is content. It is never operational state.** Status (`Approved`, `Rendered`, `Published`, etc.), video IDs, timestamps, and render logs live in a separate state ledger keyed by `scriptId` — never written back into the script file itself. This keeps script files immutable once authored, and lets two completely different tools (Script Engine, your other app) both produce valid input without needing to know anything about pipeline state.
2. **Audio is never part of this format.** Per your confirmation: the generation engine (Render Engine, via its TTS router) is solely responsible for producing audio from the `vo` text in each beat. A script file that included an audio path would create an ambiguity about who's responsible for the finished video — this format removes that ambiguity by construction. No `audioPath` field exists anywhere in this schema.
3. **VO text is plain narration, not SSML.** A script says *what* to speak, in plain Hinglish text. It is Render Engine's job — not the script author's — to translate that into a specific TTS provider's SSML dialect using the shared `lexicon.json`. This keeps a script file provider-agnostic: it doesn't matter to the file whether Render Engine ends up using Chirp 3 HD, Azure, or Sarvam for a given beat.
4. **On-screen text is always English**, per the strategy doc's core rule (voice is Hinglish, screen is English) — enforced here by making `onScreen` and `vo` two separate required fields per beat, never one field doing both jobs.
5. **Metadata mirrors the YouTube Data API's own `snippet` object**, not an invented shape — `title`, `description`, `tags`, `categoryId`, `defaultLanguage` map straight onto what Upload Engine sends to `videos.insert`, with no translation step in between.

---

## 2. The JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://easyctet.in/schemas/video-script/v1.json",
  "title": "EasyCTET Video Script",
  "type": "object",
  "required": ["schemaVersion", "scriptId", "source", "pillar", "content", "beats", "metadata"],
  "properties": {

    "schemaVersion": {
      "type": "string",
      "const": "1.0",
      "description": "Bump this when the shape of the format changes. Render Engine refuses files with an unrecognised version rather than guessing."
    },

    "scriptId": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Unique, stable, filename-safe id. Convention: <date>-<pillar>-<slug>, e.g. '2026-09-16-p1-cdp-object-permanence'."
    },

    "source": {
      "type": "object",
      "required": ["origin"],
      "properties": {
        "origin": {
          "type": "string",
          "enum": ["script-engine", "external-import"],
          "description": "script-engine = authored inside this system. external-import = arrived via the dashboard's Import Script action from another tool."
        },
        "authoredBy": {
          "type": "string",
          "description": "Free text — 'Claude' for script-engine origin, or the name of the external app for external-import."
        },
        "importedAt": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601. Required when origin is external-import; omitted for script-engine origin (the state ledger already timestamps creation)."
        }
      }
    },

    "pillar": {
      "type": "string",
      "enum": ["P1", "P2", "P3", "P4", "P5"],
      "description": "Daily Drill / Concept in 40 / Trap Buster / Exam Craft / Product Moment — per the strategy doc's content pillars."
    },

    "content": {
      "type": "object",
      "required": ["subject", "topicTag"],
      "properties": {
        "subject": {
          "type": "string",
          "enum": ["CDP", "Mathematics", "EVS", "Language Pedagogy"],
          "description": "The four post-narrowing content areas. 'Language Pedagogy' covers the combined English+Hindi track."
        },
        "topicTag": {
          "type": "string",
          "description": "Matches a topicTag value from the question bank where applicable, e.g. 'Jean Piaget', 'Mathematics Pedagogy & Van Hiele'."
        },
        "questionId": {
          "type": ["string", "array", "null"],
          "description": "One id, an array of ids (e.g. a Trap Buster pairing two questions), or null for a concept video with no single source question (e.g. P2/P4). References docs/Question-bank/*.json — the bank stays the single source of truth; question text is never duplicated into the script beyond what's needed for the beat's onScreen text."
        },
        "sourceRef": {
          "type": ["string", "null"],
          "description": "Optional path to a study-material source (e.g. a masterclass script) the video was grounded in, for traceability."
        }
      }
    },

    "beats": {
      "type": "array",
      "minItems": 1,
      "description": "Ordered timeline. This is the one part of the format with no existing external standard — defined here for this project's beat-and-reveal structure.",
      "items": {
        "type": "object",
        "required": ["frameStart", "frameEnd", "onScreen", "vo"],
        "properties": {
          "frameStart": { "type": "integer", "minimum": 0 },
          "frameEnd": { "type": "integer", "minimum": 0, "description": "Exclusive. At 30fps." },
          "onScreen": {
            "type": "string",
            "description": "English only. Verbatim from the question bank where the beat renders a question/option/explanation."
          },
          "vo": {
            "type": "string",
            "description": "Plain Hinglish narration text for this beat. Empty string means deliberate silence (e.g. the countdown beat) — never omit the field, an empty string is the explicit way to say 'no speech here'."
          },
          "visualHint": {
            "type": "string",
            "description": "Optional freeform note to Render Engine — e.g. 'countdown ring, Amber Dawn' or 'split screen, left/right'. Not machine-parsed; a note for whoever builds the Remotion composition."
          }
        }
      }
    },

    "metadata": {
      "type": "object",
      "required": ["title", "description", "tags", "categoryId", "defaultLanguage", "playlist"],
      "description": "Mirrors the YouTube Data API v3 videos.insert 'snippet' resource directly — no translation layer between this block and the upload call.",
      "properties": {
        "title": { "type": "string", "maxLength": 100 },
        "description": { "type": "string", "maxLength": 5000 },
        "tags": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Combined length must stay under YouTube's 500-character cap across all tags — Render Engine truncates by priority if a generated list exceeds it, per the automation SSD's A6 step."
        },
        "categoryId": { "type": "string", "const": "27", "description": "Education. Fixed, not selected per video." },
        "defaultLanguage": {
          "type": "string",
          "pattern": "^[a-z]{2}(-[A-Z]{2})?$",
          "description": "BCP 47. 'hi' for Hindi-subject videos, 'en' otherwise, per the strategy doc's language matrix."
        },
        "playlist": {
          "type": "string",
          "enum": ["CDP Concepts", "Daily Drill", "Trap Busters", "Exam Craft", "Language Pedagogy", "Audio Masterclasses"],
          "description": "One of the fixed channel playlists Upload Engine assigns the finished video to."
        }
      }
    }
  }
}
```

---

## 3. Worked example

The existing `2026-09-16-cdp-p1-001.md` script, re-expressed in this format — proving the schema against real content rather than an abstract example:

```json
{
  "schemaVersion": "1.0",
  "scriptId": "2026-09-16-p1-cdp-object-permanence",
  "source": { "origin": "script-engine", "authoredBy": "Claude" },
  "pillar": "P1",
  "content": {
    "subject": "CDP",
    "topicTag": "Jean Piaget",
    "questionId": "CDP-P1-001",
    "sourceRef": null
  },
  "beats": [
    { "frameStart": 0, "frameEnd": 60, "onScreen": "CDP · Jean Piaget", "vo": "Nau mahine ka bachcha. Aur CTET ka favourite question.", "visualHint": "subject chip, Midnight Slate bg" },
    { "frameStart": 60, "frameEnd": 300, "onScreen": "Nine-month-old Ishaan watches his mother hide a rattle under a cushion. He immediately pushes the cushion aside to retrieve it. This behaviour indicates that Ishaan has developed:", "vo": "Ishaan dekhta hai ki maa ne rattle cushion ke neeche chhupaya. Woh turant cushion hata kar use nikaal leta hai. Ye kya darshata hai?" },
    { "frameStart": 300, "frameEnd": 450, "onScreen": "1. Conservation  2. Object permanence  3. Reversibility  4. Egocentrism", "vo": "Option ek — conservation. Do — object permanence. Teen — reversibility. Chaar — egocentrism." },
    { "frameStart": 450, "frameEnd": 600, "onScreen": "", "vo": "", "visualHint": "5-second countdown ring, Amber Dawn — deliberate silence" },
    { "frameStart": 600, "frameEnd": 660, "onScreen": "Option 2 — Object permanence", "vo": "Sahi jawab hai — option do. Object permanence.", "visualHint": "correct option fills Sage Green, others fade to 30%" },
    { "frameStart": 660, "frameEnd": 900, "onScreen": "Object permanence emerges in the sensorimotor stage. Conservation & reversibility are concrete operational — years later.", "vo": "Object permanence ka matlab hai — cheez dikhna band ho jaaye, phir bhi woh exist karti hai. Sensorimotor stage ke aakhri hisse mein aata hai." },
    { "frameStart": 900, "frameEnd": 960, "onScreen": "EasyCTET · Play Store · SHORTS25", "vo": "Aise 750 se zyada questions, poore explanation ke saath — EasyCTET par." }
  ],
  "metadata": {
    "title": "CDP: Object Permanence | CTET Paper 1 Daily Drill",
    "description": "Nine-month-old Ishaan and a hidden rattle — CTET's favourite Piaget question.\n\n📱 Practice this and 374+ original pedagogy questions — free to start.\n👉 EasyCTET on Play Store: {play_store_link}\n🎁 Use code SHORTS25 for 25% off Pro Pass.\n\nTopic: Jean Piaget — Sensorimotor Stage & Object Permanence\n\n#CTET #CTETPaper1 #CTET2026 #CDP #बालविकास\n\n⚠️ EasyCTET is an independent exam-preparation app. Not affiliated with CBSE, NCTE, or any government body.",
    "tags": ["CTET", "CTET Paper 1", "CTET 2026", "child development pedagogy", "Piaget CTET", "बाल विकास शिक्षाशास्त्र", "object permanence"],
    "categoryId": "27",
    "defaultLanguage": "en",
    "playlist": "Daily Drill"
  }
}
```

---

## 4. Validation and the Import Script contract

* Any file entering the queue — from Script Engine or from Import — is validated against this schema **before** it's accepted, not after. A file that fails validation is rejected with the specific field that failed, never silently coerced into something valid.
* `source.origin` is the only thing distinguishing an internally-authored script from an imported one; every other field is treated identically downstream. Render Engine, the state ledger, and the dashboard don't branch behavior on origin — only the Import action itself does.
* Because `beats[].onScreen` for question-based pillars (P1, P3) is expected to be **verbatim** bank text, an external app authoring those should pull the actual `question_text`/`options`/`explanation` fields from `docs/Question-bank/*.json` directly rather than retyping them — same non-fabrication discipline this system already holds itself to.

## 5. Explicit non-goals

* No `audioPath`, no `voiceProvider` field anywhere — confirmed out of scope, Render Engine owns 100% of audio generation regardless of script origin.
* No status/lifecycle field embedded in the script — lives in the separate state ledger, keyed by `scriptId`.
* No SSML in the `vo` field — plain text only; SSML construction is Render Engine's responsibility via the TTS router and `lexicon.json`.
