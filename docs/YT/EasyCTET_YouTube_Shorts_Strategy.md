# EasyCTET — YouTube Shorts & Video Strategy (Remotion Build)

**Prepared:** 9 September 2026
**Publishing starts:** 15 September 2026
**Exam anchor:** CTET Paper 1 — 9 October 2026
**Scope (original):** Paper 1 only — CDP, English (Language I), Hindi (Language II), EVS, Mathematics
**Constraint:** Solo founder, 6–8 hrs/day outside a full-time MNC job, no funding, no paid acquisition

> **⚠️ Revision notice (see [EasyCTET_YouTube_Automation_SSD.md](./EasyCTET_YouTube_Automation_SSD.md) v2.0 for current status):**
> Two sections below are superseded by later decisions and kept here only for their still-valid reasoning:
> - **Content scope** — narrowed from "5 subjects, 750 questions" to a 374-question pedagogy-focused pool (CDP full, Maths pedagogy-only, EVS pedagogy-only, combined English+Hindi Language Pedagogy). Current numbers live in the SSD §1. The pillar *formats* below (P1–P5) and the *reasoning* behind durations, register, and compliance are unaffected — only the source pool narrowed.
> - **§2 Voiceover** — the hybrid "synthetic + your own voice" model below is superseded. **Voice is now 100% AI, no human recording anywhere**, via a multi-provider TTS router (Google Chirp 3 HD primary). Current design lives in the SSD §4.1. The Hinglish/register/banned-vocabulary rules below (§2.3, §2.4) still apply — they now govern text sent to the router, not a human reading a script.
> - The publishing calendar in §1.4 still illustrates cadence and pillar mix well, but its specific subject/question assignments should be re-checked against the narrowed §1 scope before use — some slotted topics (noted live in `docs/YT/scripts/week1-schedule.json`) fell outside the new rules and were substituted.

---

## 0. Read This First — What This Channel Can and Cannot Do by 9 October

You are starting a channel 24 days before the exam. Be clear-eyed about what that means, because it changes what you should optimise for.

**What will not happen:** A new channel does not reach meaningful distribution in 24 days. YouTube needs a corpus of 20–40 videos and several weeks of watch-signal before it confidently places Shorts into feeds. Installs and Pro Pass conversions attributable to Shorts before 9 October will be small — realistically a few dozen link clicks and single-digit to low-double-digit installs. If you set "Shorts drive Season 1 revenue" as the goal, you will conclude the channel failed when it actually worked exactly as expected.

**What will happen, and is worth the effort:**

1. **You bank 25 evergreen assets.** CDP, EVS and Maths pedagogy content does not expire between cycles. Every Short published now still earns in February 2027 and beyond. This is the highest-return use of the window.
2. **You prove the Remotion pipeline.** Getting from `CDP-Questions-150.json` to a rendered, captioned, uploaded Short is a one-time engineering cost. Pay it now, while the stakes are low, so next season is a content decision rather than a build decision.
3. **You claim the surface.** `/@easyctet` with 25 real videos looks like an operating product. An empty channel linked from your Play Store listing and website actively costs you trust.
4. **You are positioned for the real window.** The highest-leverage acquisition period of the year is **10 October – 15 November** — right after the exam, when the next cohort starts preparing and every competing channel goes quiet. Arriving there with a working pipeline and a small library is the actual prize.

**So the Season 1 KPI is not installs.** It is: *25 Shorts published on schedule, pipeline reduced to under 30 minutes per Short, and a measured 3-second retention baseline.* Judge the channel on those. Treat any installs before 9 October as a bonus.

One more framing point. Your brand bible commits to "Pedagogical Integrity" and "no gimmicks, no crack-exam-in-3-days hype." The dominant style in Indian exam-prep Shorts is the opposite — shouting thumbnails, fear framing, "99% fail this question." You will get less initial reach by refusing that style. Refuse it anyway. The people who convert to a ₹999 purchase are not the people who respond to panic marketing, and a calm channel is a defensible position in a loud category.

---

## 1. Content & Duration

### 1.1 The five content pillars

Fix these five formats and do not invent a sixth for at least 50 videos. Format consistency is what makes a Remotion pipeline pay off — each pillar is one composition, reused with different props.

| # | Pillar | What it is | Duration | Share |
|---|---|---|---|---|
| **P1** | **Daily Drill** (*Ek Sawaal*) | One real question from your bank → 5-sec timer → answer → the *why* | **28–35 s** | **45%** |
| **P2** | **Concept in 40** | One pedagogical concept explained properly — Piaget stage, ZPD, Van Hiele level, an EVS principle | **40–50 s** | **25%** |
| **P3** | **Trap Buster** | Two concepts candidates reliably confuse, held side by side | **25–35 s** | **15%** |
| **P4** | **Exam Craft** | Timing, OMR, question order, exam-day logistics | **20–30 s** | **10%** |
| **P5** | **Product Moment** | Offline mode, exam-accurate timing, zero telemetry, mistake ledger | **15–20 s** | **5% — hard cap** |

**On the P5 cap:** one product video in twenty. Cross it and the channel reads as an ad account, which suppresses both reach and subscriber conversion. Your product argument is made implicitly by P1–P4 — the quality of your explanations *is* the pitch for a question bank.

### 1.2 Why these durations

