# Pre-implementation audit: mobile and motion polish

Repository: WildXhild/dean-by-dzyne  
Baseline: main @ 431e7f1be7ec19130207ea2fe369e494bd1be820  
Audit date: 2026-11-14  
Scope: index.html, css/styles.css, js/app.js, Images/, backend/, root configuration and documentation.

## Executive summary

The project is a static HTML/CSS/JavaScript site using Vue 3 from a CDN, with an Express backend in backend/. The supplied stack description is substantially correct. The repository contains no build pipeline or package manifest at the root. The backend has its own package.json.

No actual .env file or credential-bearing key/token file appears in the repository tree. backend/.env.example contains placeholder values only, and both root and backend .gitignore files already ignore .env patterns. No secrets were exposed in the files inspected. The example environment file is not a live credential file.

The current site needs a genuine responsive and motion pass. Existing mobile CSS is not sufficient evidence that all widths are overflow-free, and earlier documentation incorrectly claims zoom should be disabled.

## Findings before changes

### 1. Mobile layout and viewport

- index.html:5 sets maximum-scale=1 and user-scalable=no. This prevents pinch zoom and must be removed.
- css/styles.css:63 applies overflow-x:hidden to body. This can conceal overflow rather than fix the element causing it.
- css/styles.css:1434, 1463, 1620, 2209 and 2282 contain breakpoints at 1024, 768, 480 and 360px. There are no dedicated rules for 390 or 414px; these rely on fluid/default rules.
- At 360px, css/styles.css:2282 reduces the root font size to 13px. At widths up to 480px, css/styles.css:1622 and 1626 reduce it to 14px. This harms readability and can create inconsistent rem-based sizing.
- The service tiles have 140-150px minimum/fixed sizing in the desktop rules (css/styles.css around 620-650) and are later flexed on mobile. The narrowest 360px rule uses three columns for the first service grid, which may make labels cramped.
- Partner cards are 500px wide by default (css/styles.css around 1160), then redefined inconsistently: tablet stacks them, while the later <=480px block re-enables a horizontal marquee and sets a 260px wrapper. This conflicts with the <=768px vertical stack.
- The navbar's regular link list is explicitly hidden inline in index.html, while a separate fixed menu button is used (index.html:17 onward). The fixed menu and floating chat overlap the content area and have no safe-area-aware offsets.
- The floating nav button is 60px on desktop and 50px/48px at small widths (css/styles.css:1954 onward, 2209 onward, 2282 onward). The chat minimize control is 40px and falls to 36px/34px at small widths. Several social targets are 45px. These miss the requested 48px minimum.
- The floating chat uses max-height based on 100vh (css/styles.css:2085, 2234, 2311), not dynamic viewport units, and can conflict with mobile keyboards and browser chrome.
- The chat form inputs use 0.9rem, 0.85rem or 0.8rem in mobile rules (css/styles.css:2135 and 2240 onward), unlike the 16px minimum needed to avoid iOS input zoom.
- The footer has a two-column contact-section rule but the actual index.html footer only includes contact details and socials; no in-section contact form is present. The only form is in the floating widget (index.html:49-106).
- The hero logo is hardcoded to 200x200px inline (index.html:126), then overridden with !important width/height in mobile CSS (css/styles.css:1510, 1650, 2290). This makes responsive sizing brittle.
- The site has no tested results at 360, 390, 414, 768, 1024 or 1440px. Browser rendering is not available in this audit, so actual horizontal overflow at those exact widths remains unverified. The conflicting widths and fixed components are high-risk candidates.

### 2. Animation and runtime

