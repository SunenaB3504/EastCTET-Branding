# System Specification Document (SSD) & Architecture Design
## EasyCTET Mobile Application (Android / React Native)
### Comprehensive Exam Preparation Suite for CTET Paper 1 & Paper 2

**Revision:** v3.0 — Milestone release incorporating peer architecture review: establishes true zero telemetry by eliminating external crashlytics SDKs (Play Store Data Safety declared as 'No data collected'); adopts Google Play standard account-level multi-device entitlement; introduces selective `FLAG_SECURE` (enforced on timed tests, relaxed on scorecards/explanations for viral WhatsApp referral growth); aligns language strategy to a Phased Marathi Rollout (English + Hindi launch with Language I/II Marathi; full regional expansion in Phase 2); refines empirical trend claims to verified historical analysis; integrates Solo-Developer Hardware Compatibility, Risk Mitigation & Support Policy (`minSdkVersion: 24`, pre-flight hardware checks, Plan A 1-tap self-healing, Plan B PDF fulfillment guarantee, 1-click Google Play refunds); locks Feature-Sliced Modular Codebase Architecture, the strict "Rule of 200" file size budget, and 100% offline On-Device Native TTS Audio Companion (<150 KB footprint).

---

## 1. System Metadata & Executive Overview

*   **Application Title:** EasyCTET — Master Practice & Study Suite
*   **Target Platform:** Android (Google Play Store) • Future iOS expansion
*   **Technology Stack:** React Native (TypeScript), Hermes Engine, Zustand + MMKV, SQLite/Local JSON, Cloudflare R2 (Audio CDN), Google Play Billing
*   **Target Exams:**
    *   **CTET Paper 1:** Primary Stage (Classes I – V, Ages 6–11, D.El.Ed / D.Ed Candidates)
    *   **CTET Paper 2:** Elementary Stage (Classes VI – VIII, Ages 11–14, B.Ed Candidates)
*   **Languages Supported:**
    *   **Launch (Phase 1):** English and Hindi across all core subjects (CDP, Mathematics, EVS) matching actual CTET examination paper delivery; Marathi supported for Language I & Language II modules.
    *   **Expansion (Phase 2):** Full Marathi curriculum across all subjects to serve bilingual aspirants and the Maharashtra state (MAHA-TET) market.
*   **Monetization Model:** Freemium with Single Paper Unlock (₹999 base / ₹749 via 25% referral) and All-in-One Combo Pass (₹1,998 base / ₹1,799 standard 10% in-app bundle / ₹1,499 via 25% referral on base).
*   **Referral & Promo Model:** Altruistic 25% Discount ("Gift 25% Off" / saves ₹250 on Single, ₹499 on Combo). Universal attribution for peer links (`code=ANITA25`), family/non-aspirant gifts, YouTube Shorts (`code=SHORTS25`), Instagram Reels (`code=REELS25`), Promo Website (`code=WEB25`), and an **explicit in-app promo code entry fallback** at checkout. Zero cash payouts, zero tax/TDS liabilities.
*   **Empirical High-Probability Trend Radar:** Integrates statistical recurrence analysis across analyzed CTET exam papers (sourced from `docs/verbatim-question-txt/`). The local notification engine delivers targeted daily alerts for high-yield topics (Piaget, Vygotsky, Kohlberg, Inclusive Ed, Van Hiele geometry, Krashen input hypothesis) with instant conceptual explanations.
*   **True Zero-Telemetry Hermetic Architecture:** Once installed, the candidate's preparation is 100% self-contained on their device. Zero telemetry servers, zero remote crash collectors, zero background sync daemons, and zero server-side downtime risk. Google Play Data Safety is truthfully declared as **"No data collected or shared"**.
*   **Government Affiliation Disclaimer:** Independent educational preparation suite; zero official affiliation with CBSE, NCTE, or any Government organization (see Section 6.3.2).

```
                       +---------------------------------------------+
                       |              Google Play Store              |
                       |       (Ultra-lightweight ~13 MB AAB)        |
                       +---------------------------------------------+
                                              |
                                     [Download & Install]
                                              |
                                              v
                       +---------------------------------------------+
                       |              EasyCTET Mobile App            |
                       |    - 1-Tap Google Sign-In & Device Bind     |
                       |    - Select: Paper 1 (D.Ed) or Paper 2 (B.Ed)|
                       +---------------------------------------------+
                                              |
              +-------------------------------+-------------------------------+
              |                               |                               |
              v                               v                               v
    [Hermetic Offline Layer]         [Assessment & Study]             [Cloud & Media]
    - Bundled JSON (<400 KB)         - 4 Quiz Regimens                - Cloudflare R2 (Audio CDN)
    - Independent Language Stores    - Instant & Exam Modes           - Standalone MP3 Downloads
    - Encrypted Local License        - Markdown Study Guides          - Google Play In-App Billing
    - 100% Offline Practice          - Local Daily Notifications      - 25% Universal Attribution
    - Local SQLite Mistake Audit     - App-Wide Dark Mode             - In-App Promo Code Fallback
```

---

## 2. Technical Architecture & Tech Stack

### 2.1 Mobile Client Architecture
*   **Framework:** React Native 0.74+ with the **Hermes JS Engine** and New Architecture enabled.
*   **State Management:** **Zustand** with persistent, synchronous hydration via `react-native-mmkv` (~2 KB runtime footprint, zero-boilerplate stores, 10x faster than AsyncStorage, zero hydration lag on cold launch).
*   **Local Storage & Offline Database:**
    *   `react-native-sqlite-storage` / local JSON for high-speed indexed question bank queries, bookmarks, and test history.
    *   `react-native-encrypted-storage` (using Android Keystore / `EncryptedSharedPreferences`) for session auth tokens, cryptographic purchase receipts, and offline entitlement licenses.
*   **Typography & Font Subsetting Strategy (Strict 12–15 MB Bundle Budget):**
    *   **Font Weights:** Bundle strictly two weights per family: **Regular (400)** for body copy and **SemiBold (600)** for headings and emphasis.
    *   **Unicode Subsetting:** For Noto Sans Devanagari (Hindi and Marathi), glyphs are subset strictly to the modern Devanagari unicode block (`U+0900–U+097F`). Archaic Vedic extensions and unneeded historic scripts are stripped. This saves **4–6 MB** in raw font assets, guaranteeing the production `.aab` remains under the 15 MB threshold.
*   **App-Wide Dark Theme Support:**
    *   Canvas: `#0F172A` (Midnight Slate); Cards: `#1E293B` (Heritage Navy); Typography: `#F8FAFC` (Warm Ivory); Luminous Accents: `#F59E0B` (Amber Dawn).
    *   Dark Mode is app-wide across Dashboard, Quiz Engine, Mistakes Audit, and Study Guides, syncing automatically with Android system dark-theme settings or toggleable manually in Settings.
*   **Audio Handling (Standalone MP3 Model):** Delinked from custom in-app player services. The app triggers native Android `DownloadManager` to save branded masterclass MP3s directly into user-accessible storage (`Downloads/EasyCTET/`). Candidates play the audio using their preferred system audio player (VLC, Samsung Music, Spotify local files) with standard lockscreen, Bluetooth, and earphone controls.
*   **Local Notification Engine:** `@notifee/react-native` leveraging Android `WorkManager` / `AlarmManager` for scheduled daily "Question of the Day" and "Concept Flash" alerts. 100% offline, zero server cost.
*   **Low-Spec Solo-Developer Build Workflow (Zero Emulator Footprint):**
    *   **No Android Studio / Heavy Local SDK Needed:** Eliminates memory-intensive Android Studio installations and local Android Virtual Device (AVD) emulators that exhaust low-spec developer laptop RAM.
    *   **Direct Physical Testing via USB:** Testing runs directly on an attached physical Android device via USB debugging (`adb`), consuming <250 MB of laptop RAM with instant Fast Refresh.
    *   **Free Cloud Compilation via Expo EAS Build:** Production APKs and Google Play App Bundles (`.aab`) are compiled remotely on Expo's free cloud infrastructure (`eas build --platform android`), offloading 100% of CPU and Gradle compilation loads from the developer's laptop.
