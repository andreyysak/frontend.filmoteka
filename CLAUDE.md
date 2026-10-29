# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Filmoteka** is a learning project for studying Angular: a movie catalog on the real TMDB API (`developer.themoviedb.org`) with search, movie and person pages, and a personal watchlist with ratings and notes. The user writes in Ukrainian.

It is built step by step from the course plan in `docs/practice-angular.md`, **Part 1 only** (Steps 01–24, one Angular topic per step). Part 2 of that file (the final project "Stayzy") is **out of scope for this repo**. Ignore it.

- Each step has **Основне** (required), **Ускладнення** (optional extras) and **Перевір себе** (self-check questions). Steps build on each other, so do them in order.
- The goal is for the user to learn. Unless they ask for a full implementation, explain things, give hints and review their code instead of writing the whole step for them. The plan asks them to try on their own for 20–30 minutes before looking at a solution.
- Commit after each step, using the format `step 12: forms`.
- The plan asks for written notes in `NOTES.md` (Steps 01, 09, 16) and `PERF.md` (Step 21).
- Some steps ask for throwaway work in a **separate git branch**: an NgModule app in Step 09, a classic NgRx Store in Step 16. Keep that work off the main line of development.

## Visual design

The UI must match the Claude Design project **Filmoteka** (`Filmoteka.dc.html`):
https://claude.ai/design/p/360d71e1-0e97-4d1c-a656-4f8f3298404f?file=Filmoteka.dc.html

That link needs a claude.ai login, so it can't be fetched with plain HTTP. When building UI, take colors, typography, spacing and component look from that design, and keep them as shared tokens (CSS custom properties in `src/styles.scss`) instead of hard-coding values in each component. If the design isn't available in the session, ask the user for an export or screenshots rather than inventing a style.

## Commands

```bash
npm start                                   # ng serve → http://localhost:4200 (development config)
npm run build                               # production build → dist/ (budgets enforced, see angular.json)
npm run watch                               # development build in watch mode
npm test                                    # ng test: Vitest + jsdom via @angular/build:unit-test
npx ng test --include src/app/app.spec.ts   # run a single spec file
npx ng test --watch=false                   # single run (CI style)
npx prettier --write "src/**/*.{ts,html,scss}"
npx ng generate component features/movies/movie-card   # SCSS by default, prefix "app"
```

There is no linter yet. Step 17 adds angular-eslint (`ng lint`). The Angular CLI MCP server is set up for VS Code in `.vscode/mcp.json`.

## Stack and conventions

- **Angular 21** with the `@angular/build` (esbuild) builders, TypeScript 5.9, RxJS 7.8. Tests use **Vitest** (not Karma/Jasmine), so the "switch to Vitest" extra in Step 22 is already done.
- **Zoneless by default:** there is no `zone.js` dependency, and `app.config.ts` only provides `provideBrowserGlobalErrorListeners()` and `provideRouter(routes)`. Expect the change-detection behavior of Steps 02 and 16 (OnPush, things that stop updating) to look different from older tutorials. View updates come from signals, `async` pipe, and events.
- **Angular 21 file naming:** no `.component` suffix (`app.ts`, `app.html`, `app.scss`, class `App`). Generated files follow the same style.
- Strict TypeScript (`strict`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`) and strict Angular templates (`strictTemplates`, `strictInputAccessModifiers`, `strictInjectionParameters`).
- New code uses modern Angular: standalone components, `@if`/`@for`/`@switch`/`@defer`, signals (`signal`, `computed`, `input()`, `output()`, `model()`), and `inject()`. Old APIs (`NgModule`, `*ngIf`, `@Input()`/`@Output()` decorators) show up only where a step explicitly asks to try them before migrating.
- Prettier: `printWidth: 100`, single quotes, Angular parser for `.html`. `.editorconfig` sets 2-space indentation.

## Target architecture (built up across the steps)

The repo is currently a fresh `ng new` scaffold: `routes` is empty and `app.html` is the placeholder page. The plan leads to this structure:

- **Folder layout (Step 09):** `src/app/features/{movies,people,watchlist}` plus `src/app/shared/` (UI components, directives, pipes).
- **Routes (Step 10):** `/` (popular), `/search?q=`, `/movie/:id`, `/person/:id`, `/watchlist` (behind a functional `authGuard` with a fake `localStorage` login), and `**` for a 404 page. Each feature is lazy-loaded with `loadComponent`/`loadChildren`, and route params arrive as component inputs via `withComponentInputBinding()`.
- **Data layer (Steps 11, 13):**
  - `TmdbService` holds typed methods (`getPopular`, `search`, `getMovie`, `getCredits`, `getPerson`).
  - `InjectionToken`s `TMDB_API_URL` and `TMDB_IMAGE_URL` are provided in `app.config.ts`.
  - Functional interceptors: `apiKeyInterceptor` (adds the TMDB key to TMDB requests only) and `errorInterceptor` (shows toast messages).
  - Models: `Movie`, `MovieDetails`, `Person`, and a generic `Paged<T>`.
- **Watchlist state:** `WatchlistService` saves to `localStorage` (Step 11). It moves to signals with `computed` counters and an `effect` that persists the list (Step 15), and then to an NgRx Signal Store (Step 16). Each item has a status of `planned` / `watching` / `watched`.
- **TMDB API key:** it lives in Angular `environment` files (create them with `ng generate environments`). The key must not be committed, so keep the file that holds it in `.gitignore`.
- **Later steps** add SSR via `@angular/ssr` (Step 18, so `localStorage`/`window` access must be browser-guarded), `@angular/localize` with `uk`/`en` (Step 23), and animations (Step 24).