- js/app.js:353 and :356 call this.addScrollAnimations() and this.addParallaxEffect() in mounted(), but neither method exists in the Vue methods object. A global addParallaxEffect() exists at :444, but calling it as this.addParallaxEffect() is incorrect. The mounted hook therefore encounters a runtime error.
- js/app.js:448 and :473 register independent scroll handlers without throttling or requestAnimationFrame scheduling.
- js/app.js:450 updates hero.style.backgroundPosition on every scroll event. This is not a compositor-only animation and can trigger paint work.
- css/styles.css:225 uses background-attachment:fixed on the hero, a costly/poorly supported mobile effect.
- js/app.js:169 getMarqueeStyle() assigns one of many complex animation keyframes to each item. The stylesheet defines numerous marquee effects, including bounce, scale, wiggle and spin. They are visually inconsistent with the requested restrained motion system.
- css/styles.css contains several transition:all declarations (including around :540, :627, :740, :797, :856, :954, :1055, :1131, :1188, :1362, :1401, :1970, :1995, :2032, :2093, :2135, :2168, :2193). These can animate layout/paint properties when those properties change.
- js/app.js:249 starts an auto-rotating timer for a services carousel whose corresponding carousel controls are not present in the supplied index.html. Pause-on-hover/touch and reduced-motion behavior are not implemented for this timer.
- Scroll reveal code is split between Vue calls and global IntersectionObserver code (js/app.js:353 onward and :375 onward), resulting in duplicate/inconsistent mechanisms.
- Anime.js is loaded from a CDN at index.html:334 but no anime usage was found in app.js. It is an unused external dependency and should be removed.
- Reduced-motion handling is not present in the inspected stylesheet or script.

### 3. Images and layout shift

Repository image sizes from Git tree metadata:
- Images/Marquee BG.png: 2,077,078 bytes (~2.08 MB).
- Images/ovc.png: 478,339 bytes.
- Images/Wildchild.jpg: 328,222 bytes.
- Images/furbaby logo1.png: 168,559 bytes.
- Images/LOGO.png: 77,008 bytes.
- Images/pba csv.jpg: 83,692 bytes.
- Five service GIFs range from ~151 KB to ~225 KB each.

The hero background is a large PNG and is loaded as a CSS background, so it cannot use native lazy loading. Main partner images are CSS background-image values in Vue data and have no intrinsic dimensions or alt text. The hero logo has dimensions only via inline CSS, not width/height attributes. The service GIFs have explicit CSS dimensions but no responsive source/fallback strategy. There is no systematic srcset, loading=lazy or fetch priority policy. Cumulative layout shift has not been measured.

### 4. Accessibility

- index.html:5 disables zoom.
- index.html:17 uses a button without aria-label or aria-expanded; the close control and other icon-only controls also lack complete accessible naming/state.
- The menu has no dialog/nav labeling, backdrop, focus trap, Escape handling, outside-click behavior, or body-scroll lock.
- The menu's visibility is controlled by a CSS class, without inert/hidden semantics for keyboard navigation.
- Several links open new tabs without rel=noopener.
- Emoji are used as navigation, service, quality, contact and social icons (index.html around :20-30, :183-244, :274-319). They are inconsistent in style and may be announced awkwardly.
- The body sets -webkit-user-select:none (css/styles.css:66), which can interfere with text selection.
- There are no clearly defined global :focus-visible styles or skip link in the inspected source.
- Contrast requires browser-based measurement. Purple accents and muted text on dark surfaces need review against WCAG AA.

### 5. Brand and content