Three separate forces set the length, and they agree:

- **Retention.** Shorts rank primarily on watch-through. A 30-second video watched fully beats a 55-second video abandoned at 25 seconds, even though the second earns more total watch time. New channels should stay under ~40 seconds until they have retention data of their own.
- **Loop mechanics.** Anything under ~35 seconds gets replayed by viewers who want to re-read the question. Replays count. The Daily Drill is deliberately built to be re-watchable — a viewer who wants to actually attempt the question will loop it once.
- **Your source material.** Explanations in your bank average 218 characters (min 144, max 375). At Hinglish narration pace (~2.6 words/sec) that is **13–15 seconds of speech** for the explanation alone. Add a hook, question read, and options and you land naturally at 30–33 seconds. The content is telling you the duration. Listen to it.

YouTube permits Shorts up to 3 minutes. Ignore that ceiling for the first 50 videos.

### 1.3 Shot-by-shot templates

All timings at **30 fps, 1080×1920**. Frame numbers are the actual Remotion `Sequence` boundaries.

#### P1 — Daily Drill (960 frames / 32 s)

| Frames | Time | On screen | Voiceover |
|---|---|---|---|
| 0–60 | 0–2 s | Subject chip (`CDP · Jean Piaget`), Midnight Slate bg, amber rule | Hook — names the trap, not the topic |
| 60–300 | 2–10 s | Question text, 3 lines max, type-on reveal | Question read aloud, unhurried |
| 300–450 | 10–15 s | Options 1–4 stagger in, 40 ms apart | Options read |
| 450–600 | 15–20 s | **5-second countdown ring**, Amber Dawn `#F59E0B` | Silence. Let them think. |
| 600–660 | 20–22 s | Correct option fills Sage Green `#059669`; distractors drop to 30% opacity | "Sahi jawab hai — option 2." |
| 660–900 | 22–30 s | Explanation, max 2 lines; the *distractor* being eliminated is highlighted | The **why**, and why the near-miss is wrong |
| 900–960 | 30–32 s | Logo, `EasyCTET`, `Play Store`, `SHORTS25` | "Poora bank app mein hai." |

The 5-second silence at frames 450–600 is the most important design element in the format. It creates the participation beat that makes a viewer stay, and it is exactly where competitors put a shouting countdown sound. Use a soft tick or nothing at all.

**Critical rule:** the explanation must explain *why the attractive wrong answer is wrong*, not merely restate why the right one is right. That is the difference between a quiz account and a teaching account, and it is the whole basis of your "understand, don't guess" pillar.

#### P2 — Concept in 40 (1350 frames / 45 s)

| Frames | Time | Content |
|---|---|---|
| 0–75 | 0–2.5 s | Hook: a classroom scenario, not a definition. *"Ek bachcha glass badalne par kehta hai paani badh gaya. Kyun?"* |
| 75–450 | 2.5–15 s | The concept named and defined once, cleanly |
| 450–1050 | 15–35 s | **Animated diagram** — the actual reason to use Remotion |
| 1050–1260 | 35–42 s | How CTET asks it — the exam framing of this concept |
| 1260–1350 | 42–45 s | End card |

P2 is where Remotion beats a template app decisively. A hand-animated ZPD diagram in SVG, drawn on with `spring()`, is something Canva cannot produce and a competitor cannot copy in an afternoon. Put your animation effort here: Piaget's four stages as an ascending stair; ZPD as three nested arcs; Van Hiele as five stacked levels.

#### P3 — Trap Buster (900 frames / 30 s)

Split-screen throughout — Heritage Navy left, Midnight Slate right, amber divider. Two confusable concepts held simultaneously, because the confusion is *spatial* and the layout should mirror that. Close with the one-line discriminator to memorise.

High-value pairs, taken from your own bank's tag distribution: Assimilation vs Accommodation · Piaget vs Vygotsky on language · Conservation vs Reversibility · Growth vs Development · Assessment *of* vs *for* learning · Egocentrism vs Centration.

#### P4 — Exam Craft (750 frames / 25 s)

One fact, one number, one visual. `150 questions · 150 minutes · 1 minute per question · no negative marking`. Clean typographic motion, no diagram.

#### P5 — Product Moment (540 frames / 18 s)

Real device capture composited into a phone frame in Remotion. You already have `quiz-screen.png`, `solution-explanation.png`, `mistake-ledger.png`, `scorecard-summary.png`, `voice-companion.png`. Show one feature doing one thing. **Airplane-mode-on-and-still-working is your strongest single demo** — a visible, instantly legible proof of a claim competitors cannot make.

### 1.4 Publishing calendar — 15 Sept to 9 Oct (25 videos)

One Short per day at **07:30 IST** (morning revision window). Move to twice daily — 07:30 and 19:30 — from 3 October.

