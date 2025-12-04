# Source Header Comments Reference

Combined file names, locations, and the existing UX header comment blocks for all JS/JSX/CSS files under `src/`.

## src/App.css
```
/* -----------------------------------------------------------------------------
   App.css
   Global application styles layered atop MUI defaults.

   - Sets base layout spacing, typography tweaks, and section padding.
   - Provides responsive utilities for the landing page sections and shared
     components.
   - Coordinates with index.css to avoid style duplication.

   Accessibility
   - Uses readable line heights, generous spacing, and contrast-friendly colors.
   - Respects prefers-reduced-motion where animations/transitions are defined.

   How to customize
   - Adjust section padding, max-widths, and breakpoints to fit new content.
   - Add theme-aware CSS variables to keep light/dark parity without inline styles.
   ----------------------------------------------------------------------------- */
```

## src/App.jsx
```
// -----------------------------------------------------------------------------
// App.jsx
// Top-level router and page composition.
//
// - Defines routes for the landing experience (sections) and dedicated pages.
// - Accepts `mode` and `setMode` from main.jsx and passes them to LayoutShell/Header
//   for theme toggling UI.
// - Uses scroll helpers so navigation between sections is smooth and predictable.
//
// Accessibility
// - Routes render semantic <section> landmarks with headings for screen-reader
//   navigation.
// - Works with the router to avoid jarring focus loss on in-page jumps.
//
// How to customize
// - Add or remove routes by importing new pages and updating the <Routes> map.
// - Reorder or swap landing sections directly in the home route’s JSX.
// - Extend scroll handling to move focus on “virtual page changes.”
// -----------------------------------------------------------------------------

```

## src/components/CaseStudyCard.jsx
```
// -----------------------------------------------------------------------------
// components/CaseStudyCard.jsx
// Card component to showcase a case study/portfolio item.
//
// - Receives data (title, summary, tags, links) and renders a clickable card.
// - Stateless aside from hover/focus styling handled by the parent or theme.
//
// Accessibility
// - Card uses semantic headings and links; ensure the entire card is reachable by
//   keyboard and has discernible link text.
// - Provide alt text for thumbnails and aria-labels for icon links.

// How to customize
// - Add metrics, status badges, or interaction states (selected/featured).
// - Configure layout (vertical/horizontal) via props for different grids.
// -----------------------------------------------------------------------------
```

## src/components/EditorialHero.jsx
```
// -----------------------------------------------------------------------------
// components/EditorialHero.jsx
// Hero component used for editorial-style intros.
//
// - Accepts title, subtitle, and action props; lays them out with typography
//   emphasis and optional media.
// - Stateless; actions bubble up through onClick/links.
//
// Accessibility
// - Uses heading hierarchy with supporting text; ensures buttons/links are labeled.
// - Maintain alt text for any accompanying imagery or icons.
//
// How to customize
// - Swap typography scale, background treatment, or CTA arrangement.
// - Add slot props for illustrations or metrics without changing consumers.
// -----------------------------------------------------------------------------
// Cleaned, structured hero layout with editorial grid, accessible headings,
// consistent spacing, and improved image container behavior.

```

## src/components/Header.jsx
```
// Updated: 2025-11-20 · 18:55 ET  // 6:55 PM · Thursday, November 20, 2025

// -----------------------------------------------------------------------------
// components/Header.jsx
// Site header with navigation and theme controls.
//
// - Receives `mode`, `setMode`, active section info, and scroll handlers from
//   LayoutShell/App.
// - Manages small local state for menus or responsive toggles (e.g., drawer).
//
// Accessibility
// - Uses nav landmarks and lists for links; ensures focusable elements for menu
//   toggles.
// - Theme switch and nav links include aria-labels and keyboard support.
//
// How to customize
// - Add nav items, social links, or secondary actions.
// - Swap menu patterns (mega menu, dropdown) while keeping aria-expanded/controls
//   wired correctly.
// -----------------------------------------------------------------------------
```