- css/styles.css:13 and :78 define the old purple accent palette (#7C5FE8 / #6B4AE6), with additional purple and gold literals throughout the stylesheet.
- Several surfaces use older blue-grey shades rather than the specified navy, royal blue, logo blue and off-white tokens.
- index.html:244 contains “Web-AppS” and “ExperienceD”.
- index.html:297 says “Business Address” and “Ikeja, Lagos, Nigeria”; this conflicts with the approved remote-first location wording.
- index.html:319 uses WhatsApp number +2347042313979, while the displayed phone link at :289 uses the requested +2348143824044.
- index.html:334 loads Anime.js even though it is unused.
- index.html contains an unmatched closing </header> near the hero boundary; there is no corresponding opening header element in the inspected markup.
- js/app.js partner data contains example.com website links for OYO VIBES CARTEL and MEMOIRS OF WILDXHILD. These appear to be placeholders. They will not be guessed or replaced without approval.
- js/app.js contains a fallback image path Images/laptop icon.png that does not exist in the repository tree.
- js/app.js includes a portfolioProjects data array with generic sample projects and GitHub placeholder links, but this data is not rendered in the current index.html. Removing or publishing that content would be a content decision, so it should be left alone unless separately approved.
- Existing footer tagline is “Building beautiful solutions for real problems.” The supplied brand tagline is “Digital Solutions. Real Results.” The new tagline can be introduced as an additional brand line without deleting existing copy unless the owner requests replacement.

### 6. Backend and deployment risks (reported, not changed in the visual polish)

- js/app.js:274 defaults the contact API to http://localhost:5000/api. This will fail on a Netlify-hosted site unless an external API URL is supplied.
- backend/routes/api.js:36, :54, :79 and :104 expose submission read/list/update/delete endpoints without authentication. The admin dashboard calls them directly (backend/admin-dashboard.html:295-300). This is a serious privacy/security concern because contact submissions contain personal information. An authentication design and hosting decision are required before remediation.
- backend/utils/emailService.js interpolates name, subject, email and message into HTML at :41-53 and :74-80 without HTML escaping. This is an HTML injection risk.
- backend/server.js:8 and :15 use a single CORS_ORIGIN string and a permissive local default. Production CORS settings must match the deployed frontend and API origin.
- backend/admin-dashboard.html hardcodes localhost:5000 at :295.
- Netlify deployment of the static site does not itself deploy the Express backend. The live API host and environment configuration are not documented in the repository.

### 7. SEO, metadata and configuration

- The current title at index.html:6 is generic and no complete description, canonical, Open Graph/Twitter card, theme-color or JSON-LD ProfessionalService metadata was found in the inspected head.
- No sitemap.xml, robots.txt, netlify.toml or _headers file exists in the repository tree.
- favicon.png exists, but a complete favicon set and branded social share image are absent.
- There is no root package.json/build pipeline. The site is deployed as static files and the backend has a separate package.json.
- Root .gitignore currently ignores .env, logs, build/dist and VS Code settings; backend/.gitignore additionally covers local environment files and dependencies. Local data/submissions.json is only commented out in the backend ignore file and should be ignored.

### 8. Lighthouse estimate

No Lighthouse or real browser run was available. Scores are therefore not claimed. Based on source inspection only:
- Performance: likely held back by the 2.08 MB hero background, GIFs, animation/scroll work and third-party scripts.
- Accessibility: likely below target due to disabled zoom, missing skip/focus/menu semantics, undersized tap targets and emoji-only controls.
- Best Practices: at risk due to external scripts and missing rel=noopener on target=_blank links; backend risks are separate from the static page audit.
- SEO: likely below target because metadata, canonical, structured data, sitemap and robots are incomplete.

A 95+ score cannot be promised before running Lighthouse against the branch preview and addressing any remaining measured findings.

## Verification matrix

| Viewport | Source-level expectation | Browser verification |
|---|---|---|
| 360px | Dedicated breakpoint exists; tiny 13px root font and compact tiles are risk areas | Not run |
| 390px | Inherits <=480px rules; no dedicated breakpoint | Not run |
| 414px | Inherits <=480px rules; partner marquee conflict remains | Not run |
| 768px | <=768px layout changes; fixed controls and tablet stacking need review | Not run |
| 1024px | <=1024px partner/card adjustments; default desktop nav behavior needs review | Not run |
| 1440px | Desktop defaults; fixed chat and hero background effects need review | Not run |

## Planned implementation sequence

1. Apply the audit as a documentation-first commit before changing application code.
2. Correct viewport, semantic structure, mobile navigation and contact form placement.
3. Consolidate brand tokens and mobile-first responsive rules; use 48px targets and 16px form controls.
4. Replace emoji icons with inline SVG, and add reduced-motion-safe transform/opacity reveals.
5. Fix Vue initialization and remove unused animation code/scroll handlers.
6. Optimize images where source tooling permits, preserve fallbacks and add intrinsic dimensions/lazy loading.
7. Complete SEO and Netlify static hosting configuration.
8. Consolidate root documentation into /docs and rewrite README.md.
9. Review diffs, validate syntax/source-level checks and open a PR for branch-preview QA.

## Items requiring owner decision or external verification

- Confirm the live backend API URL and hosting provider before changing the contact form endpoint.
- Confirm real destination URLs for the two partner example.com links.
- Decide whether the generic unused portfolioProjects data should be deleted or retained for future use.
- Decide whether the existing footer tagline should remain alongside “Digital Solutions. Real Results.” or be replaced.
- Browser-based checks at all requested widths, iOS/Android device QA, keyboard/screen-reader testing, image visual review and Lighthouse scores remain unverified.
