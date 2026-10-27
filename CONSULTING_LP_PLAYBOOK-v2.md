# Consulting LP Playbook v2 (self-driving edition)

A single file that builds a high-converting landing page from a winning ad. Unlike v1 (a reference you fill in by hand), v2 drives the whole process: hand it to Claude Code, and it prompts you for what it needs, scrapes the brand's real design itself, asks which page type you want, builds it, and QCs it.

## How to use (operator)

1. Open Claude Code in an empty working folder.
2. Make sure it has an empty `client-assets/` folder inside it.
3. Say: **"Read CONSULTING_LP_PLAYBOOK-v2.md and run it."**
4. Answer Claude's questions and drop in the files it asks for. It does the rest.

That is the whole thing. Everything below is instructions for Claude plus the reference it builds from.

---

# INSTRUCTIONS FOR CLAUDE

When the operator tells you to run this playbook, execute the workflow below in order. It has **GATES** marked `[ASK + WAIT]`: at each one, stop, ask the operator, and do not proceed until they answer. The reference sections (Part A onward) are what you build from; consult them, do not paste them at the operator.

Rules that hold the whole way through: never invent a number, price, rating, or claim; use only the brand's real material and real design tokens; keep to the compliance rules in Part E; no em dashes anywhere in the page.

## Step 1: Harvest the client's material `[ASK + WAIT]`

Tell the operator, in your own words, to gather these into the folder, and wait until they confirm it is done:

- **Winning ad creatives** into `client-assets/ads/` (the 2-3 screenshots of the ads that are converting).
- **Every product-page image** into `client-assets/images/`. Tell them to use the **ImageEye** Chrome extension on the product page and choose "download all." This is more reliable than you scraping, because sites lazy-load and block bots.
- **Product and member/UGC videos** into `client-assets/videos/` (optional; you cannot watch them, but they are useful later).
- **The entire product page as text** pasted into `client-assets/pdp.md` (select-all on the page, copy, paste). This is your source of truth for claims, facts, prices, and reviews, and it works even if the live site blocks you.
- **The brand's science, blog, and FAQ pages** pasted into `client-assets/education.md`.
- **The product-page URL**, so you can pull the live design tokens.
- **(Optional)** a landing page they want to mimic, into `client-assets/reference/`.

Do not start scraping or building until they confirm the folder is populated.

## Step 2: Scrape the design and build the brief `[YOU DO]`

Now do the work the operator would otherwise do by hand. Write it all into `BRAND-BRIEF.md` in the folder:

- **Design tokens from the live site:** fetch the product-page URL and pull the exact hex color values, the real font family names and weights, and the button corner radius from the live CSS. These exact tokens are the biggest difference between a page that looks AI-made and one that looks like the brand made it. If the live site is blocked, extract what you can from the pasted `pdp.md` and any CSS in it, and flag what you could not get.
- **From `pdp.md`:** the trust constants verbatim (rating, review count, guarantee wording), every product fact, the exact prices and offer, and 6 to 8 real customer reviews.
- **From `education.md`:** how the brand explains the product, so the page sounds like an insider.
- **From `ads/`:** the winning ad's angle, exact promise, emotion, and offer, in one line. This becomes the hero.
- **Deep research:** how real customers describe this problem in their own words, the main competitors and the gap, the strongest buyer objections, and what the evidence actually supports so you never overclaim. Add this as a research section, with sources.
- **Compliance:** if this is a regulated category (supplement, health, finance, beauty), capture the required disclaimer verbatim and the claim rules (see Part E).

Report back a short summary of the tokens and constants you found, then move on.

## Step 3: Pick the page type `[ASK + WAIT]`

Ask the operator which page to build, and wait:

> **Which page do you want?**
> **A) Conversion page** (the default): for an ad that sold a specific product. One page, one job: close the click now.
> **B) Listicle** ("5 signs..."): for an ad that sold curiosity or a frame, not a product. Teach, then close.
> **C) Quiz** ("what's your type?"): for an ad that sold self-diagnosis. Personalize, then close.
>
> Or point me at a page in `client-assets/reference/` you want to mimic, and I will adapt its structure.

Match the recommendation to the ad you read in Step 2, but let them choose. If they give a reference page, reverse-engineer its structure and adapt it to this brand using the brief; do not copy its copy or brand, and improve anything in it that would hurt conversion.

## Step 4: Propose structure and hero, get approval `[ASK + WAIT]`