| Date | Day | Pillar | Topic |
|---|---|---|---|
| Tue 15 Sep | 1 | P2 | Piaget's four stages — the anchor concept of CDP |
| Wed 16 Sep | 2 | P1 | CDP — Object permanence (`CDP-P1-001`) |
| Thu 17 Sep | 3 | P3 | Assimilation vs Accommodation |
| Fri 18 Sep | 4 | P1 | EVS — Family & relationships |
| Sat 19 Sep | 5 | P4 | 150 questions, 150 minutes — what 1 min/question feels like |
| Sun 20 Sep | 6 | P2 | Vygotsky's ZPD & scaffolding |
| Mon 21 Sep | 7 | P1 | Maths — Place value misconception |
| Tue 22 Sep | 8 | P1 | CDP — Conservation task |
| Wed 23 Sep | 9 | P5 | Airplane mode on. App still works. |
| Thu 24 Sep | 10 | P2 | Van Hiele levels of geometric thinking |
| Fri 25 Sep | 11 | P1 | Hindi — वर्ण एवं ध्वनि *(Devanagari track)* |
| Sat 26 Sep | 12 | P3 | Piaget vs Vygotsky on language & thought |
| Sun 27 Sep | 13 | P1 | English — Comprehension inference |
| Mon 28 Sep | 14 | P2 | Errors as diagnostic tools *(from your Maths masterclass)* |
| Tue 29 Sep | 15 | P1 | CDP — Inclusive education / disability |
| Wed 30 Sep | 16 | P4 | Attempt strategy: which section first |
| Thu 1 Oct | 17 | P1 | EVS — Environmental concepts |
| Fri 2 Oct | 18 | P3 | Assessment *of* vs *for* learning |
| Sat 3 Oct | 19 | P1 + P2 | Maths drill **+** Gardner's multiple intelligences |
| Sun 4 Oct | 20 | P1 + P2 | CDP drill **+** Kohlberg's moral development |
| Mon 5 Oct | 21 | P1 + P4 | Hindi drill **+** OMR discipline |
| Tue 6 Oct | 22 | P1 + P3 | English drill **+** Growth vs Development |
| Wed 7 Oct | 23 | P1 + P5 | EVS drill **+** Mistake ledger demo |
| Thu 8 Oct | 24 | P4 | **Exam-eve checklist** — documents, reporting time, calm |
| Fri 9 Oct | 25 | P4 | **"All the best."** 15 s, no CTA, no link. |

**The 9 October video carries no call to action.** On exam morning your audience does not need a sales pitch, and a channel that understands that earns disproportionate goodwill from people who will remember it next cycle. A deliberate, and very cheap, trust purchase.

**Post-exam — the window that actually matters:**

| Date | Content |
|---|---|
| Sat 10 Oct | "Exam kaisa gaya?" — pinned comment thread. Pure listening; harvests the objections and confusions that write your next 40 scripts. |
| Sun 11 Oct | Paper analysis — which CDP topics dominated, difficulty read |
| 12–20 Oct | Answer-key discussion; "next attempt starts now" onboarding |
| 21 Oct → | Settle to **3 Shorts + 1 long-form per week** — the sustainable Season 2 cadence |

### 1.5 Two fully written sample scripts

**P1 — Daily Drill, from `CDP-P1-001`**

> **[0–2 s]** *Nau mahine ka bachcha. Ek chhota sa test — aur CTET ka favourite question.*
> **[2–10 s]** *Ishaan dekhta hai ki maa ne rattle cushion ke neeche chhupaya. Woh turant cushion hata kar use nikaal leta hai. Ye kya darshata hai?*
> **[10–15 s]** *Option one — conservation. Two — object permanence. Three — reversibility. Four — egocentrism.*
> **[15–20 s]** *(silence, countdown ring)*
> **[20–22 s]** *Sahi jawab — option two. Object permanence.*
> **[22–30 s]** *Object permanence ka matlab — cheez dikhna band ho jaaye, phir bhi woh exist karti hai. Ye sensorimotor stage ke aakhri hisse mein aata hai. Ab dhyaan dijiye — conservation aur reversibility dono concrete operational stage ke hain, bahut baad mein. Aur egocentrism memory ka nahi, perspective ka concept hai. Sirf ek option nau mahine ke bachche par lagta hai.*
> **[30–32 s]** *Aise 750 questions, poore explanation ke saath — EasyCTET par.*

**P4 — Exam Craft, 9 Oct, no CTA**

> **[0–4 s]** *Aaj aapka paper hai.*
> **[4–10 s]** *Aapne mehnat ki hai. Aaj sirf shaant rehna hai — ek question ek minute, atke to aage badhiye, wapas aa jaaiye.*
> **[10–15 s]** *All the best. Aap ye kar sakte hain.*
>
> *(No link. No code. No end card beyond the logo.)*

---

## 2. Voiceover

### 2.1 Options

| Option | Hinglish / code-mix quality | Cost | Effort per Short | Verdict |
|---|---|---|---|---|
| **Your own voice** | Perfect — native code-switching | ₹0 | 10–15 min | **Use for P2 & all long-form** |
| **Sarvam AI (Bulbul)** | Best synthetic — purpose-built for Indian code-mixing | Pay-per-character, low | ~2 min | **Best synthetic option** |
| **Azure Neural** (`hi-IN-SwaraNeural`, `hi-IN-MadhurNeural`) | Good; handles Devanagari + Latin mixing acceptably | **Free tier ≈ 500k chars/month** — covers your whole season | ~2 min | **Best free option; start here** |
| **ElevenLabs Multilingual** | Very natural prosody; code-mix decent but not Indic-specialised | Paid monthly tier | ~2 min | Good if budget allows |
| **Google Cloud TTS** (`hi-IN` Neural2 / Chirp3-HD) | Clean, slightly flat | Generous free tier | ~2 min | Reliable fallback |

