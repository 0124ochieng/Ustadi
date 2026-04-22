# 🤖 Claude Code — Website Build Instructions

# Claude Code — Ustadi Learning Website

## The Complete Build Brain

> This document is Claude Code's single source of truth. Every design decision, every pixel, every word of copy, every interaction — lives here. Read it entirely before writing a single line of code.
> 

---

# PART 1 — PROJECT OVERVIEW

## What You Are Building

A single-page, mobile-first, conversion-optimised website for **Ustadi Learning** — a premium private tutoring service based in Eldoret, Kenya. The website's sole purpose is to get a parent to submit a booking form.

## Tech Stack

- Pure HTML5 — semantic elements throughout
- CSS3 — custom properties, flexbox, grid, animations
- Vanilla JavaScript — no frameworks, no jQuery, no libraries
- Google Fonts — Plus Jakarta Sans + Inter
- Phosphor Icons — via CDN
- Intersection Observer API — for scroll animations
- n8n webhook — for form submission

## File Structure

```
ustadi-website/
├── index.html
├── css/
│ ├── style.css
│ └── animations.css
├── js/
│ ├── main.js
│ └── form.js
├── assets/
│ ├── images/
│ ├── icons/
│ └── logo/
└── favicon.ico
```

## Performance Requirements

- Load time under 3 seconds on mobile
- No external CSS frameworks
- Lazy load all images below the fold
- GPU-accelerated animations only (transform + opacity)
- Google Fonts loaded with display=swap

---

# PART 2 — DESIGN TOKENS

## Colour System

```css
:root {
 --navy: #00031a; /* Primary background */
 --navy-surface: #0a0f2e; /* Cards on dark */
 --cream: #fffef4; /* Secondary background */
 --white: #ffffff; /* Text on dark */
 --muted: #8892b0; /* Secondary text */
 --border-dark: rgba(255,255,255,0.08);
 --border-light: rgba(0,3,26,0.08);
}
```

## Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
 --font-display: 'Plus Jakarta Sans', sans-serif;
 --font-body: 'Inter', sans-serif;
}
```

## Type Scale — Mobile

```
Label: Inter 12px Medium uppercase tracking-wide #8892b0
Hero headline: Plus Jakarta Sans 36px Bold #ffffff line-height 1.15
Section headline: Plus Jakarta Sans 28px Bold line-height 1.2
Sub-headline: Inter 16px Regular line-height 1.6
Card title: Plus Jakarta Sans 16px Semi-bold
Body text: Inter 16px Regular line-height 1.6
Small/caption: Inter 13px Regular
Button: Plus Jakarta Sans 16px Bold
```

## Type Scale — Desktop (1440px)

```
Hero headline: Plus Jakarta Sans 56px Bold line-height 1.1
Section headline: Plus Jakarta Sans 40px Bold
Sub-headline: Inter 20px Regular
```

## Spacing System — 8px grid

```
4px — micro gaps within components
8px — tight internal spacing
16px — default padding
24px — between components
32px — between sections on mobile
48px — medium gap
64px — section padding mobile
80px — section padding desktop
96px — large section padding desktop
```

## Screen Margins

```
Mobile (390px): 24px each side
Tablet (768px): 40px each side
Desktop (1440px): 80px each side
Max content width: 1200px centred
```

## Border Radius

```
6px — buttons in navbar
8px — primary CTA buttons
12px — cards
20px — filter pills (fully rounded)
28px — the booking form CTA pill button
50% — circular images
```

---

# PART 3 — COMPONENTS

## Buttons

### Primary CTA — Large (52-56px)

```css
.btn-primary {
 height: 52px;
 padding: 0 32px;
 background: var(--cream);
 color: var(--navy);
 font-family: var(--font-display);
 font-size: 16px;
 font-weight: 700;
 border-radius: 8px;
 border: none;
 cursor: pointer;
 transition: transform 0.15s ease, background 0.2s ease;
}
.btn-primary:hover { transform: scale(1.02); }
.btn-primary:active { transform: scale(0.98); }
```

### Navbar Button (40px)

```css
.btn-nav {
 height: 40px;
 padding: 0 16px;
 background: var(--cream);
 color: var(--navy);
 font-size: 13px;
 font-weight: 700;
 border-radius: 6px;
 border: none;
}
```

### Booking Form Pill Button (56px)

```css
.btn-booking {
 height: 56px;
 width: 100%;
 background: var(--cream);
 color: var(--navy);
 font-size: 16px;
 font-weight: 700;
 border-radius: 28px; /* Full pill */
 border: none;
 cursor: pointer;
}
```

### Section CTA on Cream Background

```css
/* Inverse — navy on cream */
.btn-primary-inverse {
 background: var(--navy);
 color: var(--cream);
}
```

## Filter Pills

```css
.pill {
 height: 40px;
 padding: 0 20px;
 border-radius: 20px;
 font-family: var(--font-display);
 font-size: 14px;
 font-weight: 600;
 cursor: pointer;
 transition: all 0.2s ease;
}
.pill--inactive {
 background: transparent;
 border: 1px solid rgba(255,255,255,0.15);
 color: var(--muted);
}
.pill--active {
 background: var(--cream);
 border: none;
 color: var(--navy);
}
```

## Cards — Why Ustadi Style

```css
.card-trust {
 background: var(--navy-surface);
 border-radius: 12px;
 padding: 20px;
 border-left: 3px solid var(--cream);
}
```

## Cards — Services Style (Dark, no border accent)

```css
.card-service {
 background: var(--navy-surface);
 border-radius: 12px;
 padding: 20px 20px;
 width: 100%;
 display: flex;
 flex-direction: column;
 gap: 8px;
}
```

## Form Fields — Conversational Style

```css
.form-sentence {
 font-family: var(--font-body);
 font-size: 17px;
 font-style: italic;
 color: rgba(255,255,254,0.6);
 margin-bottom: 4px;
}
.form-field {
 width: 100%;
 height: 44px;
 background: transparent;
 border: none;
 border-bottom: 2px solid rgba(255,255,255,0.25);
 border-radius: 0;
 color: var(--white);
 font-family: var(--font-display);
 font-size: 17px;
 font-weight: 600;
 padding: 0 4px;
 outline: none;
 transition: border-color 0.2s ease;
}
.form-field:focus {
 border-bottom-color: var(--cream);
}
.form-field::placeholder {
 color: rgba(255,255,255,0.2);
 font-style: italic;
 font-weight: 400;
}
/* Dropdown fields need arrow indicator */
.form-select {
 appearance: none;
 -webkit-appearance: none;
 background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 256 256'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z'/%3E%3C/svg%3E");
 background-repeat: no-repeat;
 background-position: right 4px center;
 padding-right: 28px;
 cursor: pointer;
}
.form-select option {
 background: var(--navy);
 color: var(--white);
}
```

---

# PART 4 — PAGE STRUCTURE

The page is ONE HTML file. All sections stack vertically. Mobile first.

```
<header> — Navbar (sticky)
<main>
 <section id="hero"> — Hero
 <section id="why-ustadi"> — Why Ustadi
 <section id="how-it-works"> — How It Works
 <section id="services"> — What We Offer
 <section id="trust"> — Trusted From Day One + Booking Form
 <section id="faq"> — FAQ