Using the anatomy for the chosen archetype (Part A) and the hero formula (Part B), propose:
1. The section order, one line each on why each earns its place.
2. Two hero options (eyebrow, two-line H1, lede, price chip, mini trust line). The H1 pays off the ad's exact promise, and the single strongest specific claim (like a timeframe) goes up here, not buried.

Show these and wait for the operator to pick a hero or push back. Do not write code yet.

## Step 5: Build `[YOU DO]`

Build one self-contained page (plain HTML, one CSS file, a little vanilla JS for the cart and animations), mobile-first, using `BRAND-BRIEF.md`, the real photos in `client-assets/images/`, the approved structure and hero, and the full build-quality contract in Part C. Wire the buy block per Part B. Use placeholder product/variant/selling-plan IDs and leave a comment showing where the real ones go (on a store the operator controls, the Shopify MCP fills these in). When done, serve it locally and tell the operator which contract rules you followed and where you cut a corner.

## Step 5b: Generate missing imagery `[YOU DO, if an image tool is available]`

The harvest gives you real product shots. Generate only the lifestyle moments it cannot (a person after dinner, the morning routine, a travel shot), using the real photos as references so the product stays accurate, and no text baked into the images. If no image tool is connected, the real photos carry the page.

## Step 6: QC loop `[YOU DO, then report]`

Run the review in Part D: score the page 0-100 across the five lenses, list findings as P0/P1/P2 with evidence, apply every P0 and P1 that does not need an operator decision, verify each fix in the running browser, and re-score. Repeat until 90+ or two rounds. Put anything needing the operator (a real review to source, a claim to verify, real IDs) on a short "needs the client" list. Report the score trajectory.

## Step 7: Ship `[ASK + WAIT]`

Ask before deploying. On the operator's okay, do the whole deploy yourself and assume this may be the operator's first deploy ever. Check the Vercel CLI (`vercel --version`); if missing, install it with `npm i -g vercel` (fall back to `npx vercel` for every command on a permissions error, never sudo). Check login with `vercel whoami`; if not logged in, run `vercel login` and tell the operator plainly what happens: their browser opens and they sign in, or sign up free with their email if they have never used Vercel, no credit card. Wait for them, then confirm with `vercel whoami`. Package a clean deploy folder before shipping: the page as `index.html` plus every local image, font, and CSS file it references with relative paths intact, nothing pointing at localhost or an absolute path on the machine; if a referenced file cannot be found, say so instead of shipping broken images. Keep `noindex` on until they are ready for traffic. Deploy to production, then verify before declaring done: fetch the live URL, spot-check the images load, and confirm add-to-cart and checkout work on the live page. Hand back the URL and note that re-deploying after edits refreshes the same URL.

## Step 8: Offer to freeze the learnings `[ASK]`

Offer to save a filled brief, a review checklist, and any brand-specific notes so the next build for this client is faster.

---

# PART A: The three archetypes and their anatomy

Every acquisition page is one of three shapes. They share the promo bar, header, footer, cart, offer, brand tokens, and compliance. They differ only in the middle. That is why the second and third take a fraction of the time.

**The non-negotiable, all three:** the page pays off the ad. The persona, angle, and emotion from the winning ad dictate the hero image, the H1, and the FAQ. Message match between the ad and the above-the-fold is where the conversion lives.

## A1: Conversion page (Product LP)

For an ad that sold a specific product. The job is to close. Section order, top to bottom:

```
promo bar (shipping - guarantee - headline saving)
sticky header (logo, anchor nav, cart)
hero (full-bleed brand photo + scrim; eyebrow = the ad promise; 2-line H1
      = observation + emphasized closer with the strongest claim; lede = the
      offer; price chip = scoped strike + "from" price + one-word frame;
      dual CTA; mini trust line = stars + SCOPED rating + one credential)
proof / authority band (1-2 expert or publication quotes WITH their logos)
proof strip (4 key product facts, one icon family)
USP grid (4-6 reasons around a hero-grade detail photo)
signature band (the one visual no competitor has: an annotated product photo
      with numbered hotspots tied to real features + a numbered legend)
stats row (4 trust constants, count-up, SCOPED labels)
buy block (sticky gallery, plan selector as a radiogroup, itemized offer-math
      receipt, add-to-cart with risk-reversal microcopy, cross-sell line)
symptom / use-case match ("is this you" cards, each pre-selects the offer)
lifestyle moments (4 named moments for this persona) closed by ONE honest chart
      of the core claim (published figures only, bars from zero)
comparison table (brand vs the thing they buy now)
reviews (named, context-tagged, some with photos, SCOPED rating in the head)
guarantee band (icon + guarantee + CTA)
brand / mission strip (dark, the founder or the mission)
FAQ (5-7; question 1 answers the hero's boldest claim in a skeptic's words)
final CTA (image-backed, price restated, stars + trust line)
footer (contact, disclaimers, copyright)
sticky mobile CTA (title + live price, shows after hero, hides over the buy block)
cart drawer (role=dialog, focus trap, Escape, qty-merge, permalink checkout)
```