*Verify all current pricing and free-tier limits directly with each vendor — these terms move, and I would not plan a budget on the numbers above without checking.*

### 2.2 Recommendation: a deliberate hybrid

Do not choose one. Split by what each pillar needs:

- **P1, P3, P4 → synthetic.** Start with **Azure `hi-IN-SwaraNeural`**; the free tier should cover the entire season at zero cost. These are high-volume, low-emotion formats where a consistent synthetic voice is genuinely fine and where batching is the whole point. If code-mix pronunciation disappoints after a week of testing, move to **Sarvam Bulbul**, which is built for exactly this problem.
- **P2 Concept in 40 → your own voice.** This is where you are teaching, and teaching authority does not survive synthesis. It is 25% of output — roughly one recording session per week.
- **All long-form → your own voice, always.** Non-negotiable. Long-form is where trust converts to ₹999, and trust does not come from a TTS engine.

**Pick one synthetic voice and never change it.** Voice is brand recognition on an audio-first surface — a viewer should identify an EasyCTET Short from three seconds of audio, before the logo appears. `SwaraNeural` reads as a composed, competent teacher, which matches "Reverence for the Educator" far better than the energetic male sales register that dominates the category.

### 2.3 The Hinglish TTS problem, and the fix

Every Hindi TTS engine mangles code-mixed input the same way: fed Latin-script English inside a Hindi sentence, it either applies Hindi phonology to the English word ("dev-ay-lop-ment") or switches to an English accent mid-sentence and breaks the prosody.

The working method:

1. **Write Hindi connective tissue in Devanagari**, not romanised. `यह concept` reads correctly; `yah concept` does not.
2. **Keep English technical terms in Latin script.** `object permanence`, `conservation`, `scaffolding`, `assimilation`. Do not translate them — the exam paper uses the English term, so the candidate must learn the English term. Rendering it as `वस्तु स्थायित्व` actively harms them.
3. **Maintain a `lexicon.json` of SSML overrides** for terms your engine gets wrong. Fix each once, forever:

```json
{
  "Piaget":            { "ssml": "<phoneme alphabet=\"ipa\" ph=\"pjaʒe\">Piaget</phoneme>" },
  "Vygotsky":          { "ssml": "<phoneme alphabet=\"ipa\" ph=\"vɪˈɡɒtski\">Vygotsky</phoneme>" },
  "object permanence": { "ssml": "<lang xml:lang=\"en-IN\">object permanence</lang>" },
  "CTET":              { "ssml": "<say-as interpret-as=\"characters\">CTET</say-as>" }
}
```

4. **Wrap English phrases in `<lang xml:lang="en-IN">`.** Highest-impact single change — it stops the engine applying Hindi phonology to English terms, and is what makes synthetic Hinglish sound intentional rather than broken.
5. **Insert `<break time="400ms"/>` before the answer reveal.** Silence sells the reveal, and TTS will not produce it unprompted.

### 2.4 Voice identity spec

| Attribute | Specification |
|---|---|
| Pace | 140–155 wpm. Slower than the category norm — deliberately. |
| Register | A composed senior teacher explaining to a colleague. Not a coach, not a hype man. |
| Address | **आप**, always. Never तू, never तुम. Follows directly from "Reverence for the Educator." |
| Energy | Level and warm. Confidence, not volume. |
| Music | Ambient bed at −28 dB max, or none. Never trending audio on YouTube. |
| Loudness | Normalise to −14 LUFS integrated, true peak −1 dBTP |

**Banned vocabulary** — this list exists because each item contradicts your brand bible in writing:

> ❌ "guys", "bro", "dosto" (over-familiar) · "99% log fail karte hain" (fear framing) · "guaranteed selection" (a claim you must never make) · "sirf 3 din mein" (the exact hype Principle 1 forbids) · "trick", "shortcut", "jugaad" · "official CTET" (legal exposure) · any shouted opener

**Approved openers:**

> ✅ "Ye question aksar confuse karta hai." · "CTET isko is tarah poochta hai." · "Ek chhota sa fark hai — dhyaan dijiye." · "Chaliye, is concept ko theek se samajhte hain."

---

## 3. Can Hinglish Address Both Mediums?

**Short answer: yes — but only because of one specific design decision, not because of the voice.**

### 3.1 The three audiences

| Audience | Hinglish works? | Notes |
|---|---|---|
| Hindi-medium aspirants (UP, Bihar, MP, Rajasthan, Jharkhand, Haryana, Delhi, Uttarakhand, Chhattisgarh, HP) | ✅ Yes — their natural register | The clear volume majority of CTET Paper 1 candidates |
| English-medium aspirants **in the Hindi belt** | ✅ Yes | They code-switch constantly. Because you keep technical terms in English, they lose nothing. |
| Aspirants in non-Hindi states (TN, Kerala, Karnataka, AP/Telangana, West Bengal, Odisha, Assam, NE, much of Maharashtra/Gujarat/Punjab) | ⚠️ Voice alone is a real barrier | Smaller share of Paper 1 volume, but not negligible — CTET is a central exam |

CTET applications concentrate heavily in the Hindi belt, but the exam is genuinely national. Verify the current state-wise distribution against CBSE's published figures before weighting anything further — do not plan on a remembered number, including this one.