*   **App Bundle Size Target:**
    *   Play Store Download Size: **12 MB – 15 MB** (as an Android App Bundle `.aab` — leaner footprint by eliminating heavy native ExoPlayer/audio service dependencies).
    *   Installed Footprint: **~30 MB – 40 MB**.

### 2.2 Cloud & Backend Infrastructure (Hermetic Zero-Server Model)
To guarantee the app **never experiences server downtime** and candidate preparation is completely private and uninterrupted:
*   **Zero Runtime Backend Dependencies:** The application operates with no live application server, no backend API gateway, no user database cluster, and no server-side telemetry collector. Once downloaded, the app runs completely standalone.
*   **Local-Only Performance Audit & Analytics:**
    *   Mistake history, response pacing, topic mastery percentages, and question attempts are calculated and stored **100% locally** in the device's SQLite database and MMKV storage.
    *   No external telemetry servers, no online ranking engines, and no central database collecting candidate answers. Eliminates compliance risks under India's Digital Personal Data Protection Act (DPDPA 2023) and completely prevents server hosting bills.
*   **Media Hosting & CDN (Audio Masterclasses):** **Cloudflare R2 Object Storage**.
    *   Zero egress / bandwidth fees (\$0.00 / GB).
    *   Free tier covers 10 GB storage and 10,000,000 read requests per month.
    *   Direct downloads via Android `DownloadManager` into `Downloads/EasyCTET/`.
*   **Static Promotional Website:** Hosted for \$0/mo on Cloudflare Pages or GitHub Pages (`easyctet.com`):
    *   Hosts 1 complete, full-length Masterclass MP3 (e.g., *Piaget & Vygotsky*, 45 mins) available for direct free download without login as a viral lead magnet.
    *   Features Google Play store download CTA with campaign referral tag (`referrer=code%3DWEB25`).
    *   Hosts public legal assets: Privacy Policy, Terms of Service, and the Google Play mandatory Account Deletion portal (`easyctet.com/delete-account`).
*   **Payment Infrastructure (Simplified, Air-Gapped & Fully Compliant):**
    *   Google Play In-App Billing Library handles all transaction logic directly with Google Play Services on the device.
    *   Cryptographic purchase signature verification occurs locally on the device via the public key bundled within the app, decrypting and storing an offline license entitlement token in Android Keystore.
    *   **Zero External Payout Gateways:** By replacing cash referral commissions with a direct 25% peer discount ("Gift 25% Off" / saves ₹250–₹499), all financial transactions remain strictly within Google Play In-App Billing. This eliminates third-party payout gateways (RazorpayX/Cashfree), payment aggregator KYC, and TDS withholding obligations entirely.

### 2.3 Modular Codebase Architecture & File Size Control Policy (Rule of 200)

To prevent code degradation, avoid "Monster Files" (or "God Components"), and ensure that EasyCTET can serve as an atomic, reusable template for future educational apps (e.g., State TETs, UPTET, REET), the client application enforces a **Feature-Sliced Domain Architecture** with strict file-size guardrails:

#### 2.3.1 Feature-Sliced Directory Modularity (`src/modules/`)
Code is decoupled into self-contained domain directories. Each module encapsulates its own views, business hooks, local state, and type definitions:

```
src/
├── core/                                # Shared System Foundation (Plug & Play)
│   ├── theme/                           # Color tokens (#0F172A, #F59E0B), typography
│   ├── storage/                         # MMKV & Keystore encrypted wrappers
│   └── ui/                              # Atomic primitives: Button, Card, Badge, Modal
│
├── modules/
│   ├── assessment/                      # 🎯 Assessment Engine Module
│   │   ├── components/                  # QuizHeader, OptionItem, PaletteDrawer
│   │   ├── hooks/                       # useQuizSession, useQuizTimer, usePacing
│   │   └── store/                       # assessmentStore (Zustand)
│   │
│   ├── study-hub/                       # 📖 Conceptual Study Guides Module
│   │   ├── components/                  # MarkdownRenderer, CalloutBox, TableOfContents
│   │   └── hooks/                       # useReadingProgress
│   │
│   ├── tts/                             # 🎙️ On-Device TTS Audio Companion Module
│   │   ├── engine/                      # Native TTS bridge & SSML pause injector
│   │   ├── normalizer/                  # Phonetic dictionary (Piaget, ZPD, etc.)
│   │   └── components/                  # FloatingListenPill, AudioProgressBar
│   │
│   ├── analytics/                       # 📊 Local Performance & Mistake Ledger
│   │   ├── db/                          # SQLite migrations & queries (Mistake Bank)
│   │   └── components/                  # CircularReadinessRing, TopicMasteryBar
│   │
│   ├── notifications/                   # 🔔 Empirical Trend Radar Module
│   │   ├── scheduler/                   # Android WorkManager 9 AM & 6 PM triggers
│   │   └── matrices/                    # 5-cycle recurrence data & explanations
│   │
│   └── monetization/                    # 💳 In-App Billing & Referral Module
│       ├── billing/                     # Google Play Billing API & license vault
│       └── attribution/                 # 25% install referrer & manual promo resolver
```

#### 2.3.2 The "Rule of 200" File Size Budget
Every file in the codebase operates under a strict target ceiling of **150 to 200 lines of code**:
* **UI Presentation Components (80–120 lines):** Pure JSX layouts. Heavy calculations, state management, and database access are strictly forbidden in component files.
* **Custom React Hooks (50–90 lines):** Encapsulate all reactive state, countdown timers, and event handlers.
* **Pure Utilities & Parsers (30–50 lines):** Independent, side-effect-free helper functions (e.g., `pacingCalculator.ts`, `ssmlParser.ts`).
* **TypeScript Types & Constants (20–40 lines):** Dedicated `types.ts` schemas isolated from runtime execution logic.

#### 2.3.3 Automated Linter Guardrails
File size hygiene is enforced programmatically in `.eslintrc.js`:
```javascript
rules: {
  "max-lines": ["warn", { "max": 200, "skipBlankLines": true, "skipComments": true }],
  "max-lines-per-function": ["warn", { "max": 60 }]
}
```
Any file approaching 200 lines automatically triggers a linter warning, mandating sub-component extraction or custom-hook refactoring before code can be merged into `main`.

---

## 3. Data Schema & Multilingual Architecture

To ensure clean isolation, simple future language additions (e.g., Tamil, Telugu, Gujarati), and zero merge conflicts, questions are stored in **separate, modular JSON files organized by Paper and Language**.

### 3.1 Directory Organization
```
assets/data/
├── P1/                                # Paper 1: Primary (Classes 1-5)
│   ├── en/
│   │   ├── cdp.json
│   │   ├── math.json
│   │   ├── evs.json
│   │   └── languages.json
│   ├── hi/
│   │   ├── cdp.json
│   │   ├── math.json
│   │   ├── evs.json
│   │   └── languages.json
│   └── mr/
│       ├── cdp.json
│       ├── math.json
│       ├── evs.json
│       └── languages.json
│
└── P2/                                # Paper 2: Upper Primary (Classes 6-8)
    ├── en/
    │   ├── cdp.json
    │   ├── math_science.json
    │   ├── social_studies.json
    │   └── languages.json
    ├── hi/ ...
    └── mr/ ...
```

### 3.2 Question Schema Standard (`*.json`)

**Revised policy (v2.0): no verbatim or near-verbatim sourcing from official CBSE papers.** All question stems, options, passages, and poems are originally authored, using past official papers only as a *topic and format reference*, never as source text. See Section 3.3 for the full content-origination policy.

Every question across all language files shares the identical primary key (`id`), enabling instantaneous in-quiz language switching without re-rendering or losing timer state. The schema now includes a `schemaVersion` field (see Section 7.1) and replaces the old `sourceExam` / `qNumber` fields — which implied direct extraction from a dated official paper — with a non-attributional `styleReference` tag used only for internal content planning:

```json
{
  "schemaVersion": "2.0",
  "id": "CDP-P1-001",
  "styleReference": "CTET-format, CDP, Inclusion & Learning Disabilities",
  "topicTag": "Inclusion & Learning Disabilities",
  "correctAnswer": "3",
  "questionText": "Anil, a Class III student, forms letters slowly and with visible physical effort, though his spoken vocabulary and comprehension are age-appropriate. Which of the following best explains his difficulty?",
  "options": {
    "1": "A speech disorder marked by stuttering and articulation errors.",
    "2": "A locomotor disorder marked by gross motor impairment.",
    "3": "A neurological condition affecting the fine motor control needed to form letters and shapes.",
    "4": "A behavioural condition marked by inattention and impulsivity."
  },
  "explanation": "Dysgraphia is a neurological condition affecting handwriting and fine motor coordination, distinct from reading disorders (Dyslexia) or speech/attention-related conditions."
}
```

Note the shift from the earlier flat definitional prompt ("Dysgraphia is a :") to an originally-scripted scenario ("Anil, a Class III student...") — this is the intended pattern going forward: same concept and difficulty level as the CTET-style question, entirely original wording and framing.

### 3.3 Content Origination Policy (Replaces old "Fallback & Translation Policy")

**Core principle:** Official CBSE/CTET papers are used strictly as a **syllabus map and difficulty benchmark** — never as source text for stems, options, passages, or poems. If a reviewer placed a new question next to the nearest official question on the same topic, there should be no shared phrase beyond ordinary connective language, and no option that is a synonym-swapped version of an official option.

**What may be referenced from old papers:**
1. The **topic/concept** being tested (e.g., "distinguishing assimilation from accommodation").
2. The **question format** (Assertion-Reason, fill-in-the-blank, "which is NOT true," scenario-based).
3. The **general difficulty level and phrasing register** typical of CTET.
4. The **pattern of distractor types** (e.g., a Vygotsky question commonly pairs a "learn only independently" false option) — the *pattern* is fair game; the *exact sentence* is not.

**What must always be original:**
1. Question stems — written from scratch by the content team, not paraphrased from a specific official question.
2. All answer options — freshly authored, never synonym-swapped versions of official wording.
3. Reading passages and poems — commissioned/written originally. Literary passages are a **higher-risk category** than MCQ stems (they are copyrighted works in their own right, independent of the exam context), so no excerpting of any passage or poem that appeared in an official paper.
4. Names, numbers, and scenario details in word problems and pedagogy vignettes.

**Workflow safeguards:**
1. **Concept extraction, not text extraction.** A content reviewer studies an official past question and writes a one-line concept brief (e.g., "Stage 5 Kohlberg reasoning example") for the question-writer — the original question text is not handed to the writer.
2. **Blind authoring.** Question-writers work from the concept brief only, without the source PDF open alongside them.
3. **Mandatory variation on every new question:** different scenario names/characters, different numbers in quantitative items, options reordered rather than preserved in the original's sequence, and a different framing verb than the source (e.g., original asks "which is true," new version asks "which of the following best illustrates").
4. **Pre-publish similarity check.** Before a question is added to the live JSON, it is checked against the nearest known official question on that topic for: (a) any shared phrase longer than a few ordinary words, (b) any option that is a close synonym-swap of an official option.
5. **Editorial sign-off log.** Each question's origination is logged (concept source, author, similarity-check reviewer) in an internal-only content ledger — not shipped in the public JSON — so provenance can be demonstrated if ever questioned.

### 3.4 Phased Regional Language Strategy (Marathi & State TET Alignment)
*   **Phase 1 (Launch):** Marathi is fully integrated for **Language I and Language II modules** (30 questions each for Paper 1 and Paper 2), matching how CTET administers Marathi via the official Language Supplement Booklet. Core subjects (CDP, Math, EVS) are provided in English and Hindi to reflect actual CTET examination paper delivery.
*   **Phase 2 (Expansion):** The full curriculum (CDP, Math, EVS, Science, Social Studies) will be translated into Marathi to capture both regional bilingual aspirants and the 3+ lakh annual candidates of the **MAHA-TET** (Maharashtra State Teacher Eligibility Test) market.
*   **Graceful Fallback:** If a translation for a regional module is missing, the engine automatically falls back to English for that item, preventing crashes.

---

## 4. User Onboarding & Authentication Lifecycle

```
[New User Installs from Play Store]
               │
               ▼
[Step 1: Instant Local-First Access (Zero Sign-In Friction)]
  • No passwords, no SMS OTP, no Google Sign-In prompt, zero email collection
  • 100% private: Candidate immediately enters app without account barriers
  • Privacy Policy & Terms link displayed in Settings (DPDPA 2023 compliant, Zero-Telemetry)
               │
               ▼
[Step 2: Referral Code Capture (Automated + Manual Fallback)]
  • Read from Google Play Install Referrer API (from WhatsApp, Shorts, or Web link)
  • If found: Auto-applies code; shows "Referred by [Friend/Promo] - 25% Academic Discount Active!"
  • If not found / Manual Entry: Checkout & Paywall screens provide an explicit input field:
    "Have an educator referral or promo code? [Enter Code] [Apply]"
    (Switches billing request to referred_25 SKU, unlocking ₹749 / ₹1,499 pricing)
               │
               ▼
[Step 3: Track Selection (Laser Focus)]
  • "Which exam are you preparing for?"
    [ Option 1: CTET Paper 1 (Classes 1–5 / D.El.Ed) ]
    [ Option 2: CTET Paper 2 (Classes 6–8 / B.Ed) ]
               │
               ▼
[Step 4: Google Play Entitlement & Offline License Caching]
  • Reads Google Play purchase receipt via Google Play Billing Library
  • Cryptographically verifies receipt signature locally using bundled public key
  • Caches offline entitlement license in Android Keystore / EncryptedSharedPreferences
  • Account-Level Multi-Device Support: Entitlements are account-scoped per standard Google Play policy.
    A candidate signed into their licensed Google account can seamlessly use the app across their phone
    and tablet via queryPurchasesAsync with zero server dependencies.
               │
               ▼
[Direct Access to Dashboard & Free Diagnostic Test]
```

### Day-to-Day & Offline Launch:
* **Silent Resume:** The app reads state from MMKV and SQLite. The user is **never forced to log in** under any circumstance.
* **100% Hermetic Offline Capability:** If no internet connection exists, the app validates the cached local cryptographic license and permits full offline practice, test auditing, and study guide reading with zero network queries.

### Multi-Device Access (Google Play Standard):
* Entitlements are tied to the candidate's authenticated Google Play account. Tapping "Restore Purchases" instantly restores full access on any secondary device (such as a tablet) using the same Google account via `queryPurchasesAsync`, requiring zero remote server registry or login credentials.

### 4.1 Privacy Compliance & Local Data Purge
* **Zero Account Requirement:** Because EasyCTET does not require account creation, it is **exempt from Google Play's Mandatory Account Creation & Deletion policy**.
* **In-App Local Data Reset (`Settings > Data & Privacy > Reset Local Progress`):** To give candidates complete control over their device storage, tapping "Reset Local Progress" prompts a confirmation dialog and instantly purges all SQLite mistake logs, test history scores, and MMKV cache from the device in under 1 second.
* **100% Truthful Data Safety Declaration:** EasyCTET truthfully selects **"No data collected"** on Google Play Console, completely eliminating user data liability under India's DPDP Act 2023.

---

## 5. Core Application Modules

### 5.1 Interactive Assessment Engine
1. **Four Training Regimens:**
   * **Full Exam Marathon:** All questions in the paper randomized for comprehensive preparation.
   * **10-Question Sprint:** Rapid 5-minute drill sampled dynamically across all syllabus domains.
   * **Official-Pattern Mode:** Practice sets styled on specific past exam cycles' format and difficulty (e.g., "August 2023 style," "December 2024 style") — built from originally-authored questions per Section 3.3, not reproductions of the actual papers.
   * **Pedagogical Topic Mastery:** Targeted drills on specific theorists (Jean Piaget, Lev Vygotsky, Lawrence Kohlberg) or domains (Inclusive Education, Development Principles).