<footer> — Footer
```

---

# PART 5 — SECTION BY SECTION BUILD GUIDE

---

## SECTION 0 — NAVBAR

**Reference:** Image 1 (top of screen)

**Background:** `#00031a`

**Height:** 64px mobile / 72px desktop

**Position:** `sticky` `top: 0` `z-index: 1000`

**Border bottom:** `1px solid rgba(255,255,255,0.08)`

**Layout:**

```
[Ustadi wordmark 80px wide] ————————— [☰ hamburger 24px]
```

24px padding each side. Logo and hamburger vertically centred.

**Logo:** White SVG wordmark. Width 80px mobile / 100px desktop. Auto height.

**Hamburger icon:** Phosphor `list` icon. 24px. Color `#fffef4`. Touch target 44x44px.

**Mobile menu overlay (when hamburger tapped):**

- Full screen `position: fixed` overlay
- Background: `#00031a`
- Padding: 24px
- Top row: Logo left + X close icon right
- Nav items stacked: Services · Why Ustadi · How It Works · FAQ · Contact
- Each item: Plus Jakarta Sans Semi-bold 18px `#fffef4` 56px tall border-bottom `rgba(255,255,255,0.08)`
- Bottom: `Book Free Session` full-width 52px cream button
- Opens with slide-in from right animation: `transform: translateX(100%)` → `translateX(0)` 300ms ease

---

## SECTION 1 — HERO

**Reference:** Image 1

**Background:** `#00031a`

**Section padding:** 48px top / 64px bottom

**Horizontal padding:** 24px

**Elements in order:**

```
1. Label — "TUTORING · ELDORET & EAST AFRICA"
 Inter Medium 12px #8892b0 uppercase letter-spacing 0.08em

2. Gap: 12px

3. Headline — "Your child is capable of more. We help them prove it."
 Plus Jakarta Sans Bold 36px #ffffff line-height 1.15
 Max 4 lines on mobile

4. Gap: 24px

5. Sub-headline — "Expert one-on-one tutoring in Mathematics, Sciences and Computer Studies — in-person and online."
 Inter Regular 16px #fffef4 opacity 80% line-height 1.6

6. Gap: 32px

7. Placeholder image
 Width: 100% (full content width)
 Height: 260px
 Border-radius: 12px
 Object-fit: cover
 Lazy load: false (above fold)

8. Gap: 32px

9. CTA Button — "BOOK FREE SESSION"
 Full width on mobile
 Height: 52px
 Background: #fffef4
 Text: #00031a
 Font: Plus Jakarta Sans Bold 15px uppercase letter-spacing 0.05em
 Border-radius: 8px
 Scrolls to #booking-form on click

10. Gap: 16px

11. Trust line — "No commitment. No payment. Just results."
 Inter Regular 13px #8892b0 text-align: center
```