### 3.2 The decision that makes Hinglish safe

> **Voiceover is Hinglish. Every on-screen word is English.**

This resolves the problem completely, and it is the most important single rule in this document.

- A Malayalam- or Bengali-medium candidate mutes the video, reads the cards, and receives **100% of the content**. Nothing is gated behind understanding Hindi.
- A large share of Shorts viewing happens **muted**, on autoplay, in public. A design that survives muting is not an accessibility concession — it is the majority-case design.
- Your app UI is English-medium. If you voiced in Hinglish *and* rendered Devanagari cards, you would set an expectation the product does not meet, and the resulting Play Store reviews ("app Hindi mein nahi hai") would be entirely your own doing.
- English on-screen text is machine-readable, which helps YouTube classify and recommend the video correctly.

Hinglish audio widens the top of the funnel where your volume actually is. The English text layer means widening it costs you nothing anywhere else. You are not choosing between mediums — you are using two channels for two jobs.

### 3.3 Language matrix by subject

Language subjects are the exception, because there the language *is* the content.

| Subject | Voiceover | On-screen text | Reasoning |
|---|---|---|---|
| **CDP** | Hinglish | English | Concepts universal; terminology examined in English |
| **EVS** | Hinglish | English | Same |
| **Mathematics** | Hinglish | English + numerals | Same |
| **English (Language I)** | **~85% English**, light Hindi scaffolding | English | Cannot credibly teach English comprehension in Hindi. Use Hindi only to unlock a hard word. |
| **Hindi (Language II)** | **Pure Hindi** | **Devanagari** | The content *is* Hindi grammar. English cards here would be absurd. |

Publish Hindi-subject Shorts under a separate playlist and tag them in the title (`हिंदी व्याकरण`). They serve a different sub-audience; mixing them into the main feed muddies both.

### 3.4 Register rules for good Hinglish

The failure mode is not Hindi vs English — it is **wrong Hindi**.

- ✅ **Correct:** *"Is stage mein bachcha conservation samajh nahi paata."* — Hindi grammar, English technical terms.
- ❌ **Too Sanskritised:** *"इस अवस्था में शिशु संरक्षण की अवधारणा को नहीं समझ पाता।"* — reads as a textbook or a news bulletin, not a teacher. Alienates the exact aspirant you want.
- ❌ **Too casual:** *"Yaar is stage mein bacche ko kuch samajh nahi aata."* — destroys the institutional credibility your navy-and-gold identity is built to project.

Target the register of a **good B.Ed lecturer explaining to a colleague in a staff room**: Hindi carries the grammar and the warmth, English carries every term that will appear on the answer sheet.

---

## 4. Long-Term Approach — Shorts and Long-Form

### 4.1 The core model

**Shorts are discovery. Long-form is trust. The app is conversion.**

Nobody spends ₹999 because of a 30-second video. They spend ₹999 after watching you teach for 20 minutes and concluding you know what you are doing. Shorts exist to get strangers to that 20 minutes. Optimise each layer for its own job and stop asking Shorts to sell.

```
Short (30 s, discovery)
   └─> Subscribe / playlist
        └─> Long-form (15–45 min, trust)
             └─> Description link + SHORTS25
                  └─> Play Store → Free tier
                       └─> Pro Pass ₹749 (referred) / ₹999
```

### 4.2 You can ship long-form almost immediately

You are already holding two finished 15-minute audio masterclasses:

- `Piaget's_Four_Stages_of_Cognitive_Development.m4a`
- `Errors_and_street-smarts_build_math_intuition.m4a`

Remotion can render a synchronised visual track over existing audio. That converts each into a **15-minute long-form YouTube video for a few hours of build work and near-zero new content effort** — animated section headers, the concept diagrams from your P2 compositions, key-term cards on a timer, a progress bar, your logo. It is the cheapest long-form you will ever ship, and it is available this week.

Publish both in the 15–30 September window. They give the channel legitimacy while the Shorts are still finding an audience, and they give every Short somewhere to send an interested viewer.

### 4.3 Long-form formats, in build priority

1. **Audio masterclass + Remotion visual track** (15–20 min) — the near-free win above. Scales as you produce more episodes.
2. **Full mock-test walkthrough** (30–45 min) — you already have `sample-test.html` with 25 real questions. Solve it on camera or in Remotion with narration. The most reliably converting long-form format in exam prep, because it is an unmediated demonstration of exactly what the paid product contains.
3. **Subject marathons** (60–90 min) — "Complete CDP: Piaget, Vygotsky, Kohlberg, Gardner." Perennial search assets; a good CDP marathon can carry a channel across multiple exam cycles.
4. **"Why I built EasyCTET"** (8–10 min, your face, once) — a solo founder working nights on this is genuinely differentiated in a category dominated by faceless content mills. Link it from the channel banner permanently. Do not overproduce it; sincerity outperforms polish here.
5. **Post-exam analysis** (20 min, twice a year) — the highest-traffic days of your entire calendar. Reserve capacity for them.

### 4.4 Twelve-month roadmap