2. **Dual Experience Modes:**
   * **Instant Feedback Mode:** Immediate correct/incorrect highlight upon selection, subtle low-frequency acoustic confirmation (soft wooden click / gentle marimba tone, muted by default, optional haptic feedback; strictly no arcade/casino dings), and instant pedagogical explanation card.
   * **Exam Simulation Mode:** Timed test without answer reveal; comprehensive evaluation and review upon completion.
3. **Assessment Utilities:**
   * Real-time timer and per-question pace calculation.
   * Question flagging (`Flag for Review`) with persistent filter.
   * **Bottom-Sheet Question Navigation Drawer:** Visual bubble palette (Current, Answered, Unanswered, Flagged).
   * In-Quiz 1-Tap Language Switcher (`EN` $\leftrightarrow$ `HI`).
4. **Performance Audit & Analytics:**
   * Circular accuracy score ring with canonical institutional performance badges:
     * `[ DISTINCTION ]` ($\ge 80\%$)
     * `[ EXAM READY ]` ($60\% - 79\%$)
     * `[ REVISE ]` ($< 60\%$)
   * Topic Mastery Breakdown with progress bars (Distinction $\ge 80\%$, Exam Ready $\ge 60\%$, Revision Recommended $< 60\%$), computed 100% locally from the candidate's attempt history.
   * Wrong-answer audit with filter tabs (*All*, *Incorrect Only*, *Flagged*) showing user choice vs. correct choice and full explanation.
   * **Retest Mistakes Button:** Instantly launches a focused quiz containing only the questions missed in that session, pulling directly from the local SQLite mistake ledger.

### 5.2 Conceptual Study Guides Module
* **Markdown Viewer:** Clean typographic rendering with adjustable font scale, line height, and app-wide dark mode.
* **App-Wide Dark Theme Support:** Study Guides render against `#0F172A` (Midnight Slate) with `#F8FAFC` typography and `#F59E0B` section anchors, fully synced with the app-wide theme setting.
* **Module Structure (e.g., `Piaget` Series):**
  * Core Theoretical Definitions (Schemas, Equilibration, Adaptation).
  * Invariant Stages & Developmental Direction (Cephalocaudal vs. Proximodistal).
  * Common Exam Traps & Misconceptions.
  * Direct Call-to-Action Bridge: *"Test Your Understanding on this Topic (10 Questions)"*.

#### 5.2.1 On-Device Native Text-to-Speech (TTS) & Audio Companion (100% Offline, <150 KB)
To empower teacher aspirants to study during commutes, multi-tasking, or visual fatigue without reading manually, every study guide and question explanation includes a **native, 100% offline Text-to-Speech companion**:

1. **Hermetic On-Device Architecture (Zero Cloud API Bills):**
   * Powered by Android's native `android.speech.tts.TextToSpeech` engine (via `react-native-tts`) utilizing pre-installed system voice packs (Google Speech Services / Samsung TTS).
   * **Zero Cloud Costs:** Operates 100% offline with zero cloud API requests (AWS Polly / Google Cloud TTS eliminated). Works seamlessly in Airplane Mode or remote areas.
   * **Negligible Footprint (<150 KB):** Unlike pre-recorded MP3 libraries that would bloat the app by 250+ MB, native TTS synthesizes audio dynamically on-device from existing text, preserving the strict <15 MB App Bundle budget.
   * **Native Multilingual Support:** Automatically binds to Indian English (`en-IN`), Hindi (`hi-IN`), or Marathi (`mr-IN`) based on the candidate's active study language.

2. **Human Readability & Pedagogical Cadence Engine:**
   * **SSML (Speech Synthesis Markup Language) Pacing:** Injects natural teacher-like breathing pauses into raw markdown text:
     * Section headings: `<break time="750ms"/>` before and after.
     * Bulleted lists: `<break time="350ms"/>` between items.
     * Paragraph boundaries: `<break time="500ms"/>` breath pauses.
   * **Educational Acronym & Phonetic Normalizer:** A lightweight local dictionary cleans and normalizes terms before vocalization:
     * Pronunciation accuracy: *Piaget* $\to$ `"Pee-ah-zhay"`, *Vygotsky* $\to$ `"Vye-got-skee"`, *Van Hiele* $\to$ `"Van Hee-luh"`.
     * Character spell-outs: *ZPD* $\to$ `"Z. P. D."`, *CDP* $\to$ `"C. D. P."`, *CCE* $\to$ `"C. C. E."`, *EVS* $\to$ `"E. V. S."`.
     * Mathematical/symbolic clarity: *$i+1$* $\to$ `"i plus one"`.
   * **Tone & Pitch Modulation:**
     * Authoritative Headings: Spoken at slightly lower pitch (`setPitch(0.92)`) at `0.9x` rate.
     * Body Explanations: Conversational tone (`setPitch(1.0)`, `1.0x` rate).
     * ⚠️ Exam Trap Alerts: Preceded by a subtle acoustic cue and spoken with deliberate emphasis (*"Take note: Common Exam Misconception..."*).

3. **Chunk-Based Progress Tracking & Instant Resume (MMKV):**
   * **Granular Chunk Indexing:** Each study guide is parsed into an indexed array of text blocks (`chunkId: 0..N`).
   * **Real-Time Asynchronous Callbacks:** Android's native `UtteranceProgressListener.onDone()` callback updates the candidate's progress in MMKV in under 1 millisecond upon each completed chunk:
     `study_progress_CDP_01 = { lastReadChunkId: 12, totalChunks: 24, percent: 50, completed: false }`
   * **Seamless 1-Tap Resume:** When returning to a partially studied guide, the floating player displays `[ ▶ Resume from 50% (Section 3: Concrete Operational) ]`. Tapping Resume immediately auto-scrolls to Chunk #12, highlights it, and resumes narration.
   * **Completion Milestone:** When $\ge 90\%$ of chunks are completed, the status updates to `completed: true`, displaying a green checkmark (`✅ Completed`) in the curriculum list and updating the candidate's Dashboard Syllabus Mastery Ring.

4. **Player UI/UX & Background Service:**
   * **Floating Bottom Pill:** Features 1-tap Play/Pause, speed selector (`0.75x`, `1.0x`, `1.25x`, `1.5x`), and `⏪ 15s / ⏩ 15s` skip controls.
   * **Karaoke-Style Auto-Scroll:** The actively spoken paragraph is gently highlighted with an amber glow (`#F59E0B`), and the screen auto-scrolls down in sync with the audio.
   * **Lockscreen & Background Audio:** Uses Android `AudioService` so listening continues uninterrupted when the screen is turned off or when navigating other apps.

### 5.3 Audio Masterclasses (Standalone MP3 Download & Viral Lead-Magnet Model)
* **Completely Delinked Audio Architecture:** Rather than building a complex, fragile in-app audio player, the app triggers Android's native `DownloadManager` to save high-yield conceptual masterclass audio files directly into user-accessible storage (`Downloads/EasyCTET/`).
* **Zero App Dependency for Playback:** Once downloaded, candidates listen seamlessly via their device's native music player (Samsung Music, VLC, Musicolet, Spotify local files) during commutes, with full system lockscreen, Bluetooth, and earphone playback controls.
* **Branded Audio Watermarking ("Trojan Horse" Strategy):**
  * Every audio file begins and concludes with a concise, professional audio brand message:
    > *"Welcome to the EasyCTET Masterclass Series. To practice 750+ originally authored mock questions with instant explanations and full CBT analytics, download EasyCTET on Google Play. Use code AUDIO25 to save 25% today."*
  * When candidates forward or share MP3 files in WhatsApp coaching circles or Telegram channels, the audio functions as a free, high-trust audio advertisement driving listeners back to the Play Store.
