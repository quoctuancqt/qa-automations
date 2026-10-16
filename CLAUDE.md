# QA Automation – Agile/Scrum, STLC-driven

This repo holds the QA work for a Scrum team: requirement analysis, test plans, test design (Gherkin), Playwright automation, and reports. Every artifact traces back to an Azure DevOps user story.

## Context
- **Azure DevOps**: org `mantu`, project `<FILL IN>`, team `<FILL IN>`. Use the Azure DevOps MCP to read stories, sprints and pipelines. It is **read-only for work items** – never claim a bug was filed; produce a ready-to-paste bug instead. Wiki writes are allowed only under `/AI-Generated/QA/...`.
- **App Insights**: the `appinsights-failures` MCP covers `appi-marketplace-prod` (Candidate.API, Need.Api, JobOffers.API, ...). Use it to correlate failures with server exceptions.
- **Stack under test**: .NET APIs + Vue 3/Quasar front-ends.

## STLC workflow (one skill per phase)
| Phase | Command | Output |
|---|---|---|
| Requirements Analysis | `/analyze-story <id>` | `qa/stories/US-<id>.md`, rows in `qa/rtm.csv` |
| Test Planning | `/sprint-test-plan <sprint>` | `qa/plans/<sprint>.md` |
| Test Design | `/design-tests <id>` | `features/US-<id>-*.feature`, then `test-design-reviewer` agent |
| Test Execution | `npm test`, `npm run test:story -- @US-<id>`, Playwright MCP for exploratory | `reports/` |
| Test Analysis | `failure-triager` agent | triage table in the report |
| Test Reporting | `/test-report <sprint>` | `qa/reports/<sprint>.md` |
| Fixing | `/bug-report`, then `/retest <bug-id>` | `qa/bugs/BUG-<slug>.md` |
| Test Closure | `/test-closure <sprint>` | `qa/closure/<sprint>.md` (+ wiki page on request) |

Don't skip phase gates: no test design for a story whose open questions in `qa/stories/` are unresolved unless the user says so.

## Layout
- `features/` – Gherkin test design (source of truth for test cases)
- `tests/api/*.api.spec.ts`, `tests/e2e/`, `tests/smoke/` – Playwright specs
- `qa/rtm.csv` – requirements traceability matrix (story → AC → TC → spec → result → bugs)
- `qa/{stories,plans,bugs,reports,closure}/` – phase artifacts (Markdown)
- `reports/` – generated run output (`results.json`, `junit.xml`, `html/`), not committed

## Conventions
- IDs: story `US-<adoId>`, acceptance criterion `AC-<n>`, test case `TC-<adoId>-<nn>`, bug `BUG-<slug>` until it has an ADO id.
- Every scenario and spec is tagged: `@US-<id> @TC-<id> @P1|@P2|@P3` and `@smoke` or `@regression`.
- Spec titles start with the TC id: `test('TC-1234-02 rejects an expired token', ...)`.
- Use role/label locators (`getByRole`, `getByLabel`, `getByTestId`); no CSS/XPath chains, no `waitForTimeout`.
- Test data comes from fixtures or `.env`; never hard-code credentials. Never edit `.env*`, `playwright/.auth/` or `*-snapshots/` baselines (a hook blocks it) – a failing visual test is triaged, not re-baselined.

## Severity vs priority
- **Severity** (impact): S1 Critical – data loss/security/system down, no workaround · S2 Major – core feature broken, workaround hard · S3 Minor – feature impaired, easy workaround · S4 Trivial – cosmetic.
- **Priority** (urgency to fix): P1 this sprint, blocks release · P2 this sprint if capacity · P3 backlog.

## Definition of Done (QA view)
- All ACs have ≥1 test case in `qa/rtm.csv`, P1 cases automated.
- All P1/P2 tests pass; no open S1/S2 bugs for the story.
- Regression suite green on the sprint build.

## Commands
- `npm test` · `npm run test:smoke` · `npm run test:regression` · `npm run test:story -- @US-1234`
- `npm run typecheck` · `npm run report` (opens HTML report)