**Desktop layout (768px+):** Two column — text left 50%, image right 50%.

---

## SECTION 2 — WHY USTADI LEARNING

**Reference:** Image 2

**Background:** `#00031a`

**Section padding:** 64px top / 64px bottom

**Horizontal padding:** 24px

**Important:** This section uses the same navy background as the hero above it. The visual break comes from the cream section that follows.

**Elements in order:**

```
1. Label — "WHY USTADI LEARNING"
 Inter Medium 12px #8892b0 uppercase letter-spacing 0.08em

2. Gap: 12px

3. Headline — "You already know your child is capable. You just need the right environment to prove it."
 Plus Jakarta Sans Bold 28px #ffffff line-height 1.2

4. Gap: 8px

5. Sub-line — "Here is exactly what that environment looks like at Ustadi Learning."
 Inter Regular 16px #8892b0 line-height 1.5

6. Gap: 32px

7. Three trust cards — stacked vertically, 16px gap between
```

**Each Trust Card:**

```
Background: #0a0f2e
Border-radius: 12px
Padding: 20px
Border-left: 3px solid #fffef4

Inside:
- Phosphor icon 28px color #fffef4 (see icon list below)
- Gap: 12px
- Title: Plus Jakarta Sans Semi-bold 16px #ffffff
- Gap: 8px
- Body: Inter Regular 14px #8892b0 line-height 1.6
```

**Card 1:**

- Icon: `shield-check` (Phosphor)
- Title: Every tutor is assessed. Not just hired.
- Body: Before anyone teaches your child they go through a structured evaluation — subject knowledge, clarity of explanation, and the patience to meet your child exactly where they are.

**Card 2:**

- Icon: `gift` (Phosphor)
- Title: Your first session costs nothing.
- Body: Experience the quality. Watch how your child responds to being taught the right way. Pay only when you are satisfied with what you see.

**Card 3:**

- Icon: `map-pin` (Phosphor)
- Title: Learning happens where your child is comfortable.
- Body: At home, a quiet venue of your choice, or online from anywhere. No disruption to your family's routine. Just focused learning in a space that works for them.

**After cards:**

```
Gap: 40px
Divider: 1px solid rgba(255,255,255,0.08) full width
Gap: 32px

Founder note label:
"A NOTE FROM THE FOUNDER"
Inter Medium 12px #8892b0 uppercase tracking-wide

Gap: 12px

Founder quote:
"Ustadi Learning was built because every Kenyan student deserves to be
taught by someone who knows how to make it land. That standard is
non-negotiable here."
Inter Regular Italic 15px #fffef4 opacity 85% line-height 1.7

Gap: 12px

Attribution:
"— Ochieng, Founder · Ustadi Learning"
Inter Regular 13px #8892b0
```

---

## SECTION 3 — HOW IT WORKS

**Reference:** Image 3

**Background:** `#00031a`

**Section padding:** 64px top / 64px bottom

**Horizontal padding:** 24px

**Elements:**

```
1. Label — "HOW IT WORKS"
2. Gap: 12px
3. Headline — "Starting is simple"
 Plus Jakarta Sans Bold 28px #ffffff
4. Gap: 8px
5. Sub-line — "Three steps between you and your child's first session."
 Inter Regular 16px #8892b0
6. Gap: 40px
7. Three steps — see layout below
```

**Step Layout — Split design:**

Each step uses a two-column layout:

- Left: Large faded step number (72px Plus Jakarta Sans Bold, `#fffef4` opacity 8%, right-aligned in 35% width column)
- Right: Circular image (80x80px) + Title + Body in 65% width column

**Circular images:** 80x80px, `border-radius: 50%`, `border: 2px dashed rgba(255,255,255,0.2)`, `object-fit: cover`

**Step 1:**

- Number: 01
- Circular image: person filling a form on phone
- Title: Fill the booking form — Plus Jakarta Sans Semi-bold 16px #ffffff
- Body: Tell us your child's name, level, subject, and preferred time. It takes less than 60 seconds. — Inter Regular 14px #8892b0

**Step 2:**

- Number: 02 (faded, left side)
- Circular image: tutor and parent conversation
- Title: We find the right tutor
- Body: We match your child with a tutor based on their subject, level, and specific learning needs.

**Step 3:**

- Number: 03
- Circular image: child learning with tutor
- Title: First session. Free.
- Body: Your tutor shows up online or in-person and the learning begins.

**Gap between steps:** 40px