* **Free Website Lead Magnet:** 1 full-length masterclass MP3 (*"The Operating System of the Child's Mind: Piaget & Vygotsky"*, ~45 mins) is available for direct 1-click download on the static promo website (`easyctet.com`) with zero signup required, proving curriculum excellence and funneling candidates directly to the app.

### 5.4 Empirical High-Probability Notification Engine & Pedagogical Radar (100% Offline)
* **Zero Server Cost Local Engine:** Powered by `@notifee/react-native` and Android `WorkManager` / `AlarmManager`. The engine runs 100% locally on the device using bundled trend matrices and question-explanation pairs—zero Firebase Cloud Messaging servers, zero cron jobs, zero database polling.
* **Data-Grounding: Verified Historical Analysis Across Core Exam Papers:**
  The notification engine is systematically mapped to topic recurrence patterns extracted from deep pedagogical analysis of official CTET exam papers (sourced from `docs/verbatim-question-txt/`):
  1. **Child Development & Pedagogy (CDP):**
     * **Consistent Core Recurrence:** Jean Piaget's cognitive stages & equilibration mechanisms; Lev Vygotsky's Scaffolding, ZPD & Private Speech; Lawrence Kohlberg's moral development stages; Inclusive Education & Specific Learning Disabilities (Dysgraphia vs. Dyslexia vs. ADHD).
     * **High-Frequency Recurrence:** Socialization Agencies (Primary Family vs. Secondary School); Developmental Directions (Cephalocaudal vs. Proximodistal); Constructivist learner-centered pedagogy.
  2. **Environmental Studies (EVS):**
     * **Consistent Core Recurrence:** Spatial mapping, direction & railway timetable calculations; Animal behavioral adaptations (Sloth sleeping patterns, Elephant herd matriarchy, Tiger nocturnal vision); Traditional water conservation (Bawris/Stepwells); Regional food & lifestyle adaptations (e.g., Tapioca/Kerala, Changpa tribe/Ladakh).
  3. **Mathematics & Quantitative Pedagogy:**
     * **Consistent Core Recurrence:** Pierre Van Hiele's Levels of Geometric Thought (Level 0 Visualization, Level 1 Analysis, Level 2 Informal Deduction); Place Value vs. Face Value; Fractional spatial representations; Diagnostic error analysis and open vs. closed questioning.
  4. **Language I & II Pedagogy (English, Hindi, Marathi):**
     * **Consistent Core Recurrence:** Stephen Krashen's Second Language Acquisition hypotheses (Comprehensible Input $i+1$, Affective Filter); Noam Chomsky's Universal Grammar & Language Acquisition Device (LAD); Integrated assessment of LSRW skills; Contextual grammar instruction.
* **Two Structured Daily Notification Dispatches (Dignified Senior Professor Voice):**
  * **Morning (9:00 AM) — High-Probability Exam Drill:**
    Surfaces the empirical importance of the topic alongside a 3-minute originally authored drill:
    > *"High-Yield Topic Alert (Consistent Core Recurrence): According to Lev Vygotsky, what role does private speech play in cognitive self-regulation? Tap to test (3-minute drill)."*
    * Tapping deep-links directly into the 1-question instant quiz card, delivering an immediate learning feedback loop.
  * **Evening (6:00 PM) — Conceptual Refinement & Topic Explanation:**
    Delivers a clear, high-yield conceptual breakdown and rationale directly on the notification card:
    > *"Empirical Trend Focus: Across analyzed CTET papers, Van Hiele Level 0 (Visualization) vs. Level 1 (Analysis) appears in every paper. Level 0 judges shapes by visual appearance; Level 1 classifies by properties. Tap for full study guide."*
* **Curriculum Rotation & Engine Mechanics:**
  * Pre-compiled in a lightweight local JSON table (`assets/data/exam_trends.json`, <25 KB).
  * 45-day non-repeating calendar managed by Android `WorkManager` with graceful rotation.
  * **Retention & Confidence Driver:** Overcomes candidate procrastination by systematically reinforcing the top 20% of syllabus topics that account for >70% of exam marks, completely offline.Van Hiele Level 0 (Visualization) vs. Level 1 (Analysis) has appeared in every exam. Level 0 judges shapes by visual appearance; Level 1 classifies by properties. Tap for full study guide."*
* **Curriculum Rotation & Engine Mechanics:**
  * Pre-compiled in a lightweight local JSON table (`assets/data/exam_trends.json`, <25 KB).
  * 45-day non-repeating calendar managed by Android `WorkManager` with graceful rotation.
  * **Retention & Confidence Driver:** Overcomes candidate procrastination by systematically reinforcing the top 20% of syllabus topics that account for >70% of exam marks, completely offline.

---

## 6. Monetization & Referral Architecture

### 6.1 Pricing & SKU Matrix (Transparent Multi-Tier Anchor Model)

To eliminate any ambiguity and strictly comply with India's Consumer Protection (E-Commerce) Rules regarding deceptive discounting, all promotional discounts are explicitly anchored against the unbundled base individual price:

| Product | Base Total (Individual) | Standard In-App Bundle (10% Off) | Referral Pass (25% Off Base) | Total Savings | Referrer Reward | Net Bank Payout (Approx)† |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Paper 1 Pass** (D.El.Ed Track) | ₹999 | ₹999 | **₹749** | Saves ₹250 (25%) | ₹0 (Altruistic Peer Gift) | ~ ₹637 |
| **Paper 2 Pass** (B.Ed Track) | ₹999 | ₹999 | **₹749** | Saves ₹250 (25%) | ₹0 (Altruistic Peer Gift) | ~ ₹637 |
| **All-in-One Combo Pass** (Both) | ₹1,998 | **₹1,799** *(Saves ₹199)* | **₹1,499** | Saves ₹499 (25%) | ₹0 (Altruistic Peer Gift) | ~ ₹1,274 |

† *"Net Bank Payout" reflects Google Play's 15% Tier-1 reduced service fee (first $1M USD annual revenue under the Google Play developer program). Because referral cash payouts, third-party payout fees, and TDS liabilities are completely eliminated, your net take-home per referred user (~₹637 on Single / ~₹1,274 on Combo) protects margins while delivering massive direct savings (₹250 to ₹499) to candidates.*