## src/components/LayoutShell.jsx
```
// -----------------------------------------------------------------------------
// components/LayoutShell.jsx
// Shared layout wrapper for pages.
//
// - Provides persistent header, main container, and optional footer/skip link.
// - Accepts children content plus props like `mode`/`setMode` for header controls.
// - Manages spacing and max-width so sections stay consistent.
//
// Accessibility
// - Includes skip-to-content patterns and logical landmark structure.
// - Ensures header remains keyboard-accessible and non-obtrusive when sticky.
//
// How to customize
// - Swap header/footer components or adjust max-width/padding tokens.
// - Add global banners (e.g., hiring notices) without touching page components.
// -----------------------------------------------------------------------------
// Wraps the app with HeaderNameVisibilityProvider + Header + <main>.

```

## src/components/PageContainer.jsx
```
// -----------------------------------------------------------------------------
// components/PageContainer.jsx
// Generic container that standardizes page width and padding.
//
// - Wraps children with consistent spacing and optional background styling.
// - Stateless; purely presentational with props for variant or maxWidth.
//
// Accessibility
// - Keeps content width readable to reduce cognitive load.
// - Should preserve semantic structure from child components (no extra landmarks).
//
// How to customize
// - Adjust maxWidth or padding tokens; add variants for full-bleed sections.
// - Introduce responsive props to tune spacing per breakpoint.
// -----------------------------------------------------------------------------
```

## src/components/Section.jsx
```
// -----------------------------------------------------------------------------
// components/Section.jsx
// Reusable section wrapper for landing-page blocks.
//
// - Accepts id, title, and children to render a consistent heading + content area.
// - May apply theme-aware styling and spacing; minimal to no internal state.
//
// Accessibility
// - Renders semantic <section> with an <h2>/<h3> based on props for SR navigation.
// - Supports skip links/anchor targets via the provided id.
//
// How to customize
// - Add props for variant (compact, spacious) or alignment.
// - Extend to include optional description, breadcrumbs, or section-level actions.
// -----------------------------------------------------------------------------
// Layout primitive for page sections with optional title, variants, and layouts.

```

## src/components/SkillGroup.jsx
```
// -----------------------------------------------------------------------------
// components/SkillGroup.jsx
// Displays grouped skills or tools.
//
// - Receives an array of skills and renders them as chips/list items.
// - Stateless; formatting controlled by props or theme tokens.
//
// Accessibility
// - Use list semantics so screen readers understand grouped items.
// - Ensure chip styles keep focus outlines visible and text readable.

// How to customize
// - Add proficiency indicators or categories.
// - Make layout responsive (columns/rows) via additional props.
// -----------------------------------------------------------------------------

```

## src/components/resume/ResumeExperience.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeExperience.jsx
// Renders work experience entries.
//
// - Maps over experience data to output role, company, timeframe, and bullets.
// - Stateless; formatting driven by data and theme tokens.
//
// Accessibility
// - Uses headings and lists for duties/achievements; ensures date text is readable.
// - Include aria-labels for external links and keep focus states visible.
//
// How to customize
// - Add filters (by role/industry) or expandable details per job.
// - Support condensed and detailed variants via props.
// -----------------------------------------------------------------------------
```

## src/components/resume/ResumeHero.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeHero.jsx
// Top banner for the resume page.
//
// - Receives meta data (name, title, location, contact) and renders headline
//   content with key actions.
// - Stateless; data flows in via props from pages/MyResume or sections.
//
// Accessibility
// - Uses <header>/<section> semantics with an <h1>; contact links have clear labels.
// - Ensure any decorative icons are aria-hidden to reduce noise.
//
// How to customize
// - Add social/profile links, availability tags, or download buttons.
// - Adjust layout for print vs. web by toggling typography/spacing props.
// -----------------------------------------------------------------------------
```