| Phase | Window | Shorts | Long-form | Objective |
|---|---|---|---|---|
| **1 — Prove** | 15 Sep – 9 Oct 2026 | 25 (1/day) | 2 (masterclass conversions) | Pipeline works. Baseline retention measured. |
| **2 — Harvest** | 10 Oct – 15 Nov 2026 | 3/week | 2 (paper analysis, mock walkthrough) | Capture next cohort while competitors are silent. **Highest-leverage window of the year.** |
| **3 — Library** | 16 Nov 2026 – Jan 2027 | 3/week (~40) | 1/week | One Short per `topicTag`. Systematic syllabus coverage. |
| **4 — Push** | 6–8 weeks pre-exam | 5/week + 2/day final fortnight | 2/week | Convert the accumulated library into installs |
| **5 — Compound** | Ongoing | 3/week | 1/week | Sustainable steady state |

**The Phase 3 principle is the strategically important one.** Your bank has 150 CDP questions across ~25 topic tags (Jean Piaget ×25, Constructivism ×19, Vygotsky ×16, Principles of Development ×16, Assessment ×14, Inclusive Education ×11…). Produce one Short per tag and you have systematically covered the CDP syllabus with a searchable, permanent asset per topic. That library is a genuine moat: it takes a competitor a year to replicate and it earns every cycle, forever. **Volume is not the goal — coverage is.**

### 4.5 One render, four platforms

Every Remotion output is 1080×1920 and ships to all of these with no re-edit:

| Platform | Code | Notes |
|---|---|---|
| YouTube Shorts | `SHORTS25` | Primary |
| Instagram Reels | `REELS25` | Same file; you may add trending audio *on Reels only* |
| WhatsApp Channel | `WEB25` | Highest engagement per follower in this category |
| Telegram | `WEB25` | Pair with your daily-question drill |

Your SSD already defines per-channel referral attribution. Use distinct codes per platform from day one — it is the only clean attribution you will get without telemetry, it costs nothing to set up now, and it is impossible to reconstruct later.

### 4.6 What to measure

Ignore view counts. They are the least actionable number available to you.

| Metric | Where | Target | Meaning |
|---|---|---|---|
| **3-second retention** | YT Studio → Retention | > 65% | Hook quality. The only Shorts metric that matters early. |
| **Full-watch rate** | YT Studio | > 45% | Duration and pacing correctness |
| **Subs per 1,000 views** | YT Studio | > 3 | Whether the channel reads as worth following |
| **Channel → Play Store CTR** | YT Studio → external links | Track from day 1 | Funnel leak detection |
| **`SHORTS25` redemptions** | Play Console | Any > 0 by 9 Oct | The only true attribution you have |
| **Long-form average view duration** | YT Studio | > 8 min | Trust actually being built |

**Kill criteria, stated in advance so you judge honestly later:** if after 40 Shorts your median 3-second retention is below 55%, the problem is your **hooks** — not your volume, not the algorithm, not your posting time. Rewrite the first two seconds of the next ten and compare. Do not respond to weak retention by producing more of the same.

### 4.7 Channel setup checklist (before 15 September)

- [ ] Handle `/@easyctet`; banner from `easyctet-youtube-banner.svg`; avatar = Turmeric Gold logo on Midnight Slate
- [ ] Description opens with the tagline, closes with **"Not affiliated with CBSE, NCTE, or any government body."**
- [ ] Playlists created empty and named now: `CDP Concepts` · `Daily Drill` · `Trap Busters` · `Exam Craft` · `हिंदी व्याकरण` · `Audio Masterclasses`
- [ ] Links: `easyctet.in`, Play Store, Telegram
- [ ] Titles follow one fixed pattern: `CDP: Object Permanence | CTET Paper 1 Daily Drill`
- [ ] Fixed tag block: `CTET`, `CTET Paper 1`, `CDP`, `बाल विकास`, `CTET 2026`, subject tag
- [ ] Pinned comment on every Short: one line + Play Store link + `SHORTS25`

---

## 5. The Remotion Build

### 5.1 Why Remotion is the right choice here

Not because it renders video — many things do. Because **your content is already structured data**. You have 750 questions in five JSON files with a clean, uniform schema:

```
schemaVersion · id · subject · paper · source_exam · q_number
topicTag · subtopic · difficulty
question_text · options{1,2,3,4} · correct_answer · explanation · stimulus
```

That maps one-to-one onto Remotion `defaultProps`. Every Daily Drill is the *same component* with a different object passed in. Build the composition once, and question #47 costs you a script line and a render — not an edit session. No template tool can do that, and it is worth the setup cost precisely because you have 750 of them and no time.

**Licensing:** Remotion is free for individuals and companies up to a small headcount, but it is **not** MIT — a company licence is required past that threshold. As a solo founder you are fine today. Read the current licence terms yourself before the business grows.

### 5.2 Project structure