## A2: Listicle (advertorial)

For an ad that sold curiosity or a frame. Teach, then close. Section order:

```
promo bar
collapsed header (shop + link to the conversion page)
article hero (eyebrow = "<Brand> 101"; a numbered headline; team byline +
      read time + star line; product hero image)
trust-badge pills (guarantee - shipping - proof points)
intro (1-2 paragraphs naming the reader's problem)
skip-ahead CTA ("skip ahead, start with <offer>")
the numbered items (each = one specific symptom/point + one teaching beat + a
      real product tie; the item that maps to the ad's promise goes first; the
      "you tried one and felt nothing" item is the objection handler)
compact buy block (after item 3)
the rest of the items
offer stack (itemized math) + full buy block
social proof block
recap (30-second bullet summary + CTA)
FAQ (5-7, including one cross-product question)
stats row - final CTA - footer - cart drawer
```

The listicle rule: every numbered item maps to one specific product/variant and one named moment. Name the items first, then write the prose around them.

## A3: Quiz

For an ad that sold self-diagnosis. Personalize, then close. Highest intent, and it produces data (which symptom dominates tells you the next angle to scale). Section order:

```
quiz hero ("how's your <thing>, really?"; 6 questions, 60 seconds; NO email
      before the result)
6 questions, one per screen, big tappable options, progress bar, a back button,
      written in the customer's own language (a couple of questions detect
      objections rather than score)
scoring into 3-4 named result types, each mapping to a persona x angle
result page = a mini conversion page assembled from the shared blocks: the type
      name, a one-paragraph "here's what's likely going on" (scoped, asterisked),
      the 2-3 proof blocks that fit THIS type, the buy block with the same offer,
      a trimmed FAQ
```

Mechanics: static HTML + vanilla JS, quiz state and result in the URL hash (`#result=<type>`) so results are shareable and ads can deep-link straight to a result. Compliance: the quiz types a MARKETING persona, never a medical condition; keep the markers and disclaimer on every screen.

---

# PART B: Copy and offer formulas

**Conversion-page hero:** eyebrow = product line + the ad promise close to verbatim (plus any required marker); H1 in two lines, observation then emphasized closer, with the strongest specific claim up here; lede = the offer in plain English; price chip = scoped strike ("Compare at" for screen readers) + "From $X" + a one-word frame; mini trust = stars + SCOPED rating + one credential.

**Advertorial hero:** eyebrow = series name; declarative listicle H1; second-person lede; byline with read time and the star line.

**The offer stack** (advertorials and any promo-angle page), shown literally:
```
<Offer> - <pack contents>              $XX.XX
First-order discount, code <CODE>      -$YY.YY
Free shipping over $<threshold>        Included
<Guarantee name>                       Included
Your price today                       $ZZ.ZZ
```

**Pricing display rule:** the add-to-cart label shows the post-discount price; the strike price is never the cart price; the discount code applies once at checkout, so the shown total is never double-discounted.

**Voice:** plain English, short declarative sentences, no clinical stiffness. Second person for advertorials, product-voice for the conversion page. Trust constants used verbatim and consistently. Guarantee phrased exactly as the brand phrases it. Pull-quotes come from real reviews, never invented per page.

---

# PART C: The build-quality contract (first draft must score 88+)

Follow every rule at build time. This is the difference between starting QC at 84 and at 88.

**Truth and consistency**
1. **Static equals dynamic.** Every hardcoded price/label equals the JS default state exactly (button, config cards, sticky CTA). A JS failure leaves a correct page, not a stale one.
2. **Every number scoped and exact.** Product rating vs sitewide rating labeled as such everywhere; spec figures exact to the decimal; savings math reconciles on the page; no claim outruns the page's own math.
3. **Claims match substantiation.** The hero's boldest claim is FAQ question 1, answered in the skeptic's words.
4. **No proof reuse.** A quote appears once. If a headline states a count, the visible callouts match it.
5. **Message match.** The winning ad's promise appears verbatim in the hero eyebrow or H1.