## src/components/resume/ResumeMetaCard.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeMetaCard.jsx
// Compact card for meta information (location, timezone, contact).
//
// - Receives structured props from resumeData and renders labeled rows.
// - Stateless; purely presentational with optional action links.
//
// Accessibility
// - Use semantic lists/definition lists for label/value pairs.
// - Keep link text descriptive; ensure icons include aria-labels if clickable.
//
// How to customize
// - Add new meta fields (visa status, languages) by extending props/data.
// - Provide layout variants for sidebars vs. inline blocks.
// -----------------------------------------------------------------------------
```

## src/components/resume/ResumeRecruiterCard.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeRecruiterCard.jsx
// Card aimed at recruiters with quick highlights.
//
// - Consumes resumeData to present availability, role interests, or key metrics.
// - Stateless; interactions (email/links) bubble via anchor elements.
//
// Accessibility
// - Structured with headings and lists so screen readers can skim quickly.
// - Maintain sufficient contrast on badges/labels.
//
// How to customize
// - Swap highlighted fields to target different audiences.
// - Add CTA buttons (book a call) with clear aria-labels.
// -----------------------------------------------------------------------------
```

## src/components/resume/ResumeSection.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeSection.jsx
// Container for resume sub-sections (experience, education, skills).
//
// - Accepts title/id and children; coordinates spacing and anchors for navigation.
// - Stateless; any filtering/pagination happens in child components.
//
// Accessibility
// - Renders as <section> with proper heading levels to maintain hierarchy.
// - Provides ids for skip links and side navigation targeting.
//
// How to customize
// - Add props for variant styling or collapsible behavior.
// - Include optional description text or metadata near the heading.
// -----------------------------------------------------------------------------
```

## src/components/resume/ResumeSectionNav.jsx
```
// -----------------------------------------------------------------------------
// components/resume/ResumeSectionNav.jsx
// Side or top navigation for jumping between resume sections.
//
// - Receives list of sections and active section id; highlights the active link.
// - Uses click/scroll handlers passed from parent to manage navigation state.
//
// Accessibility
// - Uses nav + list semantics; links are keyboard focusable with visible outlines.
// - Consider moving focus to target section headings when clicking nav items.
//
// How to customize
// - Add tooltips, icons, or progress indicators to nav items.
// - Support vertical/horizontal layouts based on available space.
// -----------------------------------------------------------------------------
```

## src/components/resume/shared/MetaRow.jsx
```
// -----------------------------------------------------------------------------
// components/resume/shared/MetaRow.jsx
// Shared row component for label/value pairs in resume cards.
//
// - Receives label, value, and optional icon; renders a single row consistently.
// - Stateless; styling controlled by parent/resume theme.
//
// Accessibility
// - Use semantic markup (e.g., <div role="listitem"> or dl/dt/dd patterns) to
//   convey relationships.
// - Icons should be aria-hidden unless they convey meaning.
//
// How to customize
// - Add tooltip/supporting text props or allow custom render functions.
// - Adjust spacing/alignment to match new card designs.
// -----------------------------------------------------------------------------
```

## src/components/resume/shared/NameWithPronunciation.jsx
```
// -----------------------------------------------------------------------------
// components/resume/shared/NameWithPronunciation.jsx
// Displays the candidate’s name with pronunciation guidance.
//
// - Accepts name text and optional pronunciation link/audio cue.
// - Stateless; simply formats text and auxiliary info from props.
//
// Accessibility
// - Provide aria-labels for pronunciation links or audio controls.
// - Ensure pronunciation text is readable and distinguishable from the name.
//
// How to customize
// - Add audio playback controls or IPA notation.
// - Swap layout (inline vs. stacked) to fit different hero designs.
// -----------------------------------------------------------------------------

```

## src/content/resumeData.js
```
// -----------------------------------------------------------------------------
// content/resumeData.js
// Structured data that powers resume pages/sections.
//
// - Exports JSON-like objects/arrays for experience, projects, education, and
//   meta details consumed by resume components.
// - No internal state: React components read and render this data directly.
//
// Accessibility
// - Keeping data structured enables semantic rendering (lists, headings, dl/dt).
// - Ensure strings include meaningful labels (e.g., role, timeframe) for screen
//   readers.
//
// How to customize
// - Add fields (e.g., metrics, links) and update renderers to display them.
// - Localize strings or swap datasets for different audiences/markets.
// -----------------------------------------------------------------------------


