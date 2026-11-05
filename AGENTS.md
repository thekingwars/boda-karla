# Agent Guidelines

These rules apply to the entire project. They draw on the [Modern React Project template](https://agentsmd.net/agents-md-examples/modern-react-project-template/) and [Vercel's React Best Practices](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/AGENTS.md), adapted for a Vite single-page application. Do not apply guidance specific to Next.js, Server Components, or server routes to this project.

## Project

This repository is a single-page application built with React 19, TypeScript 7, and Vite 8. Keep it simple: add dependencies, directories, or configuration only when a feature needs them.

## Current Tooling

- React and React DOM for the interface.
- TypeScript for application code.
- Vite with `@vitejs/plugin-react` for development and builds.
- GSAP, ScrollTrigger, and `@gsap/react` for animations.
- Oxlint for static analysis.
- npm for installing dependencies and running scripts.

The project does not yet include a router, state management library, HTTP client, test framework, Tailwind, Prettier, or Husky. Do not write instructions or code that depend on them unless installing and configuring them is part of the task.

## Structure

- `index.html`: Vite entry document.
- `src/main.tsx`: React entry point.
- `src/App.tsx`: main component.
- `src/App.css` and `src/index.css`: current styles.
- `public/`: static assets served as-is.
- `vite.config.ts`: Vite configuration.
- `tsconfig.app.json` and `tsconfig.node.json`: TypeScript configuration.
- `.agents/skills/`: project-local skills, including the GSAP skills.

As the project grows, organize code by purpose in `src/components/`, `src/pages/`, `src/hooks/`, `src/services/`, `src/types/`, or `src/utils/`. Do not create empty directories in advance.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run build` runs TypeScript compilation before the Vite build. Before delivering code changes, run `npm run lint` and `npm run build`. If either cannot run, explain why.

## Code and Architecture Rules

- Use function components and Hooks. Give each component a clear responsibility, and extract reusable pieces when there is a real reuse case.
- Put components in `.tsx` files and logic without JSX in `.ts` files. Use PascalCase for components and their filenames, and descriptive names starting with `use` for custom Hooks.
- Define explicit types for props, service contracts, and external data. Avoid `any`; use `unknown` and validate external values before using them.
- Preserve the existing conventions and style of files you edit. Avoid unrelated refactors and abstractions that serve only one use case.
- Prefer direct imports from specific modules when a large dependency offers multiple entry points. Avoid barrel files that pull unnecessary modules into the bundle.
- Do not install libraries ahead of need. Before adding a dependency, check that it solves a concrete problem that React or the current tooling cannot solve simply.

## State, Rendering, and Hooks

- Use local state and props for simple needs. Add context or a state management library only when shared state justifies the added complexity.
- Calculate values derived from props or state during render. Do not duplicate them in state or use an effect to keep them synchronized.
- Do not define components inside other components: React may remount them on every render and lose their state. Pass the required data through props.
- Run interaction logic in its event handler. Reserve `useEffect` for synchronization with browser APIs, subscriptions, and other external systems.
- Keep effect dependencies precise. Clean up listeners, subscriptions, timers, pending requests, and animations when applicable. Do not silence dependency warnings without addressing their cause.
- Use the functional form of `setState` when the next value depends on the previous one. Use lazy `useState` initialization for expensive initial values.
- Do not wrap trivial calculations in `useMemo` or simple functions in `useCallback` by default. Use memoization and transitions when measurements or slow interactions justify them.
- Store transient values that should not trigger rendering in `useRef`. Use stable keys for list items; avoid array indexes when the list can be reordered.
- In JSX, use explicit boolean conditions when `&&` could accidentally render `0` or `NaN`.

## Data and Asynchronous Effects

- Run independent operations concurrently with `Promise.all`; keep operations sequential when there is a real dependency.
- Do not load data or modules before a view needs them. Use `React.lazy` and dynamic imports for heavy screens or components outside the initial view, and provide a useful loading fallback.
- For requests made by components, show loading, error, empty, and success states when relevant. Avoid updating state after unmount or from an obsolete request; cancel with `AbortController` when possible.
- Share global event listeners when several components need the same event. Use passive listeners for scroll or touch events that do not call `preventDefault`, and remove listeners during cleanup.
- Treat API responses as untrusted data. Do not store secrets in the client. Avoid `dangerouslySetInnerHTML`; if external HTML must be rendered, sanitize it first.

## Interface, Accessibility, and Performance

- Preserve existing styles unless the task requires changing them. Do not add a UI library merely for convenience.
- Use semantic HTML, labels for controls, alternative text for informative images, keyboard navigation, and visible focus indicators. Interactive controls need accessible names and clear states.
- Design for small screens first, then check different viewport widths and enlarged text.
- Use appropriately sized images and lazy-load images outside the viewport. Do not defer the main content visible on initial load.
- Avoid interleaving style writes with DOM measurements in loops or frequent events. Group reads and writes to reduce layout recalculation.
- Before adding memoization, virtualization, `content-visibility`, or further bundle splitting, identify a real problem. Verify the impact of an optimization when possible.

## Future Features

- **Routing:** If multiple views are needed, add and configure a routing solution before using its imports. Include a route for unknown pages.
- **API:** Create service modules when a real API exists. Configure its URL with `VITE_` environment variables and document required values in `.env.example`. Never put secrets in `VITE_` variables because they are exposed to the browser.
- **Tests:** Add a test framework when logic or flows warrant automated tests. Test visible behavior, error states, and edge cases rather than component internals. Keep tests near the code or consistently under `tests/`.
- **Animations:** Consult the relevant GSAP skill in `.agents/skills/` when a task involves animation. Use the installed GSAP packages through scoped `useGSAP` hooks with cleanup, and respect reduced-motion preferences.
- **Performance:** Measure before optimizing. Use lazy loading, memoization, or code splitting when they solve a concrete problem.

## Delivery

Before delivering code changes, run `npm run lint` and `npm run build`; also run tests if they were added. Manually check affected interface flows when practical. Describe the changed files, checks performed, and any real limitations. Keep changes within the requested scope and preserve the user's existing work.