**Note on alternating layout:** Steps 1 and 3 have image RIGHT, number+text LEFT. Step 2 has image LEFT, number+text RIGHT. This creates a zigzag visual rhythm — match the Figma reference exactly.

**After the three steps:**

```
Gap: 48px
Divider: 1px solid rgba(255,255,255,0.08)
Gap: 32px

Transition text (centred):
"Ready to take the first step?"
Inter Regular Italic 15px #fffef4 opacity 50%

Gap: 16px
```

---

## SECTION 4 — WHAT WE OFFER (SERVICES)

**Reference:** Image 4

**Background:** `#fffef4` — cream. First light section.

**Section padding:** 64px top / 64px bottom

**Horizontal padding:** 24px

**Elements:**

```
1. Label — "WHAT WE OFFER"
 Inter Medium 12px #00031a opacity 50% uppercase tracking-wide

2. Gap: 12px

3. Headline — "What is right for your child?"
 Plus Jakarta Sans Bold 28px #00031a

4. Gap: 8px

5. Sub-line — "Find your child in one of these."
 Inter Regular 16px #00031a opacity 55%

6. Gap: 32px

7. Situation cards grid — 2 columns, gap 12px
```

**Situation Card Grid:** 2 columns, equal width, 12px gap.

**Each Situation Card:**

```
Background: #0a0f2e (very dark navy, slightly lighter than #00031a)
Border-radius: 12px
Padding: 20px
Min-height: 160px
Display: flex flex-direction: column justify-content: space-between

Top:
 Number — "01" in a dashed circle
 Width/height: 36px
 Border: 1.5px dashed rgba(255,255,255,0.3)
 Border-radius: 50%
 Font: Plus Jakarta Sans Bold 12px #fffef4 opacity 60%
 Text-align: center line-height: 36px

Middle:
 Situation text:
 Inter Regular 14px #fffef4 opacity 80%
 line-height: 1.5
 margin: 12px 0

Bottom:
 Service name:
 Plus Jakarta Sans Bold 14px #ffffff
```

**Four cards content:**

Card 01:

- Situation: My child is falling behind in class.
- Service: Individual Tuition

Card 02:

- Situation: KCSE is coming and we are not ready.
- Service: KCSE Exam Preparation

Card 03:

- Situation: My child needs to learn technology & coding.
- Service: Computer Studies & Tech

Card 04:

- Situation: My child doesn't know what they want to do next.
- Service: Career Guidance

**After cards:**

```
Gap: 48px

Ustadi logo — centred
Width: 120px

Gap: 16px

Closing line (centred italic):
"We have helped students in exactly that situation.
We can help yours."
Inter Regular Italic 14px #00031a opacity 55%
Text-align: center
```

---

## SECTION 5 — TRUSTED FROM DAY ONE + BOOKING FORM

This is ONE continuous section — two halves, same background.

**Reference:** Images 5 and 6

**Background:** `#00031a`

**Section padding:** 64px top / 80px bottom

**Horizontal padding:** 24px

### TOP HALF — Testimonials

**IMPORTANT DESIGN DETAIL — Polka dot background:**

The testimonials area has a subtle polka dot pattern overlaid on the section. Implement as:

```css
.trust-area {
 position: relative;
}
.trust-area::before {
 content: '';
 position: absolute;
 top: 0; left: 0; right: 0; bottom: 0;
 background-image: radial-gradient(rgba(255,254,244,0.06) 1px, transparent 1px);
 background-size: 24px 24px;
 pointer-events: none;
 z-index: 0;
}
.trust-area > * { position: relative; z-index: 1; }
```

**Elements:**

```
1. Label — "WHAT FAMILIES SAY"
 Inter Medium 12px #8892b0 uppercase

2. Gap: 12px

3. Headline — "Trusted from day one."
 Plus Jakarta Sans Bold 28px #ffffff

4. Gap: 8px

5. Sub-line — "We are just getting started. Here is what we stand on."
 Inter Regular 15px #8892b0

6. Gap: 40px

7. Three trust stat cards — see below
```

**Trust Stat Cards — Speech bubble / chat style:**

Three cards arranged in a chat message layout (not a grid):

- Card 1: Right-aligned (margin-left: auto, max-width 80%)
- Card 2: Left-aligned, with circular image bottom-left overlapping
- Card 3: Right-aligned

This creates the visual rhythm shown in Image 5.

**IMPORTANT — Quote mark treatment:**

Large decorative quote marks in the top-left and bottom-right of the cards area. These use a **gradient fill** — a subtle gradient from `#fffef4` opacity 30% to `#8892b0` opacity 20%. Implement as:

```css
.quote-mark {
 font-size: 80px;
 font-family: var(--font-display);
 font-weight: 700;
 line-height: 0.8;
 background: linear-gradient(135deg, rgba(255,254,244,0.3), rgba(136,146,176,0.15));
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 background-clip: text;
}
```

