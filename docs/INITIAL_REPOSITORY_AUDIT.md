# Initial Repository Audit

Audit scope: public GitHub repository `aceraspir25-ctrl/CA`, default branch `master`, inspected on 2026-11-20. This is a source-code review, not a penetration test or a successful production runtime test.

## Repository snapshot

- Framework: Next.js 16.4.6 App Router.
- UI/runtime: React 19.3, TypeScript 5, Tailwind CSS 4.
- State: Zustand with browser persistence.
- Integrations: Supabase JS, Gemini/OpenAI HTTP gateway, Telegram bot, S3-compatible storage, Upstash Redis.
- Source tree: 137 entries in the recursive tree, including app routes, API routes, data modules, components, libraries and Supabase schema.
- Default branch: `master`.
- Existing feature branch created for additive work: `feature/india-professional-academic-expansion`.

## Existing areas to preserve

- Landing page, login and signup routes.
- Dashboard layout, navigation and theme provider.
- Course catalogue, subject/chapter pages and curriculum data.
- AI tutor and provider gateway.
- Library, study packages, extracted video records and knowledge graph.
- Exams, tests, question bank and paper generation.
- Finance lab and progress tracking.
- Admin overview, agent dashboard and research pipeline.
- Telegram bot runner, webhook and bot messaging library.
- Supabase schema/client, cloud sync and storage adapters.

## Findings and risks

### Critical — credentials committed to source

The tracked `.env.example` contains what appears to be a real Telegram bot token, and the Telegram webhook route also contains a hard-coded token fallback.

Required response:
1. Revoke/regenerate the Telegram bot token immediately through BotFather.
2. Set the replacement only as a Vercel environment variable.
3. Remove the credential from tracked examples and code in a reviewed patch.
4. Consider Git history exposure: rotating the token is essential even if history is later rewritten.

The credential is intentionally not reproduced in this audit document.

### Critical — Supabase RLS policies are open

The current schema enables RLS but defines broad policies using `USING (true)` for profiles, AI memory, weak concepts, course progress, extracted lectures, generated papers and certificates.

This does not provide student-level isolation. Policies must be rewritten around authenticated user identity, ownership and role/tenant membership. Public data should use explicit read-only policies on public tables only.

### High — authentication is currently demo/client-side

The Zustand store starts with `isAuthenticated: true`, includes seeded demo accounts and performs login checks in browser state. This is not a secure production identity boundary and cannot protect API routes.

Move to server-verified Supabase Auth sessions and authorize every private route/API request on the server. Preserve demo mode only behind an explicit development-only configuration.

### High — sensitive API actions are not consistently protected

The AI chat, paper generation, pipeline, cloud sync and Telegram webhook routes need authentication/authorization, payload validation, rate limiting and audit logging. The cloud sync route currently accepts runtime credentials and user payloads via POST; pipeline state is in memory; Telegram webhook setup can be invoked through GET query parameters.

Telegram webhook requests should be validated using a secret webhook token/header, and admin-only actions must require a verified admin identity. Never auto-register the first inbound sender as an administrator.

### High — state is not reliably persistent

The pipeline uses module-level in-memory arrays and operating mode. Serverless instances can restart or diverge, so UI state and reported progress may not survive deployments or scale consistently. Persist jobs, modes, approvals and audit events in the database.

### Medium — agent UI includes simulated actions

The agent dashboard's trigger action uses a client-side timeout and locally increments task counts/logs. This is a UI simulation, not evidence that a real agent job ran. Make simulation status explicit and connect production actions to durable background jobs.

### Medium — test coverage is not visible in package scripts

The package scripts include dev, build, start, lint and bot, but no dedicated unit/integration/e2e test script was found in package.json. Add tests around auth, RLS, API validation, syllabus versioning, content rights and agent approval workflows.

### Medium — course catalogue needs governance

Course data is primarily TypeScript seed data. Before advertising broad India-wide coverage, introduce source-linked syllabus versions, academic sessions, official verification dates, amendment tracking and a clear "verified / in progress / community" status.

## Recommended order of work

1. Rotate exposed Telegram credential and remove hard-coded credential fallbacks.
2. Implement real server-side authentication and role checks.
3. Replace permissive RLS policies with ownership/tenant policies.
4. Secure AI, pipeline, cloud sync and Telegram API routes.
5. Persist pipeline jobs, agent runs and approval history.
6. Add test infrastructure and CI.
7. Build the normalized India-wide course catalogue and syllabus version model.
8. Expand verified resources, tutor retrieval, exam analytics and student workflows.

## Audit limitations

- The source tree and selected files were read from GitHub.
- The deployed Vercel application was not independently exercised in a browser during this audit.
- No local dependency install, TypeScript compile, lint run, automated test run or Vercel deployment was performed as part of this source-only audit.
- This review does not establish whether environment variables configured in Vercel are valid or whether the connected Supabase project currently contains data.