```

## src/context/HeaderNameContext.jsx
```
// -----------------------------------------------------------------------------
// context/HeaderNameContext.jsx
// Context provider for whether the header should display the name chip.
//
// - Holds `showName` state in a React context so header components can read or
//   toggle the visibility flag.
// - Exposes `HeaderNameVisibilityProvider` to wrap layouts and
//   `useHeaderNameVisibility` to consume the state.
//
// Accessibility
// - Centralizing the visibility flag prevents surprising layout shifts as users
//   navigate or scroll.
// - Hook consumers can coordinate focus management when the name chip appears or
//   hides.
//
// How to customize
// - Add more metadata to the context (e.g., current section) if header behavior
//   expands.
// - Wire in persistence (localStorage) or thresholds if you tie visibility to
//   scroll cues.
// -----------------------------------------------------------------------------

```

## src/hooks/useActiveSection.js
```
// -----------------------------------------------------------------------------
// hooks/useActiveSection.js
// Tracks which page section is currently active in the viewport.
//
// - Uses IntersectionObserver or scroll listeners to set active section ID/state.
// - Exposes the active section and callbacks so nav elements can highlight links.
//
// Accessibility
// - Helps keep skip links and navigation in sync with visible content for keyboard
//   and screen-reader users.
// - Ensure focus handling complements the visual active state.
//
// How to customize
// - Tune thresholds/margins for when a section becomes “active.”
// - Extend return values to include scrollTo helpers or focus management.
// -----------------------------------------------------------------------------
```

## src/hooks/useHeaderNameVisibility.js
```
// -----------------------------------------------------------------------------
// hooks/useHeaderNameVisibility.js
// Determines when the header’s name/branding should appear or hide.
//
// - Observes scroll position and exposes a boolean/flag to toggle UI elements.
// - State lives inside the hook; consuming components read the visibility value.
//
// Accessibility
// - Prevent abrupt layout shifts that could disorient users relying on focus.
// - Combine with aria-live regions only if the visibility change conveys status.
//
// How to customize
// - Adjust scroll thresholds, debounce timing, or triggers for different layouts.
// - Expose more metadata (e.g., current section) if header behavior becomes richer.
// -----------------------------------------------------------------------------
```

## src/hooks/useLocalTime.js
```
// -----------------------------------------------------------------------------
// hooks/useLocalTime.js
// Custom hook for deriving local time info.
//
// - Manages internal state for current time and updates on an interval.
// - Returns formatted strings/objects to display availability or greetings.
//
// Accessibility
// - Avoid overly frequent updates to prevent screen reader churn.
// - Consumers should render times inside semantic <time> elements.
//
// How to customize
// - Accept options for update frequency, time zones, or formatting styles.
// - Memoize heavy computations if you add locale-sensitive logic.
// -----------------------------------------------------------------------------
```

## src/index.css
```
/* -----------------------------------------------------------------------------
   index.css
   Base resets and typography tokens.

   - Normalizes margins, box sizing, and font stacks for the entire app.
   - Defines root-level variables for colors/spacing that pair with the MUI theme.
   - Provides body-level backgrounds and link styles.

   Accessibility
   - Targets sufficient contrast for text and links; keep vars aligned with WCAG.
   - Leaves focus outlines visible so keyboard users can track focus.

   How to customize
   - Update :root variables to rebrand quickly.
   - Add global motion preferences (prefers-reduced-motion) or high-contrast tweaks.
   ----------------------------------------------------------------------------- */