```
easyctet-video/
├── remotion.config.ts
├── src/
│   ├── Root.tsx                 # composition registry
│   ├── brand/
│   │   ├── tokens.ts            # colors, type scale, spacing
│   │   ├── Logo.tsx             # the Open Dawn SVG, animated
│   │   ├── EndCard.tsx          # shared outro, 60 frames
│   │   └── Captions.tsx         # burned-in subtitle layer
│   ├── compositions/
│   │   ├── DailyDrill.tsx       # P1
│   │   ├── ConceptCard.tsx      # P2
│   │   ├── TrapBuster.tsx       # P3
│   │   ├── ExamCraft.tsx        # P4
│   │   ├── ProductMoment.tsx    # P5
│   │   └── MasterclassLong.tsx  # long-form over existing m4a
│   └── diagrams/
│       ├── PiagetStages.tsx
│       ├── VygotskyZPD.tsx
│       └── VanHiele.tsx
├── data/
│   ├── questions/               # symlink/copy of docs/Question-bank
│   ├── schedule.json            # date → {pillar, questionId, scriptPath}
│   └── lexicon.json             # SSML pronunciation overrides
├── audio/                       # generated VO, one .mp3 per video
├── scripts/
│   ├── tts.ts                   # script → SSML → audio file
│   ├── caption.ts               # audio → word timings
│   └── batch-render.ts          # schedule.json → out/*.mp4
└── out/
```

### 5.3 Brand tokens

Take these straight from the brand bible so video, app, and website cannot drift apart:

```ts
// src/brand/tokens.ts
export const color = {
  navy:       '#1E293B',  // Heritage Navy — primary
  midnight:   '#0F172A',  // Midnight Slate — video background
  amber:      '#F59E0B',  // Amber Dawn — accent on dark
  goldDeep:   '#B45309',  // Turmeric Gold Deep — small text on light
  sage:       '#059669',  // Sage Green — correct answer
  sageDeep:   '#047857',
  terracotta: '#DC2626',  // Terracotta Red — incorrect
  ivory:      '#F8FAFC',  // Warm Ivory — primary text on dark
} as const;

export const type = {
  hook:        84,  // 2-second opener
  question:    56,  // question_text
  option:      44,  // options
  explanation: 38,  // explanation body
  chip:        30,  // subject / topicTag chip
} as const;

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Safe area — YouTube overlays title, avatar and CTA over the edges.
export const SAFE = { top: 220, bottom: 380, x: 80 } as const;
```

**The `SAFE` constant is not optional.** YouTube's Shorts player covers roughly the top 220 px and bottom 380 px with its own UI. Content placed there is invisible to viewers and is the single most common mistake in programmatic Shorts. Enforce it in every composition.

### 5.4 A working Daily Drill skeleton

```tsx
// src/compositions/DailyDrill.tsx
import {
  AbsoluteFill, Sequence, Audio, useCurrentFrame,
  useVideoConfig, interpolate, spring, staticFile,
} from 'remotion';
import { color, type as T, SAFE } from '../brand/tokens';

export type Question = {
  id: string;
  subject: string;
  topicTag: string;
  question_text: string;
  options: Record<'1' | '2' | '3' | '4', string>;
  correct_answer: '1' | '2' | '3' | '4';
  explanation: string;
  stimulus: string | null;
};

export const DailyDrill: React.FC<{ q: Question; hook: string; audioSrc: string }> =
({ q, hook, audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: color.midnight, padding: `${SAFE.top}px ${SAFE.x}px ${SAFE.bottom}px` }}>
      <Audio src={staticFile(audioSrc)} />

      {/* 0–2s — hook + subject chip */}
      <Sequence durationInFrames={60}>
        <Chip label={`${q.subject} · ${q.topicTag}`} />
        <Hook text={hook} />
      </Sequence>

      {/* 2–10s — question */}
      <Sequence from={60} durationInFrames={240}>
        <QuestionText text={q.question_text} stimulus={q.stimulus} />
      </Sequence>

      {/* 10–15s — options stagger in, 40ms apart */}
      <Sequence from={300} durationInFrames={150}>
        {(['1', '2', '3', '4'] as const).map((k, i) => {
          const enter = spring({ frame: frame - 300 - i * 4, fps, config: { damping: 200 } });
          return (
            <OptionRow
              key={k}
              index={k}
              label={q.options[k]}
              style={{ opacity: enter, transform: `translateX(${interpolate(enter, [0, 1], [40, 0])}px)` }}
            />
          );
        })}
      </Sequence>

      {/* 15–20s — 5-second countdown, deliberate silence */}
      <Sequence from={450} durationInFrames={150}>
        <CountdownRing seconds={5} color={color.amber} />
      </Sequence>

      {/* 20–30s — reveal + the why */}
      <Sequence from={600} durationInFrames={300}>
        <Reveal correct={q.correct_answer} options={q.options} />
        <Explanation text={q.explanation} startFrame={60} />
      </Sequence>

      {/* 30–32s */}
      <Sequence from={900} durationInFrames={60}>
        <EndCard code="SHORTS25" />
      </Sequence>
    </AbsoluteFill>
  );
};
```

Register it with props loaded straight from your existing bank — no data transformation step:

```tsx
// src/Root.tsx
import cdp from '../data/questions/CDP-Questions-150.json';

<Composition
  id="DailyDrill"
  component={DailyDrill}
  durationInFrames={960}          // 32s @ 30fps
  fps={30} width={1080} height={1920}
  defaultProps={{
    q: cdp[0],
    hook: 'Ye question aksar confuse karta hai.',
    audioSrc: 'audio/CDP-P1-001.mp3',
  }}
/>
```

### 5.5 Captions

Burned-in captions are mandatory, not optional — they are what makes §3.2 work, and most Shorts play muted.

