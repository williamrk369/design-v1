# upgrade: landing page wireframe brief

**Product:** upgrade, a program that teaches students full-stack AI development
**Primary goal:** sales (enrolments)
**Tone:** bold
**Brand colors:** none yet. This brief uses the `DESIGN.md` tokens: Pine `#123B2E` as the dominant color and Signal `#FF5B1F` as the accent. If upgrade gets its own palette, only those two tokens change.
**Rules:** everything below follows `DESIGN.md`:
- Fonts: Fraunces, Manrope and JetBrains Mono.
- Type scale: 16 / 48 / 144px, at weights 200 and 800.
- Spacing: an 8px grid.
- Banned: three cards in a row, centered heroes and soft shadows.

**Heights** are for a 1440 × 900 desktop viewport. They're approximate and land on the 8px grid.

---

## Content you must supply before launch

Placeholders are shown in `[brackets]`. **Do not ship any of them with made-up values.** Invented stats, testimonials or logos hurt a sales page more than leaving them out, and students check.

| Placeholder | Source |
|---|---|
| `[N weeks]`, `[cohort date]`, `[seats]` | Your real schedule and cohort size |
| `[price]`, `[installment]`, `[refund days]` | Your real pricing and refund policy |
| Outcome stats | Your own student data, with the date range stated |
| Testimonials | Real students who gave written consent, with a link to their project |
| Logos | Only with permission. "Students from X" needs real students from X |
| Project screenshots | Real apps built in the course |

---

## 0. Nav (sticky, 64px)

- **Layout:** logo on the left, 3 anchor links (Curriculum, Results, Pricing) and a Signal CTA "Enroll" on the right. After the first 900px of scrolling it turns into a solid paper bar with a 1px rule underneath.
- **Principle:** *a persistent path to conversion.* The buy button is always one click away and never covers the content.

---

## 1. Hero

**Layout:** left-aligned on a 12-column grid. Text takes columns 1–7. The visual takes columns 8–12 and **bleeds off the right edge**. Never centered.
**Height:** about 880px (fills the first screen, with the proof bar peeking in at the bottom).
**Background:** paper. The only Signal element on this screen is the CTA.

### Headline formula
> **[Hard verb] + [concrete thing they'll have] + [the alternative they're tired of].**
> At most 6 words at 144px, so it sits in 2–3 lines.

Options to test:
- **"Ship real AI apps. Not tutorials."**
- "Stop watching. Start shipping AI."
- "Build it. Deploy it. Get hired." *(only if you can back up the hiring claim)*

Set it in Fraunces at 144px, weight 200, with the closing phrase at weight 800. The jump between the two weights is where the boldness comes from.

### Subheadline formula
> **For [who] + you'll build [specific deliverable] + [format and time] + [differentiator].**

> "A [N]-week, project-first program for students. You'll build and deploy [N] full-stack AI apps (frontend, backend, LLMs, production), and a mentor reviews every pull request."

16px Manrope, at most 65 characters per line, ink-muted.

### CTA placement
1. **Primary:** a Signal button 64px tall, directly under the subhead and left-aligned to the headline. Label: **"Enroll in the [Month] cohort"**. Name the cohort; avoid "Get started".
2. **Secondary:** a text link next to it, "See what you'll build ↓", which jumps to the features.
3. **Below the buttons:** a 12px mono line reading `NEXT COHORT [DATE] · [SEATS] SEATS · [REFUND DAYS]-DAY REFUND`. That puts urgency and risk reversal right beside the button.

### Hero image direction
- **Show the result, not the student.** Use a large, cropped browser window showing a **real app built in the course**, such as a chat-with-your-docs tool, with its live URL visible in the address bar.
- Overlap a small terminal panel in the lower left of the image with the last lines of a deploy: `git push` → `✓ deployed to https://…`. That one image proves the promise: you'll ship.
- **Banned:** stock photos of smiling students, glowing brains, robots, purple or indigo "AI" gradients, and floating 3D blobs.
- **Mobile:** the image goes under the CTA, cropped to the app's top half. The headline drops to 96px.

**Content hierarchy:**
1. Headline
2. CTA
3. Subheadline
4. Cohort and refund line
5. Image
6. Secondary link

**Principle:** *visual hierarchy through scale contrast.* A 144px headline against 16px body makes the promise unmissable in the first 3 seconds.

---

## 2. Social proof bar

**Layout:** a full-width paper band, left-aligned, split 4 / 8:
- **Left (columns 1–4):** a 12px mono label, "RESULTS SO FAR".
- **Right (columns 5–12):** 3–4 stats in one row, **separated by space, not boxed into cards**.

**Height:** 128px, with the top 32–48px visible on the first screen so people scroll.

### What kind of proof, in order of credibility
1. **Outcome stats from your own data**, for example:
   - `[N] apps deployed by students`
   - `[median] days to first deploy`
   - `[N]% finished the program`

   Each one is a 48px Fraunces numeral at weight 800 with a 12px mono label.
