# Website Polish: implementation report

Branch: `polish-mobile-animations`  
Base: `main`  
Date: 2026-11-14

## Before and after

### Mobile and accessibility
- Replaced the zoom-blocking viewport with `width=device-width, initial-scale=1, viewport-fit=cover`.
- Added a skip-to-content link, a semantic main landmark, focus-visible rings and explicit contact form labels.
- Reworked the floating navigation into a right-side drawer with a backdrop, close button, expanded/hidden states, Escape handling, keyboard focus cycling, focus restoration and body scroll locking.
- Replaced the floating contact widget with a contact form in the Contact section and a fixed mobile WhatsApp / Call / Email bar. The bar includes safe-area padding and is hidden while a virtual keyboard is detected.
- Added a WhatsApp quote strip and standardized WhatsApp and telephone actions to +234 814 382 4044.
- Replaced icon emoji in the main website UI with inline SVG artwork and added accessible names to social links.
- Raised mobile form controls to 16px, contact targets to 48px, and restored a 16px base text size at small widths.
- Added safe-area-aware spacing, dynamic viewport sizing, fluid heading sizes and reduced-motion support.

### Motion and visual system
- Added the requested navy, royal-blue, logo-blue and off-white CSS tokens, Inter / Barlow Condensed font stacks, motion durations and easing.
- Added light/dark token overrides using `[data-theme="dark"]`.
- Added observer-driven section reveals, a sticky navbar state, and a CSS scroll-progress line where scroll-driven animation is supported.
- Replaced the duplicated, auto-scrolling partner marquee/list with a single-card slideshow featuring previous/next controls, direct slide indicators, touch-swipe navigation, keyboard-operable buttons and reduced-motion-aware transitions.
- Removed the mobile parallax and its per-scroll background-position paint work.
- Removed the unused Anime.js CDN dependency and the unused carousel timer from the current page.
- Added touch press states and reduced-motion fallbacks.
- Corrected malformed legacy CSS blocks that had two unmatched closing braces.

### Content, metadata and delivery
- Updated the displayed location to “Remote-first, serving clients across Nigeria • Lagos & Oyo”.
- Replaced the outdated WhatsApp number and corrected “Web-AppS” / “ExperienceD”.
- Added title, description, canonical, Open Graph, Twitter card, theme-color and ProfessionalService JSON-LD metadata.
- Added a vector favicon, sitemap.xml, robots.txt, netlify.toml and _headers.
- Rewrote README.md for the actual static Vue 3 CDN + Express project and moved 22 older Markdown guides into docs/ (including backend guides under docs/backend/).
- Expanded root .gitignore for environment variants and local backend submissions.

## Remaining work / not verified

1. **Production contact API:** the frontend now reads `window.DEAN_API_BASE_URL`, but currently falls back to `http://localhost:5000/api`. The live Express API origin was not present in the repository. Configure the production API URL and CORS origin before relying on the hosted contact form.
2. **Backend access control:** the submissions list/read/delete endpoints have no authentication in the existing backend. Do not expose the admin dashboard or these endpoints publicly until access control is implemented.
3. **Email HTML escaping:** the backend email templates interpolate user-submitted fields into HTML. This needs a separate security patch and test.
4. **Partner URLs:** the OYO VIBES CARTEL and MEMOIRS OF WILDXHILD partner entries still use `https://example.com`. Real URLs must be supplied; none were guessed.
5. **Service carousel:** app.js contains unused service-carousel data, but index.html does not render a service carousel. The dead timer remains removed rather than adding a duplicate service interface. The Partners section now has its own manually controlled, swipeable slideshow.
6. **Image conversion:** the large 2.08 MB hero background and partner/service media have not been converted to WebP. Partner images now use real img elements with dimensions, alt text and lazy loading; service media also has dimensions and lazy loading. Existing image assets remain as fallbacks.
7. **Social share image:** Open Graph/Twitter currently use the existing logo PNG. A dedicated 1200×630 branded share card has not been created.
8. **Favicon set:** a new SVG favicon was added and the existing PNG retained. Separate 16px/32px/180px raster variants were not generated.
9. **Testing:** no browser automation, physical iPhone/Android testing, screen-reader session or Lighthouse run was available. No numeric Lighthouse scores or measured CLS are claimed.
10. **Branding detail:** the SVG favicon is a compact typographic/grid interpretation, not a pixel-exact export of the original raster logo.

## Motion specification

| Element | Trigger | Motion | Timing |
|---|---|---|---|
| Hero logo | Initial page load | Fade + subtle settle | 700ms, cubic-bezier(0.22, 1, 0.36, 1) |
| Section content | Enters viewport | Opacity 0→1 and translateY(24px→0) | 700ms, same easing; one-time observer |
| Mobile drawer | Menu open/close | translateX + backdrop opacity | 400ms |
| Hamburger | Menu state change | Three-line to X using transform/opacity | 200–400ms |
| Cards | Hover / touch press | Small translateY / scale | 200ms |
| Navbar | Hero leaves viewport | Glass background and compact padding | 200–400ms |
| Scroll progress | Document scroll | scaleX(0→1), where supported | Scroll-linked |
| Reduced motion | OS preference enabled | No travel; near-instant transitions | 0.01ms override |

No mobile parallax is used. Decorative motion is limited to transform and opacity in the new motion system. Some legacy marquee effects remain in the stylesheet for the existing partner/service display; browser performance and reduced-motion behavior still need device QA.

## Mobile QA checklist

### Required viewport widths
- [ ] 360px: no horizontal overflow, readable service tiles, drawer fits viewport.
- [ ] 390px: no overflow, 48px actions, contact form remains legible.
- [ ] 414px: no overflow, social links wrap cleanly, no clipped partner content.
- [ ] 768px: tablet layout, drawer and partner cards remain usable.
- [ ] 1024px: tablet/desktop transition and navbar layout.
- [ ] 1440px: desktop spacing, hero and footer proportions.

### Device and interaction checks
- [ ] iPhone SE: Safari viewport, pinch zoom, safe areas and keyboard behavior.
- [ ] iPhone 14/15: dynamic island, bottom home indicator, keyboard and sticky actions.
- [ ] Google Pixel: Chrome, drawer focus, scroll reveal smoothness and form submission.
- [ ] Small Samsung: Samsung Internet, no horizontal scroll and usable tap targets.
- [ ] iPad: portrait/landscape layout, drawer behavior and partner display.
- [ ] Landscape orientation: no fixed panel obscures content.
- [ ] Keyboard-only: skip link, menu open/close, focus cycle, Escape, form labels and visible focus.
- [ ] Screen reader: landmarks, drawer announcement, icon labels and form status.
- [ ] Reduced motion: no logo travel, section rise or automatic marquee movement.
- [ ] Contact: WhatsApp, Call, Email and quote CTA destinations are correct.
- [ ] Form: configure the production API URL, submit a real test and verify success/error states.
- [ ] Lighthouse mobile: record Performance, Accessibility, Best Practices, SEO, LCP and CLS after the branch preview is deployed.

## Owner decisions needed

- Provide the production Express API URL and hosting provider, and confirm the production CORS origin.
- Supply the actual OYO VIBES CARTEL and MEMOIRS OF WILDXHILD partner website URLs.
- Confirm whether to add a new swipeable service carousel or keep the current static service cards.
- Approve a dedicated 1200×630 social share card if the logo-only share preview is insufficient.
