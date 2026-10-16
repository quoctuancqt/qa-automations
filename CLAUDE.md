# QA Automation – Agile/Scrum, STLC-driven (demo)

Demo QA workspace for a Scrum team: requirement analysis, test plans, test design (Gherkin), Playwright automation and reports. Every artifact traces back to a Jira issue.

## Tooling
- **Jira** (Atlassian MCP, server `atlassian`): stories, sprints, bugs. Project key: `QA` (change if your demo project uses another key). Creating or transitioning issues and adding comments are writes – show the content and get a yes first.
- **Confluence** (Atlassian MCP): requirement pages linked from stories; test plans, reports and closure pages are published under space `<FILL IN>` › page "QA". Publish only after the user approves.
- **GitHub** (GitHub MCP, server `github`, or the `gh` CLI): code, PRs linked to Jira keys, and the `Playwright` Actions workflow that produces test results.
- **Systems under test (public demos, no login)**:
  - UI – TodoMVC: `https://demo.playwright.dev/todomvc` (`BASE_URL`)
  - API – JSONPlaceholder: `https://jsonplaceholder.typicode.com` (`API_BASE_URL`)

## STLC workflow (one skill per phase)
| Phase | Command | Output |
|---|---|---|
| Requirements Analysis | `/analyze-story <KEY>` | `qa/stories/<KEY>.md`, rows in `qa/rtm.csv` |
| Test Planning | `/sprint-test-plan <sprint>` | `qa/plans/<sprint>.md` (+ Confluence) |
| Test Design | `/design-tests <KEY>` | `features/<KEY>-*.feature`, reviewed by the `test-design-reviewer` agent |
| Test Execution | `npm test`, `npm run test:story -- @<KEY>`, Playwright MCP for exploratory | `reports/` locally, artifacts in GitHub Actions |
| Test Analysis | `failure-triager` agent | triage table |
| Test Reporting | `/test-report <sprint\|latest>` | `qa/reports/<sprint>.md` (+ Confluence) |
| Fixing | `/bug-report`, then `/retest <BUG-KEY>` | Jira bug, `qa/bugs/<KEY>.md` |
| Test Closure | `/test-closure <sprint>` | `qa/closure/<sprint>.md` (+ Confluence) |

Phase gates: don't design tests for a story whose analysis is *Blocked* unless the user overrides.

## Layout
- `features/` – Gherkin test design (source of truth for test cases)
- `tests/api/*.api.spec.ts` (API), `tests/e2e/` (UI) – Playwright specs; smoke vs regression is a tag, not a folder
- `qa/rtm.csv` – requirements traceability matrix (story → AC → TC → spec → result → bugs)
- `qa/{stories,plans,bugs,reports,closure}/` – phase artifacts (Markdown, the local copy of what goes to Confluence)
- `.github/workflows/playwright.yml` – CI: smoke on PRs, full regression nightly
- `reports/` – generated run output (`results.json`, `junit.xml`, `html/`), not committed

## Conventions
- IDs: story = Jira key (`QA-12`), acceptance criterion `AC-<n>`, test case `TC-<key>-<nn>` (e.g. `TC-QA-12-03`), bug = Jira key, or `BUG-<slug>` before it's filed.
- Every scenario and spec is tagged: `@<KEY> @TC-<key>-<nn> @P1|@P2|@P3` and `@smoke` or `@regression`.
- Spec titles start with the TC id: `test('TC-QA-12-02 rejects an empty title', ...)`.
- Branches and PRs include the Jira key (`QA-12-add-filter-tests`) so Jira links them.
- Locators: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`. No CSS/XPath chains, no `waitForTimeout`.
- Test data from fixtures or `.env`; never hard-code secrets. Never edit `.env*`, `playwright/.auth/` or `*-snapshots/` baselines (a hook blocks it).

## Severity vs priority
- **Severity** (impact): S1 Critical – data loss/security/system down, no workaround · S2 Major – core feature broken · S3 Minor – easy workaround · S4 Trivial – cosmetic.
- **Priority** (urgency): P1 fix this sprint, blocks release · P2 this sprint if capacity · P3 backlog. Map to Jira priority Highest/High/Medium/Low.

## Definition of Done (QA view)
- Every AC has ≥1 test case in `qa/rtm.csv`; P1 cases are automated.
- All P1/P2 tests pass in CI; no open S1/S2 bugs on the story.
- Regression suite green on the sprint's main branch.

## Commands
- `npm test` · `npm run test:smoke` · `npm run test:regression` · `npm run test:story -- @QA-1`
- `npm run typecheck` · `npm run report` · `gh run list --workflow playwright.yml`