```

## src/main.jsx
```
// -----------------------------------------------------------------------------
// main.jsx
// Application entry point that mounts the React app.
//
// - Decides the initial color mode (saved preference → system preference → light)
//   and keeps it in state; persists updates to localStorage.
// - Creates the MUI theme via getAppTheme(mode) and provides it through ThemeProvider,
//   alongside CssBaseline and BrowserRouter for routing.
// - Passes `mode` and `setMode` into <App> so all pages can toggle themes.
//
// Accessibility
// - Router + Theme providers live here to keep the tree consistent for focus/scroll
//   management and predictable color contrast across the app.
// - Ensure the root element in index.html has a `lang` attribute and logical title,
//   since this is the hydration point.
//
// How to customize
// - Add global providers (analytics, i18n, feature flags) around <App>.
// - Swap BrowserRouter for a different router or hydration entry when needed.
// - Extend getInitialMode to support more schemes (high-contrast, sepia).
// -----------------------------------------------------------------------------

```

## src/pages/MyResume.jsx
```
// -----------------------------------------------------------------------------
// pages/MyResume.jsx
// Standalone resume page using structured resumeData.
//
// - Pulls content from content/resumeData.js and passes it into resume components
//   (meta, experience, navigation).
// - Minimal local state; relies on child components for interactions.
//
// Accessibility
// - Sections render semantic headings and lists; navigation supports clear labeling.
// - Keep tab order logical and ensure anchors have visible focus styles.
//
// How to customize
// - Swap data objects to create role-specific resumes.
// - Adjust which resume components render (e.g., hide navigation on print views).
// -----------------------------------------------------------------------------
```

## src/pages/Portfolio.jsx
```
// -----------------------------------------------------------------------------
// pages/Portfolio.jsx
// Portfolio landing page aggregating hero and core sections.
//
// - Composes shared sections (hero, about, philosophy, work, contact) into a page.
// - Receives nav helpers/props from App to enable smooth scroll or mode toggles.
//
// Accessibility
// - Each section renders semantic landmarks; keep heading hierarchy consistent.
// - Ensure in-page navigation moves focus when treating sections like pages.
//
// How to customize
// - Reorder or replace sections to create alternate landing experiences.
// - Inject new props (e.g., feature flags) to test variants without rewriting.
// -----------------------------------------------------------------------------
```

## src/pages/WhatImWorkingOn.jsx
```
// -----------------------------------------------------------------------------
// pages/WhatImWorkingOn.jsx
// Dedicated page showcasing current work streams.
//
// - Receives data (projects/initiatives) and renders them as cards/sections.
// - Mostly presentational; relies on parent routing and shared layout wrappers.
//
// Accessibility
// - Uses semantic headings and lists for projects; ensure link text is descriptive.
// - Respect keyboard navigation order when adding new cards or CTAs.
//
// How to customize
// - Swap in different data sources or filters to highlight specific work.
// - Adjust layout components (grid/stack) for more or fewer columns responsively.
// -----------------------------------------------------------------------------
```

## src/sections/AboutSection.jsx
```
// -----------------------------------------------------------------------------
// sections/AboutSection.jsx
// “About me” content block.
//
// - Renders narrative copy and supporting details from props or static content.
// - Typically stateless; any interactions (links, buttons) bubble to parents.
//
// Accessibility
// - Semantic <section> with headings and paragraphs; keep lists marked up properly.
// - Ensure any inline links have clear, specific labels.
//
// How to customize
// - Replace copy or add sub-sections (values, timeline) while keeping hierarchy.
// - Introduce illustrative media with alt text for screen readers.
// -----------------------------------------------------------------------------
// Wrapper around <Section> for the "About me" content on the home page.

```

## src/sections/ContactSection.jsx
```
// -----------------------------------------------------------------------------
// sections/ContactSection.jsx
// Contact/CTA block for outreach.
//
// - Renders contact channels (email, socials) and possibly a contact form/CTA.
// - Stateless beyond click handlers; data passed from parent or constants.
//
// Accessibility
// - Use a clear heading and descriptive link text; ensure tap targets are large.
// - Provide aria-labels for icon-only links and respect focus outlines.
//
// How to customize
// - Add calendars, forms, or availability widgets; wire submissions to services.
// - Rearrange channels to prioritize preferred contact methods.
// -----------------------------------------------------------------------------
// Wrapper around <Section> for the "Contact" content on the home page.