2. **Verifiable public numbers:** GitHub stars on the course repo, or members in the student community.
3. **Logos**, only with permission: "Students from [universities]" or "Alumni now at [companies]". Shown as a single-color ink row at 50% opacity, at most 5 logos.

**Before launch, with no data yet:** use instructor proof ("Taught by engineers who shipped [real product] at [company]") and a link to the public project showcase. Leave fake numbers out.

**Content hierarchy:**
1. The numbers
2. Their labels
3. The logos, if any

**Principle:** *proof right after the claim.* The hero makes a promise, and the next thing the eye lands on backs it up.

---

## 3. Problem → solution

**Layout:** a two-band structure built on Problem → Agitate → Solve.
- **Problem band:** a full-bleed **Pine** background with paper text.
  - **Left (columns 1–7):** one large pain statement in Fraunces at 48px, weight 800.
  - **Right (columns 8–12):** 3 numbered pains as a stacked list, not cards.
- **Solution band:** back on paper. It's left-aligned and mirrors the pains one for one.

**Height:** about 960px in total (Problem about 480px, Solution about 480px).

### Structure
**Problem (Pine band)**
- Statement: *"You've finished [40] hours of tutorials. You still can't ship an app."*
- Pains, numbered `01–03` in mono:
  1. Tutorials stop at "hello world", so you've never deployed anything real.
  2. AI moves weekly, and courses from 6 months ago are already out of date.
  3. Nobody reviews your code, so you don't know what you don't know.

**Solution (paper band)**
- Statement: *"upgrade is built the other way round: projects first, production first."*
- Answers, using the same `01–03` numbers so each one visibly resolves a pain:
  1. Every module ends with a deployed app on a public URL.
  2. The curriculum is updated each cohort: `[last updated date]`.
  3. A mentor reviews every pull request.
- At the end, a ghost CTA: "See the 4 apps you'll ship ↓".

**Content hierarchy:**
1. The pain statement
2. The numbered pains
3. The solution statement
4. The matching answers

**Principle:** *contrast creates tension, and the match resolves it.* The jump from dark to light and the repeated `01–03` numbers make each problem→fix pair obvious without needing arrows.

---

## 4. Feature showcase: alternating rows

**Recommendation: alternating rows**, one row per project students build, in order.

| Option | Verdict |
|---|---|
| **Grid** | ✗ It turns 4 projects into same-looking tiles. A 3-up grid breaks the `DESIGN.md` ban on three cards in a row, and it hides that the program is a *progression*. |
| **Tabs** | ✗ It hides 75% of the value behind clicks. Most visitors never open the other tabs, and search engines give hidden content less weight. |
| **Alternating rows** ✓ | Every project gets a full screenshot plus its explanation. Switching sides keeps the scroll lively, and the numbering `01 → 04` shows a beginner-to-production journey. That sequence is the product. |

**Layout:** a section intro on the left, then 4 rows.
- **Odd rows:** image in columns 6–12, text in columns 1–5.
- **Even rows:** mirrored.

**Height:** about 2,400px in total (an intro of about 160px, plus 4 rows × about 560px).

**Each row, top to bottom:**
1. The project number `01` in **Fraunces at 144px, weight 200**, in ink-muted. This is the one 144px moment after the hero.
2. The project title, 48px at weight 800.
3. 2 lines of 16px body text on what it does and what you learn.
4. Stack chips: 12px mono badges, for example `NEXT.JS`, `POSTGRES`, `AI SDK`, `VERCEL`.
5. A screenshot of the real finished app.

**Example sequence:** these are placeholders, so replace them with your real curriculum.
- `01` Your first AI feature: a chat UI with streaming responses
- `02` Chat with your docs: retrieval-augmented generation (RAG) over your own files
- `03` An agent that uses tools: tool calling and background jobs
- `04` A full SaaS app: authentication, payments, AI features, deployed and monitored

**Mobile:** rows stack in this order: number, title, image, body, chips. The image stays above the body so the proof comes before the explanation.

**Principle:** *rhythm through repetition with variation.* The same structure each row makes it easy to scan, the alternating sides stop it feeling monotonous, and the numbers carry the story.

---

## 5. Testimonials

**Format:** **one featured video** plus **2 text testimonials**, laid out asymmetrically. **No carousel**: carousels hide most of their content and few people click through them.

**Layout:**
- **Left (columns 1–7):** the featured video, 16:9, with a poster frame that shows the student's *deployed app*. Overlay a 48px pull quote at weight 200. Under it, the student's name, school, and a 12px mono line for **before → after** (for example, `CS SOPHOMORE → SWE INTERN @ [COMPANY]`).
- **Right (columns 8–12):** two text testimonials stacked, separated by space and a single rule. No cards and no star ratings.
- **Below:** a text link, "Read [N] more student stories →".

**Height:** about 880px.