**Each stat card:**

```
Background: #ffffff opacity 6% (rgba(255,255,255,0.06))
Border: 1px solid rgba(255,255,255,0.08)
Border-radius: 12px
Padding: 16px 20px
Max-width: 80%

Text: Inter Regular 14px #ffffff line-height 1.5
```

**Card 1 (right-aligned):**

"Vetted tutors only. Every tutor assessed before meeting a student."

**Card 2 (left-aligned, with circular placeholder image bottom-left):**

"First session free. Zero risk to your family."

Circular image: 56px, border-radius 50%, positioned bottom-left overlapping the card.

**Card 3 (right-aligned, with circular placeholder image bottom-right):**

"Online & in-person. Eldoret and across East Africa."

Circular image: 56px, positioned bottom-right.

### DIVIDER BETWEEN HALVES

```
Gap: 64px
Divider: 1px solid rgba(255,255,255,0.08)
Gap: 48px

Transition text (centred italic):
"Your child's first session is free."
Inter Regular Italic 15px #fffef4 opacity 40%
Letter-spacing: 0.01em

Gap: 40px
```

### BOTTOM HALF — Booking Form

**Reference:** Image 6

**Opening statement:**

```
Headline:
"You have read enough.
You know what your child needs.
So do we."
Plus Jakarta Sans Bold 28px #ffffff line-height 1.2

Gap: 8px

Sub-line (italic):
"Let us begin."
Inter Regular Italic 17px #fffef4 opacity 50%

Gap: 40px
```

**The Conversational Form:**

