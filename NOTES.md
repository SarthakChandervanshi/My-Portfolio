# Environment & build notes (Portfolio.dc.html)

## Preview environment quirks (learned the hard way)
- IntersectionObserver NEVER fires in the preview iframe → use scroll-handler reveals (getBoundingClientRect vs vh*0.9).
- `scrollIntoView` is forbidden & doesn't work. Programmatic scroll: set `document.documentElement.style.scrollBehavior='auto'` FIRST, then `document.scrollingElement.scrollTop = N`, then `window.dispatchEvent(new Event('scroll'))`.
- html-to-image captures render from the actual scrolled position only if the page is genuinely scrolled; WebGL canvas needs `preserveDrawingBuffer:true` to capture.
- Preview viewport ≈ 924×540.
- THREE r149 UMD from unpkg works: https://unpkg.com/three@0.149.0/build/three.min.js (window.THREE).

## CRITICAL: CSS transitions/animations FREEZE in agent/verifier iframes
- document.getAnimations() shows CSSTransitions stuck at currentTime 0, startTime null — forever. rAF works fine (60fps). User's live view is healthy.
- Therefore ALL reveal/scroll animation must be rAF tweens (revealNow) with style.transition='none'. Never rely on CSS transitions for anything that must be verified or critical to visibility.

## CRITICAL re-render rule (verifier-confirmed bug, fixed)
- React re-renders (any setState) re-apply TEMPLATE inline styles, wiping imperatively-set styles on elements whose template declares them (e.g. data-reveal `opacity:0`). With 0.9s transitions, repeated re-renders pin content invisible.
- FIX: never setState in the scroll path. Nav active underline = imperative via `[data-navunderline]` spans. Only setState: theme toggle, form submit. `componentDidUpdate()` re-asserts `__shown` reveals + calls handleScroll() as safety net.

## Design state (v3.1 - current)
- DARK MODE ONLY (user request m0110): state.theme='dark', toggle removed, nav has "Get in touch" pill instead. muted=#a1a1a6 for readability over particles. Particle baseOpacity 0.8, section keyframe opacities lowered (0.55/0.22/0.16), object fades to o:0 (shrinking cluster) BEFORE #contact — no animation in contact section.
- Hero caps 1/2 use inset:0 28px (absolute caps ignore container padding otherwise).
- More quirks learned: hot-reload (dc_js_str_replace) can leave stale handlers/caption state — always re-verify on a TRUE fresh load (navigate to another file, then back; show_html same path can no-op). Component instance reachable via __reactFiber$ walk (fib.return until stateNode.handleScroll) for debugging.
- Apple theme: dark #000/#f5f5f7/#2997ff accents; buttons #0071e3. System SF font stack.
- 3D particle journey keyframes in buildAnchors(): sphere(hero)→helix→wave(hero captions)→galaxy(about, left)→wave wide dim(work bg)→helix(experience, left)→torus(skills, right)→fade out before contact.
- Hero: 240vh sticky, 3 cross-fading captions. Work: 300vh pinned horizontal card row. rAF tween reveals (revealNow), counters, word-reveal, nav underline — ALL imperative, no CSS transitions.
- User content source: sarthakchandervanshi.uk (all data embedded in renderVals).