### What makes them credible (all required)
1. **Full name and a real photo.** No initials, no stock headshots.
2. **A specific, measurable change:** "deployed 4 apps in 10 weeks" rather than "great course!"
3. **Before → after context:** year of study, prior experience, and what happened next.
4. **A link to what they built:** a live URL or GitHub repo. This is the strongest single signal.
5. **A small admitted downside:** "The RAG module was brutal, but…". A little friction reads as honest.
6. **Written consent on file**, with the date the quote was given.

**Content hierarchy:**
1. The video and its pull quote
2. The before→after line
3. The text quotes
4. The project links

**Principle:** *specificity is credibility.* Concrete numbers and links people can check do more than any amount of praise.

---

## 6. Pricing and final CTA

**Layout:** a split section on a full-bleed Pine background.
- **Left (columns 1–7), paper text:**
  - Heading: "Everything you need to ship." 48px, weight 800.
  - What's included as a two-column list (mentor reviews, [N] projects, community, lifetime access to updates, certificate).
  - The refund guarantee in its own block, headed by a 12px mono label `RISK-FREE`.
- **Right (columns 8–12):** a **paper price panel**, the only boxed element on the page, with the one hard `shadow-float` shadow. It **stays in view while the left column scrolls** on desktop.

**One plan, not three tiers.** Three tiers would be three cards in a row, and choice overload hurts conversion for a single product. Instead, give two **payment options** inside the one panel:
- **Pay in full:** `[price]`. Show any saving here.
- **Pay monthly:** `[installment] × [n]`.
- A student-discount line, if you offer one, verified with a .edu email.

**Height:** about 880px.

### Price panel, top to bottom
1. `[Month] COHORT · STARTS [DATE]` in 12px mono
2. The price at 48px, weight 800, with a toggle between "Full" and "Monthly"
3. A Signal CTA 64px tall: **"Claim my seat"**
4. `[SEATS LEFT] OF [TOTAL] SEATS LEFT` with a thin progress bar
5. `[REFUND DAYS]-DAY FULL REFUND · NO QUESTIONS`

### Urgency mechanics (all must be true)
- **Real cohort start date and real seat cap.** A fixed cohort size is a genuine constraint, so say it.
- **An early-bird deadline**, if you run one: "Price goes to `[price]` on `[date]`". Show the date, not a countdown that resets on reload.
- **Banned:** fake countdown timers, fake "3 people are viewing this" pop-ups, and seat counts that never change. Students talk to each other, and getting caught kills trust.
- Pair every bit of urgency with **risk reversal** (the refund line) so pressure doesn't turn into anxiety.

**Content hierarchy:**
1. Price
2. CTA
3. Seats and date
4. Guarantee
5. What's included

**Principle:** *reduce risk at the moment of decision.* The guarantee sits right beside the price, where hesitation is highest.

---

## 7. FAQ: handling objections

**Layout:** split 5 / 7.
- **Left (columns 1–5):** the heading "Questions before you commit." at 48px, weight 800. It stays in view as you scroll, with a link under it: "Still unsure? Talk to an instructor →".
- **Right (columns 6–12):** a shadcn Accordion. Rows are 64px tall when collapsed, separated by 1px rules, with only one open at a time.

**Height:** about 720px with everything collapsed.

### The 5 questions, ordered by how often they stop a sale

1. **"I've barely coded. Is this too advanced for me?"**
   State the actual prerequisite. Link to a free **readiness check** or a prep module. Say who it's *not* for, which builds trust.
2. **"Can't I learn all this free on YouTube?"**
   Yes, you can learn the pieces. What you're paying for is the order to learn them in, the deployed projects, and mentor review of your code. Point back to the pains in §3.
3. **"Will this get me a job or internship?"**
   Be honest: no guarantee. Show what you do provide (portfolio of deployed apps, interview prep) and *real* outcome data with dates. Never promise placement.
4. **"How many hours a week? I have classes and exams."**
   Give a number: `[N] hours/week`. Explain how deadlines flex around exams, and whether sessions are recorded.
5. **"What if it's not for me?"**
   Restate the `[refund days]`-day refund in plain words: how to ask for it and how fast the money comes back. End with a CTA back to pricing.

**Principle:** *answer objections where doubt peaks.* The FAQ comes directly after the price, and each answer ends with a reason to go back to the CTA.

---

## 8. Optional closing band (240px)

Use a full-bleed Pine band with one left-aligned line at 48px, weight 200, then a Signal CTA:
> "The [Month] cohort starts [date]. Your first deploy is [N] days after that."

This catches readers who went through the FAQ and are now ready. After it comes a minimal footer.

---

## Page-level checks before design hand-off

- [ ] One Signal element per screen: the CTA, or the price panel's CTA.
- [ ] No centered sections except single short lines.
- [ ] No three cards in a row, anywhere.
- [ ] Every number, logo and quote has a source in the content table above.
- [ ] Mobile: the hero headline is 96px, every split collapses to one column, and the price panel moves under its list and stops sticking.
- [ ] A CTA is visible or one tap away on every screen: nav, hero, the end of the problem→solution section, pricing, FAQ and the closing band.