```

## src/sections/HeroSection.jsx
```
// Updated: 2025-11-20 · 16:45 ET  // 4:45 PM · Thursday, November 20, 2025

// -----------------------------------------------------------------------------
// sections/HeroSection.jsx
// Landing-page hero introducing the portfolio owner.
//
// - Receives props for scroll handlers and theme toggles; renders primary CTA(s).
// - Stateless presentation beyond handling button/link clicks routed upward.
//
// Accessibility
// - Uses a top-level <section> with an <h1> and descriptive text for SR users.
// - Ensure CTAs have aria-labels when icon-only and maintain focus styling.
//
// How to customize
// - Swap imagery, CTA targets, or copy without changing layout logic.
// - Add split-hero variants (media + text) by extending the container styles.
// -----------------------------------------------------------------------------
// Section wrapper for the home page hero, restoring consistent padding/grid.

```

## src/sections/HowIWork.jsx
```
// -----------------------------------------------------------------------------
// sections/HowIWork.jsx
// Walkthrough of process or working style.
//
// - Iterates over step data to render timeline/process cards.
// - Stateless aside from any optional hover/focus UI handled inline.
//
// Accessibility
// - Prefer ordered lists for process steps and maintain heading hierarchy.
// - Include clear labels for links/downloads and ensure focus visibility.
//
// How to customize
// - Swap steps or add visuals (icons, illustrations) with descriptive alt text.
// - Adjust spacing/breakpoints to keep steps readable on small screens.
// -----------------------------------------------------------------------------

```

## src/sections/PhilosophySection.jsx
```
// -----------------------------------------------------------------------------
// sections/PhilosophySection.jsx
// Explains design philosophy or principles.
//
// - Maps over principle data to render cards/rows; minimal internal state.
// - Data usually passed as props or imported constants.
//
// Accessibility
// - Use lists/headings for principles; keep contrast and focus states consistent.
// - Support reduced motion if animations are added to principle cards.
//
// How to customize
// - Add metrics or examples per principle; adjust layout for more columns.
// - Localize principle titles/descriptions for different audiences.
// -----------------------------------------------------------------------------

```

## src/sections/ResumeSection.jsx
```
// -----------------------------------------------------------------------------
// sections/ResumeSection.jsx
// Embedded resume preview on the landing page.
//
// - Imports resumeData and feeds it into condensed resume components.
// - No heavy state; selections or filters are handled by child components if any.
//
// Accessibility
// - Presents content with semantic headings and lists; keep link text meaningful.
// - Coordinate with navigation so keyboard users can reach all resume entries.
//
// How to customize
// - Choose which resume slices to surface (experience, meta, education).
// - Add toggles (e.g., show more/less) by introducing local state here.
// -----------------------------------------------------------------------------
// Wrapper around <Section> for the "Resume" content on the home page.

```

## src/theme.js
```
// -----------------------------------------------------------------------------
// theme.js
// Builds the MUI theme object used across the app.
//
// - Exposes getAppTheme(mode) to generate a palette/typography system for light
//   or dark modes.
// - Central place to manage spacing, fonts, and component overrides.
//
// Accessibility
// - Palette choices should meet contrast ratios; adjust here to fix violations.
// - Typography scale and weights can be tuned to improve readability.
//
// How to customize
// - Extend the theme with custom components or design tokens.
// - Add shape, z-index, or breakpoint overrides to match a new design system.
// -----------------------------------------------------------------------------
```

## src/utils/timeZone.js
```
// -----------------------------------------------------------------------------
// utils/timeZone.js
// Helper for presenting local time zones.
//
// - Exposes pure functions (e.g., formatting or offset helpers) with no React
//   state.
// - Consumed by components that show availability or current time.
//
// Accessibility
// - Keeps time strings human-readable; pair with <time> elements for better SR
//   support.
// - Ensure formatted values include time zone abbreviations to avoid ambiguity.
//
// How to customize
// - Extend with more formats or locale-aware options.
// - Swap in Intl APIs for richer translations without changing callers.
// -----------------------------------------------------------------------------
```