- Generate word-level timings with **`@remotion/install-whisper-cpp`**, which runs Whisper locally at no cost and outputs timings Remotion can consume directly.
- Render with **`@remotion/captions`** (`createTikTokStyleCaptions`) for word-by-word highlighting.
- **Caption text must be the English on-screen wording, not a transcript of the Hinglish audio.** Whisper will transcribe what was actually said — Hinglish. Override it with your English script text and use Whisper only for the *timings*. This is the step where the two-language design is actually implemented, and it is easy to get wrong by accepting the transcript as-is.
- Cap at 3 words per caption group, positioned above `SAFE.bottom`.

### 5.6 Batch rendering

```bash
npm i -g @remotion/cli

# one video
npx remotion render DailyDrill out/2026-09-16-CDP-001.mp4 \
  --props='{"q": ..., "audioSrc": "audio/CDP-P1-001.mp3"}'

# whole week from schedule.json
npx tsx scripts/batch-render.ts --from 2026-09-15 --to 2026-09-21
```

`batch-render.ts` should, for each schedule entry: build the SSML from the script + `lexicon.json`, call the TTS API, write the mp3, measure its true duration, set `durationInFrames` from that measurement, run Whisper for timings, then invoke `renderMedia()`. Roughly 150 lines. Write it once in week one and the marginal cost of a Short drops to writing a script.

**Set `durationInFrames` from the measured audio length — never hardcode it.** A fixed 960 frames against a 34-second VO truncates your call to action. Measure, then round up to the next whole second plus the 60-frame end card.

Render locally to start. `@remotion/lambda` only becomes worth the AWS setup at roughly 20+ videos per batch — which is Phase 3, not now.

### 5.7 Realistic time budget

| Task | One-time | Per Short |
|---|---|---|
| Project scaffold, brand tokens, end card | 4–6 h | — |
| DailyDrill composition | 5–7 h | — |
| ConceptCard + one diagram | 6–8 h | — |
| TrapBuster / ExamCraft / ProductMoment | 6 h | — |
| TTS + caption + batch pipeline | 5–7 h | — |
| **Total setup** | **~30 h** | |
| Write script (Hinglish + English cards) | | 20 min |
| Generate VO, review pronunciation | | 5 min |
| Render + spot check | | 5 min |
| Upload, title, tags, pinned comment | | 10 min |
| **Per Short after setup** | | **~40 min** |

At 6 hours/day, setup is about a week of evenings. Doing that in **11–14 September**, before publishing starts, is what makes a 25-day daily cadence survivable alongside a full-time job. If setup slips past the 14th, cut the calendar to every-other-day rather than compressing the build — a broken pipeline mid-season costs more than five fewer videos.

---

## 6. Risks and Compliance

| Risk | Why it matters | Mitigation |
|---|---|---|
| **YouTube "inauthentic content" policy** | Mass-produced, templated, synthetic-voice content faces monetisation and reach limits. A Remotion pipeline is structurally exactly what that policy targets. | Every script individually written. Vary hooks, diagrams, layouts. Use your own voice on P2 and all long-form. Never reuse a footage bed. The *templating* is fine; *identical repetitive output* is not. |
| **CTET affiliation claim** | Legal exposure with CBSE/NCTE | "Not affiliated with CBSE, NCTE, or any government body" in the channel description and on-screen in every P4 Exam Craft video |
| **Outcome claims** | Consumer-protection exposure; violates your own Principle 1 | Never state or imply guaranteed qualification, a score, or a first-attempt result. Enforce the §2.4 banned list at script review. |
| **Medium expectation mismatch** | Hinglish voice implying a Hindi app UI → bad Play Store reviews | English on-screen text throughout (§3.2); state "English medium" in the pinned comment on Hindi-subject Shorts |
| **Scope creep into Paper 2** | Launch plan explicitly forbids it this season | Paper 1 only in every title, tag, script and end card until the roadmap changes |
| **Music/font licensing** | Copyright strikes | YouTube Audio Library only. Poppins/Inter are OFL — safe to embed. Never use trending audio on YouTube; Reels only. |
| **Burnout** | The real risk. 25 daily videos alongside a full-time job. | **Batch-render 7 days ahead, always.** Schedule uploads; never publish live. A one-week buffer is the difference between finishing and abandoning. |

---

## 7. Week One — Do This Now (11–14 September)

1. **Claim `/@easyctet`.** Banner, avatar, description with the non-affiliation line, six empty playlists. One hour.
2. **Scaffold `easyctet-video/`.** Brand tokens, logo component, end card. These are shared by every composition, so build them first.
3. **Build `DailyDrill.tsx` and render `CDP-P1-001` end to end** — script → Azure TTS → Whisper timings → mp4. Getting one video fully through the pipeline is worth more than five half-built compositions.
4. **Test Hinglish TTS properly.** Feed it "Piaget", "object permanence", "conservation", "sensorimotor". Build the first entries of `lexicon.json` from what breaks.
5. **Write all 25 scripts in one sitting.** Cheaper in one focused block than 25 separate context switches, and it lets you check pillar balance and topic spread across the whole season at once.
6. **Convert one masterclass to long-form.** Publish it on 15 September alongside Short #1 so the channel does not launch empty.
7. **Batch-render 15–21 September and schedule all seven uploads.** Start the season already a week ahead. Never give that buffer back.

---

*EasyCTET — Serious CTET Paper 1 prep, simplified.*
*सा विद्या या विमुक्तये*