**Craft**
6. **Brand tokens from the live theme's CSS**, never a description: font family and weights, exact hex, button radius.
7. **One icon family.** Same viewBox, stroke width, caps, color for every icon.
8. **Images at render size** with width/height on every one (target zero layout shift); export responsive variants where you can; hero preloaded and eager, below-fold lazy.
9. **Authority wears its logo.** Press/expert quotes carry the publication mark; testimonial cards carry stars + name + context tag. The two proof types are visually distinct.
10. **Charts only from published data.** One chart of the core claim beats three decorative ones. Bars start at zero, proportional, one reference line, source figures exact. Never invent a number or an axis.

**Function**
11. **The funnel is tested before handoff.** Add-to-cart, drawer, checkout URL executed, with the checkout page confirmed carrying the right line items and quantities (and the selling plan for subscriptions). Duplicate adds merge; the badge counts units.
12. **Accessibility built in:** custom selectors get role=radio/aria-checked with roving tabindex + arrow keys; the cart drawer is role=dialog with focus trap, Escape, focus restore, and hidden when closed; strike prices get sr-only "Compare at"; decorative hotspots aria-hidden with the content in a real list; heading levels never skip; reduced-motion kills animation.
13. **Contrast floor:** no text below 4.5:1; tap targets at least 44px.
14. **Mobile fold at 375px:** the primary CTA sits inside the first viewport; hide the key-facts line under 560px; H1 line breaks have spaces so hiding a `<br>` cannot merge words.
15. **Ship hygiene:** cache-bust shared CSS/JS on every change; noindex until launch; no em dashes anywhere; scarcity only when it is literally true.

Anything the contract cannot settle without the operator (guarantee wording, code stacking, logo permissions, review attributions, real IDs) goes on the "needs the client" list, never guessed.

---

# PART D: The QC loop (five lenses)

Review the built page for cold, mostly-mobile paid traffic. Score 0-100, weighting Message Match heaviest, and quote exact evidence for every finding.

1. **Message match:** does the hero pay off the ad's exact promise, words, and emotion, above the fold?
2. **Above-the-fold:** on the first phone screen, is it clear what it is, what you get, the offer, and where to tap? Is the strongest claim up top or buried?
3. **Offer and buy path:** one clear offer or a confusing fork? Price consistent everywhere? Renewal/subscription terms shown before the button? Does the cart and checkout actually work?
4. **Mobile and speed:** CTA in the first screen, no sideways scroll, tap targets big enough, no giant images, a sticky buy bar.
5. **Trust and compliance:** real specific proof, ratings scoped honestly, no reused testimonials, claims correctly qualified, disclaimer present, no invented stats, numbers that all agree.

Also judge the four premium inputs: real brand tokens, the best photography given room to breathe, the brand's own proof used fully, and numbers that agree. Apply every P0/P1, verify in the browser, re-score to 90+ or two rounds. A regulated-category compliance failure (disease claim, missing disclaimer, invented stat) caps the score at 79 until fixed.

---

# PART E: Compliance (switch on for supplements, health, finance, beauty, any regulated category)

- **Structure/function, not disease.** "Supports regularity," not "cures constipation." No "treat / cure / prevent / diagnose" a condition in visible copy. The only allowed hit on those words is the disclaimer itself.
- **Required disclaimer present, verbatim**, in the footer (for supplements, the FDA statement).
- **Every benefit claim carries its marker** the way the brand's own site marks it (an asterisk); sensitive claims are scoped to the studied population; ingredient-level (not full-formula) claims are marked separately.
- **No fabricated stats.** Every number traces to a real source.
- **Do not outrun the substantiation.** The page cannot claim more than the brand or the trial supports.

---

# PART F: Stack and wiring

Static HTML, no build step. One shared CSS file, vanilla JS for cart and animations. Hosted on Vercel with clean URLs and per-route rewrites. Shared CSS/JS referenced with a `?v=YYYYMMDD` cache-bust, bumped on every change.

Buy block: product data in `data-*` attributes read by the cart script. Cart lines in localStorage (with an in-memory fallback when storage is blocked). Checkout is a pre-filled Shopify link with the discount applied once and the selling plan per line for subscriptions. No server, no credentials, no store apps.

---

*SelfMade LP System v2. Hand this file to Claude Code and say "run it."*