#### Mathematical Derivation & Legal Transparency:
* **The 25% Mathematical Reality:** ₹1,499 represents a true **25% discount off the unbundled base sum** of both individual passes ($₹999 + ₹999 = ₹1,998 \times 0.75 = ₹1,498.5 \approx ₹1,499$).
* **Standard In-App Bundle:** ₹1,799 represents a standalone **10% bundle saving** ($₹1,998 - ₹199 \approx 10\%$).
* **Anti-Deception Safeguard:** By publishing the ₹1,998 unbundled base in the pricing schedule and paywall interface, the claim of "Saves ₹499 / 25%" is legally watertight, transparent, and completely protected against consumer pricing dispute challenges.
* **Freemium Teaser:** 1 full exam-format paper (originally authored per Section 3.3, styled on a real past cycle's pattern) + 2 study guides (Piaget Stages) are permanently free to build user trust. Remaining papers, full bank, and complete audio masterclasses require the paid unlock.
* **Google Play In-App Billing:** Two SKUs per product (`standard` vs. `referred_25`) configured in Google Play Console. The app automatically chooses the `referred_25` SKU (₹749 single / ₹1,499 combo) if a valid referral attribution is detected (via Google Play Install Referrer or manual promo code entry).

### 6.2 Altruistic Peer & Promotional Referral Engine ("Gift 25% Off")

The referral engine is designed as an altruistic gifting mechanism that empowers both aspirants and supportive non-aspirants:

1. **Inclusive Gifting by Aspirants & Non-Aspirants (Husbands, Family, Mentors):**
   * Over 65%–70% of CTET candidates are women, often supported by spouses or family members who search for materials and sponsor purchases.
   * **Free-Tier Unlocked:** Personal referral links are generated upon **1-tap Google Sign-In** on the Free Tier—no paid purchase is required. A husband or friend can install EasyCTET, verify its quality, and immediately tap *"Gift 25% Discount to an Aspirant"*.
2. **Universal Campaign Attribution:**
   * The app inspects the Google Play Install Referrer API on first launch. It unlocks the 25% discount tier across all acquisition channels:
     * **Peer & Family Sharing:** `https://play.google.com/store/apps/details?id=com.easyctet&referrer=code%3DRAHUL25`
     * **Static Website CTA:** `https://play.google.com/store/apps/details?id=com.easyctet&referrer=code%3DWEB25`
     * **YouTube Shorts:** `https://play.google.com/store/apps/details?id=com.easyctet&referrer=code%3DSHORTS25`
     * **Instagram Reels:** `https://play.google.com/store/apps/details?id=com.easyctet&referrer=code%3DREELS25`
   * **In-App Manual Input Fallback:** If a candidate downloads the app directly without an install referrer link and subsequently receives a code from an educator or peer, they can enter it directly on the paywall screen to claim the 25% discount.
3. **Pre-Filled WhatsApp Share Copy (Dignified Academic Tone):**
   > *"Colleague, I am preparing for CTET using the EasyCTET suite. You can use my code ANITA25 to receive a 25% academic discount on the complete paper passes: https://play.google.com/store/apps/details?id=com.easyctet&referrer=code%3DANITA25"*
4. **Clean Architectural Footprint:**
   * Zero cash payouts, zero in-app wallets, zero 48-hour fraud hold periods, and zero banking/UPI forms.
   * Highly shareable in B.Ed/D.El.Ed college batches and coaching WhatsApp groups because the sharer appears helpful rather than commercially incentivized.

### 6.3 Legal, Tax & Regulatory Compliance

#### 6.3.1 Tax & Developer Registration
* **Zero Outbound TDS Liabilities (Sec 194H / 194R):** Because the app distributes zero cash commissions or perquisites, there is no TDS withholding requirement, no mandatory PAN collection from users, and no Form 26AS reporting overhead.
* **GST Classification (E-Commerce Operator Nuance):** While standard services carry a ₹20 Lakhs turnover threshold, Section 24(ix) of the CGST Act addresses supplies through e-commerce operators (Google Play). The exact developer tax classification, deemed supplier treatment, and GST registration requirements will be verified in consultation with an individual-developer Chartered Accountant prior to commercial release.
* **Developer Registration:** Registered on Google Play as an Individual Developer using PAN card and Indian bank account (Google disbursements via NEFT/Wire transfers on the 15th of every month).

#### 6.3.2 Google Play Government Impersonation Policy & Mandatory Disclaimers
Under Google Play's *Impersonation Policy* and *Government Apps Guidelines*, apps referencing public examinations (CTET) must proactively dispel any assumption of official government affiliation:
1. **Mandatory Prominent Disclaimer Text:** Must be prominently placed in the first 3 lines of the Google Play Store description, on the login/splash screen, and under `Settings > About`:
   > *"Disclaimer: EasyCTET is an independent educational prep app developed by [Developer/Entity Name]. It is NOT affiliated with, endorsed by, or associated with the Central Board of Secondary Education (CBSE), the National Council for Teacher Education (NCTE), or any Government authority. Official exam notices, eligibility criteria, and syllabus are available at the official portal: ctet.nic.in."*
2. **Graphic Asset Restrictions:** App icons, store feature graphics, and in-app banners must **never** include national emblems (Ashoka Stambh), government seals, the Indian flag, or CBSE logos.
3. **Authoritative Source Citation:** The app must provide an active link to `ctet.nic.in` for candidates to cross-verify official exam dates and guidelines.

#### 6.3.3 Indian Data Protection (DPDPA 2023) & Consumer Protection
* **Bilingual Consent & Privacy Notice:** Under the Digital Personal Data Protection Act (DPDPA 2023), the Google Sign-In interface links to a clear, bilingual (English/Hindi) Privacy Policy hosted at `easyctet.com/privacy`.
* **Zero Cloud Data Storage of Performance:** Test scores, bookmarks, and mistake audits are strictly kept on the user's phone, completely eliminating risk of data breaches.
* **Statutory Grievance Redressal:** In compliance with Indian IT Rules (2021) and Consumer Protection (E-Commerce) Rules, a designated **Grievance Officer** with an official contact email (`grievance@easyctet.com`) is published within the app and website.
* **Digital Goods Refund Disclosure:** In-app purchases unlock digital study access immediately. The purchase confirmation screen clearly discloses: *"Purchases are billed through Google Play In-App Billing and are subject to Google Play’s standard 48-hour refund policy."*

### 6.4 Referral Mechanism — Compliance Resolution (Resolved by Design)

The open risk areas previously identified under Section 6.4 have been **fully resolved through architectural redesign**:

1. **Google Play Policy Compliance:** By eliminating cash-out triggers and real-money rewards from the Install Referrer flow, the app avoids classification as an "incentivized install" or unauthorized affiliate network. Standard promotional discounts on In-App Billing SKUs are 100% compliant with Google Play Developer Policies.
2. **Tax & Gateway Compliance:** Removing cash disbursements eliminates the need for CA tax consultations, Section 194H/194R TDS tracking, and third-party payout gateway KYC (RazorpayX/Cashfree).

The referral architecture is now finalized, production-ready, and zero-risk.

---

## 7. Operations, Maintenance (O&M) & Security

### 7.1 Content Versioning & Hermetic App Updates (Replaces OTA Manifests)
* **Hermetic Bundling (Zero-Server Downtime):** All question JSON datasets, explanations, and study guides are hermetically bundled directly inside the Android App Bundle (`assets/data/`). There are **no remote Over-The-Air (OTA) JSON manifests**, no background download daemons, and no external CDN sync dependencies. This guarantees that candidates in remote or low-connectivity environments never face partially downloaded questions or network parsing crashes.
* **Atomic Google Play Delta Updates:** When curriculum errata, question expansions, or pedagogical refinements are published, they are released as a standard Google Play Store App Update (`.aab`). Google Play automatically calculates and delivers an **optimized binary delta patch** (typically only 1 MB – 2 MB download for the user), ensuring updates are atomic, robust, and completely managed by Google Play's infrastructure.
* **Schema-Version Safety:** Each subject JSON file retains a `schemaVersion` tag (e.g., `"2.0"`). If the app's rendering components undergo structural refactoring, the local parser checks `schemaVersion` upon opening and cleanly maps older schema shapes without throwing unhandled exceptions.

### 7.2 Anti-Piracy, Intellectual Property & Content Protection

To guarantee that candidates and competitors cannot extract, decompile, or redistribute the proprietary question banks, pedagogical explanations, and conceptual study guides, EasyCTET implements a **five-layer defense-in-depth architecture**:

1. **Pre-Release Asset Encryption & Packaging (AES-256-GCM):**
   * Raw JSON questions (`assets/data/*.json`) and Markdown study guides (`assets/guides/*.md`) are **never bundled as unencrypted plain text** in the production APK/AAB.
   * During the build pipeline, a pre-compilation script encrypts all content files using **AES-256-GCM** into scrambled binary blobs (e.g., `assets/data/p1_vault.bin`).
   * **Realistic Security Model (Reverse-Engineering Deterrence):** Because client-side decryption keys reside within compiled code, asset encryption serves as a powerful deterrent that raises reverse-engineering costs far beyond ordinary attacker motivation.
   * **In-Memory-Only Decryption:** The native C++ Hermes runtime decrypts active quiz sets strictly within RAM upon user request. Decrypted plain-text files are **never written to disk or the filesystem cache**.

2. **Hermes Engine Bytecode Compilation:**
   * React Native JavaScript logic and bundled data parsing routines are compiled into **Hermes Bytecode (`.hbc`)** during production build.
   * Unlike standard JavaScript, Hermes bytecode strips human-readable source structures and requires specialized disassembly tools, significantly raising the barrier against casual inspection.

3. **Android Native Code & Symbol Obfuscation (R8 / ProGuard):**
   * Production builds enforce Android's **R8 compiler with aggressive symbol shrinking and obfuscation**.
   * Class names, field variables, and native methods are renamed to non-semantic short identifiers (e.g., `a.b.c()`), stripping reverse-engineering metadata.

4. **Selective Screen Capture Protection (`FLAG_SECURE`):**
   * **Active Quiz Screens (Strict Enforcement):** Android `FLAG_SECURE` is strictly enabled during live timed quiz sessions and active question views to prevent test-bank leaks and screen-recording tools.
   * **Scorecards & Explanation Cards (Explicitly Lifted for Viral Sharing):** `FLAG_SECURE` is intentionally lifted on test completion screens, performance scorecards, and pedagogical explanation cards. This enables candidates to take screenshots of their achievements and share them directly to WhatsApp study groups and social channels with the embedded brand watermark and referral code (`ANITA25`), driving viral peer acquisition.
   * **Accessibility Mitigation:** To prevent excluding visually impaired candidates using TalkBack, the native layer queries `AccessibilityManager.isTouchExplorationEnabled()`. If screen-reading services are active, `FLAG_SECURE` is dynamically lifted for accessibility compatibility while remaining strictly enforced for standard sessions.

5. **Google Play Integrity API Enforcement:**
   * The application integrates the **Google Play Integrity API** to verify that the app is running on a certified, genuine Android device and was installed through legitimate Google Play channels.
   * Sideloaded, tampered, or repackaged "cracked" APKs distributed via third-party Telegram or web channels fail the cryptographic integrity check and are refused runtime execution.

6. **Audio Content Strategy (Branded Watermarking):**
   * Rather than attempting brittle and battery-intensive DRM on open audio files, masterclasses utilize the **branded watermark strategy**. Audio files carry professional intro/outro branding directing listeners to the app with promo code `AUDIO25`, converting external peer sharing into organic viral user acquisition.

### 7.3 Google Play Multi-Device Account Entitlement
* In alignment with standard Google Play In-App Billing architecture, entitlements are account-scoped.
* A candidate who purchases a pass and signs into their licensed Google account on a secondary device (e.g., a tablet) can seamlessly tap **"Restore Purchases"** to unlock their content via `queryPurchasesAsync` with zero session collisions, device locks, or remote server dependencies.

### 7.4 Question Dispute & Editorial Feedback Channel
* Candidates can tap *"Report Question / Flag Typo"* directly on any question card.
* Because the app operates without external telemetry servers, dispute reports trigger an Android native Intent to launch the user's preferred email client pre-populated with diagnostic metadata (Question ID, Subject, Language, App Version) addressed to `editorial@easyctet.com`.
* The editorial team reviews flagged items during scheduled content releases and bundles corrections into the next atomic Play Store update.

### 7.5 True Zero-Telemetry Architecture & Local Error Tracing
* **Zero Remote Telemetry SDKs:** To guarantee that the application's "100% Private, Zero Telemetry" brand promise remains legally and technically watertight, EasyCTET **embeds zero external telemetry or crash-reporting SDKs** (Firebase Crashlytics, Google Analytics, or third-party tracking daemons eliminated).
* **Google Play Data Safety Compliance:** This allows the app's mandatory Google Play Data Safety declaration to truthfully state: **"No user data collected or shared"**, avoiding regulatory non-compliance risks under India's DPDP Act 2023.
* **Hermetic Local Tracing:** Error detection and troubleshooting rely entirely on our on-device **Deterministic Error ID Registry** (§7.7), candidate-initiated **Diagnostic Email Intents** (§7.4), and the **Hidden On-Device O&M Menu** (§7.9).

### 7.6 Android Runtime Permissions & Scoped Storage Compliance
* **Notification Permission (`POST_NOTIFICATIONS`):** In Android 13+ (API 33+), push and local notifications require explicit user opt-in. EasyCTET requests this permission **contextually** (e.g., after the candidate completes their first diagnostic quiz) accompanied by an in-app rationale modal (*"Turn on daily reminders to receive your 9:00 AM CTET Question of the Day"*), avoiding immediate user refusal on cold launch.
* **Scoped Storage Safeguard:** Standalone masterclass MP3 downloads are routed through Android's native `DownloadManager` directly into `Downloads/EasyCTET/`. This requires **zero broad storage permissions** (`WRITE_EXTERNAL_STORAGE` or `READ_EXTERNAL_STORAGE`), ensuring the app passes automated Google Play security and malware audits without permission rejections.

### 7.7 Deterministic Error ID Registry (`{Layer}-{Category}-{Sequence}`)

To eliminate ambiguous crashes, streamline troubleshooting for a solo developer, and ensure instant root-cause identification without combing through thousands of raw log lines, EasyCTET implements a deterministic Error ID Registry at the exact point of failure:

* **Format:** `{Layer}-{Category}-{Sequence}`
* **Layer 1: Storage, Cryptography & Database (Core Engine)**
  * `L1-VAULT-001`: Question vault AES-256-GCM decryption failure in memory (build key mismatch or corrupted asset blob).
  * `L1-DATA-002`: Schema violation or missing mandatory field (`id`, `correctAnswer`, `options`) in active question JSON.
  * `L1-DB-003`: SQLite mistake ledger query execution or migration schema mismatch.
  * `L1-MMKV-004`: Local MMKV storage initialization or persistence write failure.
* **Layer 2: Audio, Reading & Pedagogical Experience**
  * `L2-TTS-001`: Android native `TextToSpeech` engine initialization failure or missing locale voice pack.
  * `L2-TTS-002`: SSML chunk syntax parsing exception or unhandled markdown token.
  * `L2-MD-003`: Markdown study guide parsing or syntax rendering exception.
* **Layer 3: Commerce, Attribution & Lifecycle**
  * `L3-BILL-001`: Google Play In-App Billing signature cryptographic verification failed.
  * `L3-ATTRIB-002`: Google Play Install Referrer API timeout or malformed campaign promo tag.
  * `L3-AUTH-003`: Google Sign-In token deserialization or device-UUID binding collision.

Whenever any exception occurs in the client, a non-intrusive error tag (e.g., `Error: L2-TTS-001`) is displayed at the bottom of the error card, giving the candidate an exact reference code to quote.

### 7.8 Dual-Prompt Debug Manual (`docs/debug_manual.json`)

To enable instant, AI-assisted debugging without re-diagnosing recurring failure patterns from scratch, the repository maintains an authoritative `docs/debug_manual.json`. Every Error ID features a dual-prompt template:

```json
{
  "error_id": "L1-VAULT-001",
  "for_you": "Decryption of the question vault failed in RAM. Usually caused by a mismatched build key or corrupted assets. Blocks quiz launch.",
  "for_ide": "Error L1-VAULT-001 fired in vaultDecryptor.ts. Check why AES-256 decryption failed for the active subject payload. Verify whether the build key matches the encryption script. Report root cause before proposing a fix."
}
```

* **`for_you` (Educator/Solo-Dev Read):** Plain-language explanation covering severity, impact on candidate practice, and whether the issue is a blocking defect.
* **`for_ide` (AI Assistant Prompt):** A ready-to-paste technical instruction for an AI coding assistant (Antigravity/Cursor) specifying the exact file, function, and mandatory protocol: *"Report root cause before proposing a fix"*.

### 7.9 Hidden On-Device Developer O&M Diagnostics Screen

To diagnose devices in production without requiring an IDE, ADB, or desktop connection:
* **Activation:** Tapping the App Version number 5 times under `Settings > About` unlocks the hidden **"Developer Diagnostics & O&M"** screen.
* **On-Device Diagnostic Utilities:**
  * **Vault Integrity Check:** Decrypts all bundled subject JSON payloads in RAM and reports 100% data pass or specific corrupted question IDs.
  * **Database & Memory Status:** Displays SQLite mistake ledger row counts, MMKV active key count, and total storage footprint.
  * **TTS Sound & Voice Pack Test:** Runs a 2-second audio check for English (`en-IN`), Hindi (`hi-IN`), and Marathi (`mr-IN`) native voice engines.
  * **License & Entitlement State:** Displays active device UUID, cryptographic purchase signature, and offline license validity.
  * **Self-Healing Reset Buttons:** "Re-index Mistake Ledger", "Clear Transient Cache", and "Re-verify Local License".

### 7.10 Solo-Developer Master Governance Rules

Adapted from proven solo-operator production architectures:
1. **Deterministic-First, AI-Last:** CTET official answer keys, scoring criteria, and test logic are absolute and deterministic. Generative or auxiliary AI layers never override canonical scoring.
2. **The Reuse Decision Framework:** Before authoring new modules: *Reuse existing modules $\to$ Configure via settings/JSON $\to$ Extend $\to$ Build New only as a last resort.*
3. **DPDP Act Compliance by Design:** Zero candidate performance telemetry, zero user test answer collection on external servers, and zero cloud databases. Candidate data remains strictly sandboxed on their personal device.

### 7.11 Hardware Compatibility, Risk Mitigation & Solo-Developer Support Policy

To eliminate candidate dissatisfaction, prevent refund disputes, and protect the solo developer's operational overhead, the system enforces a multi-tier risk mitigation framework:

#### 7.11.1 Automated Incompatible Device Filtering (`minSdkVersion: 24`, `targetSdkVersion: 36`)
* The application specifies `minSdkVersion = 24` (Android 7.0 Nougat, covering >97% of active Android devices in India) and `targetSdkVersion = 36` (Android 16, strictly complying with Google Play's August 31, 2026 new app submission mandate).
* **Automated Play Store Gating:** Google Play automatically hides EasyCTET from search results on older, unsupported devices. Incompatible devices are barred from downloading or paying.

#### 7.11.2 Freemium "Try-Before-You-Buy" Compatibility Validation
* **Zero Upfront Cost:** Candidates download and explore the app for free.
* **100% Engine Parity:** The free tier provides 1 full exam simulation paper + 2 study guides + on-device TTS audio. If the app functions smoothly for the free test, it is technically guaranteed to work for all remaining paid papers, as all tests utilize the identical local engine.

#### 7.11.3 Pre-Purchase Hardware Pre-Flight Check
* Immediately before rendering the Google Play In-App Billing payment modal, the app executes a 0.2-second silent diagnostic:
  * Verifies Android internal storage write accessibility.
  * Verifies TTS engine availability and audio channel output.
  * Verifies device memory headroom.
* If a budget device is critically low on disk storage, the app alerts the user with an actionable prompt (*"Please free up 50 MB on your device before completing purchase"*) prior to payment processing.

#### 7.11.4 Plan A: In-App Self-Healing & Rapid Resolution
* **The 1-Tap "Quick Repair" Button (`Settings > Help`):** Flushes stale application cache and re-indexes the SQLite database in under 1 second. Resolves >95% of device-specific memory bottlenecks on budget hardware without requiring app reinstallation.
* **Deterministic Error IDs:** All edge-case failures surface a clean error tag (e.g., `L2-TTS-001`), allowing the candidate to quote the exact code in support communications.
* **User-Initiated 1-Tap Diagnostic Share (`Settings > Help > Report Issue`):** To uphold the True Zero-Telemetry guarantee (no background tracking SDKs), unhandled exceptions never broadcast silent crash data. Instead, the candidate can tap "Report Issue", which generates a pre-populated diagnostic email draft addressed to support containing the Deterministic Error ID, sanitized local state, device model, and Android OS version. The candidate explicitly reviews and transmits this via their own email client or WhatsApp.

#### 7.11.5 Plan B: The "Delight & Keep" Master PDF Fulfillment Policy
* **Emergency Learning Guarantee:** To protect candidate preparation during edge-case hardware incompatibilities, the developer maintains a comprehensive, branded **EasyCTET Master Study Pack (PDF)** containing all syllabus guides and question banks.
* **Proactive De-escalation:** If an aspirant encounters persistent issues on an obscure hardware model, the developer provides the complete PDF collection via email/WhatsApp (*"Yours to keep permanently"*), transforming frustration into goodwill.

#### 7.11.6 Zero-Paperwork 1-Click Google Play Refunds
* In instances where a candidate insists on a monetary refund:
  * The solo developer executes the refund with **1 click directly in Google Play Console** (Orders > Order Details > Refund).
  * Google automatically returns funds to the candidate's original payment method (UPI / Debit Card / Net Banking) within 24–48 hours.
  * Completely eliminates manual bank transfers, UPI payment requests, chargeback penalties, and accounting reconciliations.

---

## 8. Implementation & Delivery Roadmap

```
Phase 0: Legal, Compliance & Groundwork (De-risked)
  ├── 0.1 Finalize and circulate the Content Origination Policy (Section 3.3) to all question-writers
  ├── 0.2 Draft bilingual Privacy Policy, Terms of Service, and Grievance Officer details (Section 6.3.3)
  ├── 0.3 Embed mandatory Government Impersonation Disclaimer across app and store assets (Section 6.3.2)
  └── 0.4 Verify Google Play Developer Console merchant account and 15% Tier-1 reduced service fee enrollment

Phase 1: Content & Data Preparation
  ├── 1.1 Author original English, Hindi, and Marathi Question JSON files for Paper 1 & 2
  │        (concept-brief workflow per Section 3.3 — no verbatim/near-verbatim sourcing)
  ├── 1.2 Structure Study Guides & record branded Masterclass MP3 files with promo audio tags
  ├── 1.3 Validate question keys and compile empirical 5-cycle trend matrix (assets/data/exam_trends.json from verbatim-question-txt/)
  └── 1.4 Run pre-publish similarity checks on the full question bank (Section 3.3)

Phase 2: Mobile Engine Assembly (React Native & Expo)
  ├── 2.1 Setup Expo React Native project with Hermes, Zustand state management, EAS development client, and USB physical device development flow
  ├── 2.2 Implement Font Subsetting strategy (Noto Sans Devanagari U+0900–U+097F) to lock <15 MB bundle budget
  ├── 2.3 Implement Hermetic Question Engine with pre-release AES-256 asset encryption, R8 obfuscation, and local SQLite mistake ledger
  ├── 2.4 Implement Markdown Study Guide Reader with app-wide Dark Theme, On-Device Native TTS companion (SSML pacing, phonetic normalizer, chunk-based MMKV resume), and selective FLAG_SECURE exemption (scorecards and explanations exempt)
  ├── 2.5 Integrate Google Play In-App Billing account entitlement (multi-device family/personal access per Google ID) & offline cryptographic signature verification (Section 4)
  ├── 2.6 Implement 100% offline Empirical High-Probability Notification Engine via Android WorkManager (@notifee) (Section 5.4)
  └── 2.7 Implement standalone MP3 DownloadManager flow to Downloads/EasyCTET/ (Section 5.3)

Phase 3: Payments, Referrals & Web Presence
  ├── 3.1 Configure Google Play In-App Billing SKUs (Standard: ₹999 / ₹1,799; Referred 25%: ₹749 / ₹1,499)
  ├── 3.2 Implement Google Play Install Referrer API attribution + in-app manual promo code fallback field (SHORTS25 / WEB25)
  └── 3.3 Deploy static promo website on Cloudflare Pages with free Masterclass MP3 download and Web25 CTA

Phase 4: Testing, Verification & Play Store Release
  ├── 4.1 Internal testing track on physical Android devices via USB connection (<15 MB bundle size verification)
  ├── 4.2 Validate offline mode, local daily notifications, and referral auto-attribution
  ├── 4.3 Verify in-app Local Data Reset flow (Settings > Data & Privacy > Reset Local Progress) (Section 4.1)
  └── 4.4 Cloud compilation via Expo EAS Build (targetSdkVersion 36) & production upload to Google Play Store with truthful "No data collected" Data Safety declaration
```