Each field pair is a sentence + an underline input. No label boxes. No input borders except bottom border. NO border-radius on inputs (border-radius: 0 — it's a writing line).

```html
<form id="booking-form" action="YOUR_N8N_WEBHOOK_URL" method="POST">
 
 <div class="form-group">
 <p class="form-sentence">My name is</p>
 <input type="text" name="parentName" class="form-field"
 placeholder="e.g. Jane Mwangi" required />
 </div>

 <div class="form-group">
 <p class="form-sentence">and my child is currently in</p>
 <select name="childLevel" class="form-field form-select" required>
 <option value="" disabled selected>Select level</option>
 <option>Primary School</option>
 <option>Secondary School — Form 1-2</option>
 <option>Secondary School — Form 3-4</option>
 <option>University</option>
 </select>
 </div>

 <div class="form-group">
 <p class="form-sentence">They need help with</p>
 <select name="subject" class="form-field form-select" required>
 <option value="" disabled selected>Select subject</option>
 <option>Mathematics</option>
 <option>Biology</option>
 <option>Chemistry</option>
 <option>Physics</option>
 <option>Computer Studies</option>
 <option>Career Guidance</option>
 <option>Other</option>
 </select>
 </div>

 <div class="form-group">
 <p class="form-sentence">We are usually free in the</p>
 <select name="preferredTime" class="form-field form-select" required>
 <option value="" disabled selected>Select time</option>
 <option>Morning — 7am to 12pm</option>
 <option>Afternoon — 12pm to 5pm</option>
 <option>Evening — 5pm to 8pm</option>
 <option>Weekend</option>
 </select>
 </div>

 <div class="form-group">
 <p class="form-sentence">The best number to reach me is</p>
 <input type="tel" name="whatsapp" class="form-field"
 placeholder="e.g. 0712 345 678" required />
 </div>

</form>
```

**Gap between form groups:** 28px

**The Submit Button:**

```
Text: "BOOK YOUR FREE SESSION"
Height: 56px
Width: 100% on mobile / 320px centred on desktop
Background: #fffef4
Color: #00031a
Font: Plus Jakarta Sans Bold 15px uppercase letter-spacing 0.05em
Border-radius: 8px (NOT a pill — match the design)
Margin-top: 40px
Transition: transform 0.15s ease
Hover: scale(1.02)
Active: scale(0.98)
```

**Note from image:** The button in the design is NOT a pill shape — it is a rounded rectangle. Do NOT use border-radius 28px here. Use 8px.

**Below button:**

```
Gap: 16px
Trust line (centred):
"No payment. No commitment. We respond within the hour."
Inter Regular 13px #8892b0
```

---

## SECTION 6 — FAQ

**Reference:** Image 7

**Background:** `#fffef4` — cream

**Section padding:** 64px top / 64px bottom

**Horizontal padding:** 24px

**Elements:**

```
1. Label — "COMMON QUESTIONS"
 Inter Medium 12px #00031a opacity 50% uppercase

2. Gap: 12px

3. Headline — "Answers before you need to ask"
 Plus Jakarta Sans Bold 28px #00031a

4. Gap: 8px

5. Sub-line — "Everything a parent usually wants to know before booking."
 Inter Regular 15px #00031a opacity 55%

6. Gap: 32px

7. Seven FAQ rows — expandable accordion

8. Gap: 48px

9. WhatsApp closing line
```

**FAQ Accordion rows:**

```css
.faq-item {
 border-bottom: 1px solid rgba(0,3,26,0.08);
}
.faq-question {
 height: 60px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 cursor: pointer;
 font-family: var(--font-display);
 font-size: 15px;
 font-weight: 600;
 color: #00031a;
 padding: 0 4px;
}
.faq-arrow {
 width: 16px;
 height: 16px;
 color: rgba(0,3,26,0.4);
 transition: transform 0.3s ease;
 flex-shrink: 0;
}
.faq-item.open .faq-arrow {
 transform: rotate(90deg);
}
.faq-answer {
 max-height: 0;
 overflow: hidden;
 transition: max-height 0.3s ease, padding 0.3s ease;
}
.faq-item.open .faq-answer {
 max-height: 300px;
 padding-bottom: 16px;
}
.faq-answer p {
 font-family: var(--font-body);
 font-size: 14px;
 color: rgba(0,3,26,0.6);
 line-height: 1.6;
 padding: 0 4px;
}
```

**Seven questions and answers:**

Q1: How much does tutoring cost?

A: From KES 600 per session for online individual tuition to KES 1,500 for career guidance. Group sessions start from KES 500 per student. All prices are visible on our services section — no hidden fees, no surprise charges.

Q2: How do I know the tutor is qualified?

A: Every Ustadi tutor goes through a structured assessment before teaching any student — subject knowledge, communication ability, and patience. We do not place anyone in front of a student until we are confident in them.

Q3: Is the first session really free?

A: Yes. No conditions. No payment required before or during the first session. You pay only after you have seen the quality and decided to continue.

Q4: Where do sessions take place?

A: In-person sessions are held at your home or a quiet venue of your choice anywhere in Eldoret and Uasin Gishu County. Online sessions are conducted via Google Meet or Zoom — from anywhere in Kenya and East Africa.

Q5: Am I locked into a contract?

A: No. There are no contracts and no minimum session requirements. You book when you need a session and stop whenever you choose. Everything is flexible.

Q6: How quickly will you respond after I book?

A: We confirm every booking within the hour. You will receive a WhatsApp message as soon as your booking is received — with your tutor's details and session confirmation.

Q7: Do you cover the Kenyan curriculum — CBC and KCSE?

A: Yes. Our tutors are fully aligned with the Kenyan curriculum — CBC for primary and lower secondary, and KCSE preparation for Form 3 and Form 4 students. We also support computer studies and career guidance beyond the standard curriculum.

**WhatsApp closing line (after FAQ rows):**

```
Text: "Still have a question? WhatsApp us directly — we respond within the hour."
Inter Regular 14px #00031a opacity 60%
Text-align: center

Gap: 16px

WhatsApp number — tappable link:
Phosphor whatsapp-logo icon 20px + phone number
Font: Plus Jakarta Sans Semi-bold 16px #00031a
Link: tel:+254116351761
Display: flex align-items: center justify-content: center gap: 8px
```

---

## SECTION 7 — FOOTER

**Reference:** Image 8

**Background:** `#fffef4` — cream (note: footer is cream in the design, not dark navy)

**Padding:** 48px top / 32px bottom

**All elements centred**

**Elements in order:**

```
1. Ustadi logo — dark version (navy on cream)
 Width: 120px centred

2. Gap: 16px

3. Tagline: "Discover Brilliance"
 Plus Jakarta Sans Regular 15px #00031a opacity 60%
 (NOT italic in the design — match exactly)

4. Gap: 40px

5. Divider: 1px solid rgba(0,3,26,0.08) full width

6. Gap: 24px

7. Nav links — inline, centred
 SERVICES · HOW IT WORKS · FAQ · CONTACT
 Inter Regular 12px uppercase letter-spacing 0.06em #00031a opacity 50%
 Gap between: 24px
 No underlines

8. Gap: 24px

9. Social icons row — centred
 WhatsApp + Facebook (match Image 8 — only these two)
 Phosphor icons: whatsapp-logo + facebook-logo
 Size: 28px
 Color: #00031a
 Gap between: 16px
 Each icon is a tappable link

10. Gap: 32px

11. Divider: 1px solid rgba(0,3,26,0.08)

12. Gap: 20px

13. Contact info (centred):
 Line 1: "Eldoret, Kenya · ustadilearning@gmail.com"
 Line 2: "www.ustadilearning.com"
 Inter Regular 13px #00031a opacity 55%

14. Gap: 20px

15. Divider: 1px solid rgba(0,3,26,0.08)

16. Gap: 16px

17. Copyright:
 "© 2026 Ustadi Learning. All rights reserved."
 Inter Regular 12px #00031a opacity 35%
```

---

# PART 6 — ANIMATIONS

All animations use Intersection Observer. Elements animate when they enter the viewport. No animation on page load except hero.

## Hero — On Page Load

```css
/* Hero text fades up on load */
@keyframes fadeUp {
 from { opacity: 0; transform: translateY(24px); }
 to { opacity: 1; transform: translateY(0); }
}
.hero-label { animation: fadeUp 0.6s ease 0.1s both; }
.hero-headline { animation: fadeUp 0.6s ease 0.2s both; }
.hero-sub { animation: fadeUp 0.6s ease 0.3s both; }
.hero-image { animation: fadeUp 0.7s ease 0.35s both; }
.hero-cta { animation: fadeUp 0.6s ease 0.45s both; }
```

## Scroll Animations — Intersection Observer

```jsx
const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 observer.unobserve(entry.target);
 }
 });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));
```

```css
.animate {
 opacity: 0;
 transform: translateY(32px);
 transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate.visible {
 opacity: 1;
 transform: translateY(0);
}
/* Staggered cards */
.animate:nth-child(2) { transition-delay: 0.1s; }
.animate:nth-child(3) { transition-delay: 0.2s; }
```

## Navbar — Scroll Behaviour

```jsx
// Navbar adds shadow when scrolled
window.addEventListener('scroll', () => {
 const navbar = document.querySelector('header');
 if (window.scrollY > 10) {
 navbar.style.boxShadow = '0 2px 20px rgba(0,3,26,0.4)';
 } else {
 navbar.style.boxShadow = 'none';
 }
});
```

## FAQ Accordion

```jsx
document.querySelectorAll('.faq-question').forEach(question => {
 question.addEventListener('click', () => {
 const item = question.parentElement;
 const isOpen = item.classList.contains('open');
 // Close all
 document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
 // Open clicked if was closed
 if (!isOpen) item.classList.add('open');
 });
});
```

## Mobile Menu

```jsx
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.menu-close');

hamburger.addEventListener('click', () => {
 mobileMenu.classList.add('open');
 document.body.style.overflow = 'hidden';
});
closeMenu.addEventListener('click', () => {
 mobileMenu.classList.remove('open');
 document.body.style.overflow = '';
});
```

```css
.mobile-menu {
 position: fixed;
 top: 0; right: 0; bottom: 0;
 width: 100%;
 background: var(--navy);
 transform: translateX(100%);
 transition: transform 0.3s ease;
 z-index: 2000;
 padding: 24px;
}
.mobile-menu.open {
 transform: translateX(0);
}
```

## Form Submission

```jsx
document.getElementById('booking-form').addEventListener('submit', async (e) => {
 e.preventDefault();
 const btn = e.target.querySelector('button[type="submit"]');
 btn.textContent = 'Sending...';
 btn.disabled = true;

 const data = new FormData(e.target);
 const body = Object.fromEntries(data.entries());

 try {
 await fetch('YOUR_N8N_WEBHOOK_URL', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(body)
 });
 btn.textContent = 'Booking Received ✓';
 btn.style.background = '#10b981';
 btn.style.color = '#ffffff';
 e.target.reset();
 } catch (err) {
 btn.textContent = 'Something went wrong. Try again.';
 btn.disabled = false;
 }
});
```

---

# PART 7 — SEO

```html
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Ustadi Learning — Expert Private Tutoring in Eldoret & East Africa</title>
 <meta name="description" content="Expert private tutoring in Mathematics, Sciences and Computer Studies. In-person across Eldoret. Online across East Africa. First session free. No commitment.">
 <meta name="keywords" content="tutoring Eldoret, private tutor Kenya, maths tutor Eldoret, KCSE preparation, online tutoring East Africa, Ustadi Learning">

 <!-- Open Graph -->
 <meta property="og:title" content="Ustadi Learning — Discover Brilliance">
 <meta property="og:description" content="Expert tutoring for your child. First session free. In-person across Eldoret, online across East Africa.">
 <meta property="og:image" content="assets/images/og-image.jpg">
 <meta property="og:url" content="https://ustadilearning.com">
 <meta property="og:type" content="website">

 <!-- Twitter -->
 <meta name="twitter:card" content="summary_large_image">
 <meta name="twitter:title" content="Ustadi Learning — Discover Brilliance">
 <meta name="twitter:description" content="Expert tutoring for your child. First session free.">

 <!-- Canonical -->
 <link rel="canonical" href="https://ustadilearning.com">

 <!-- Favicon -->
 <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
```

---

# PART 8 — PERFORMANCE RULES

1. **No CSS frameworks** — zero. Not even Tailwind.
2. **No JavaScript libraries** — zero. Not even jQuery.
3. **Fonts** — Google Fonts with `display=swap` only
4. **Images** — all below-fold images get `loading="lazy"`
5. **Hero image** — NO lazy load (above fold)
6. **Animations** — only `transform` and `opacity` — never `top`, `left`, `width`, `height`
7. **Icons** — Phosphor Icons via CDN script tag in body, not head
8. **CSS variables** — all colours and spacing as CSS custom properties
9. **No inline styles** — everything in style.css
10. **Semantic HTML** — `<header>` `<nav>` `<main>` `<section>` `<article>` `<footer>` — no div soup

---

# PART 9 — COPY REFERENCE

## Navbar

- Logo: Ustadi (SVG wordmark)
- Menu items: Services · How It Works · FAQ · Contact
- CTA: Book Free Session

## Hero

- Label: TUTORING · ELDORET & EAST AFRICA
- Headline: Your child is capable of more. We help them prove it.
- Sub: Expert one-on-one tutoring in Mathematics, Sciences and Computer Studies — in-person and online.
- Button: BOOK FREE SESSION
- Trust: No commitment. No payment. Just results.

## Why Ustadi

- Label: WHY USTADI LEARNING
- Headline: You already know your child is capable. You just need the right environment to prove it.
- Sub: Here is exactly what that environment looks like at Ustadi Learning.

## How It Works

- Label: HOW IT WORKS
- Headline: Starting is simple
- Sub: Three steps between you and your child's first session.
- Step 1 title: Fill the booking form
- Step 2 title: We find the right tutor
- Step 3 title: First session. Free.
- Transition: Ready to take the first step?

## Services

- Label: WHAT WE OFFER
- Headline: What is right for your child?
- Sub: Find your child in one of these.
- Closing: We have helped students in exactly that situation. We can help yours.

## Testimonials

- Label: WHAT FAMILIES SAY
- Headline: Trusted from day one.
- Sub: We are just getting started. Here is what we stand on.
- Transition: Your child's first session is free.

## Booking Form

- Headline: You have read enough. You know what your child needs. So do we.
- Sub: Let us begin.
- Button: BOOK YOUR FREE SESSION
- Trust: No payment. No commitment. We respond within the hour.

## FAQ

- Label: COMMON QUESTIONS
- Headline: Answers before you need to ask
- Sub: Everything a parent usually wants to know before booking.
- WhatsApp line: Still have a question? WhatsApp us directly — we respond within the hour.

## Footer

- Tagline: Discover Brilliance
- Nav: SERVICES · HOW IT WORKS · FAQ · CONTACT
- Location: Eldoret, Kenya · [ustadilearning@gmail.com](mailto:ustadilearning@gmail.com)
- Website: [www.ustadilearning.com](http://www.ustadilearning.com)
- Copyright: © 2026 Ustadi Learning. All rights reserved.

---

# PART 10 — CRITICAL DESIGN NOTES

1. **Polka dot background** on the testimonials area — radial-gradient pattern, subtle, opacity 6%
2. **Gradient quote marks** — use CSS gradient text technique (background-clip: text)
3. **Dropdown selects** — must show a custom chevron arrow. The design shows dropdowns — do not leave them unstyled
4. **Form fields** — bottom border only, no box. Zero border-radius. Pure underline aesthetic
5. **Step layout** — alternating zigzag — step 1 image right, step 2 image left, step 3 image right
6. **Circular images** use dashed border, not solid
7. **Footer is cream** not navy — match Image 8 exactly
8. **Services section has cream background** — first light section after two dark sections
9. **Logo in footer is DARK navy** on cream background — different from navbar logo which is white
10. **Trust cards in testimonials** are chat-bubble style — left and right aligned alternating, not a grid
11. **The booking form CTA button is a rounded rectangle** (border-radius 8px) — NOT a pill
12. **All body text left-aligned** unless explicitly noted as centred

---

# PART 11 — BUILD ORDER

Build in this exact sequence. Do not skip ahead.

```
1. index.html skeleton — DOCTYPE, head, semantic structure, Google Fonts
2. css/style.css — CSS variables, reset, base styles
3. Navbar — HTML + CSS + hamburger JS
4. Hero section — HTML + CSS
5. Why Ustadi — HTML + CSS + 3 cards + founder note
6. How It Works — HTML + CSS + zigzag layout + circular images
7. Services — HTML + CSS + 4 situation cards + closing element
8. Testimonials — HTML + CSS + polka dot bg + gradient quotes + chat bubbles
9. Booking Form — HTML + CSS + conversational fields + dropdown arrows
10. FAQ — HTML + CSS + accordion JS
11. Footer — HTML + CSS
12. css/animations.css — all keyframes
13. Intersection Observer — scroll animations
14. js/form.js — form submission to n8n webhook
15. SEO meta tags — full set
16. Performance pass — lazy loading, image optimisation
17. Mobile review — every section on 390px
18. Desktop review — every section on 1440px
```

---

*This document is the complete build specification for [ustadilearning.com](http://ustadilearning.com). Every decision made during the design process is captured here. Do not deviate without explicit instruction.*