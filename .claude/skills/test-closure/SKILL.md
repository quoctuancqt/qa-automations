---
name: test-closure
description: STLC Test Closure – close the sprint's testing: final metrics, exit-criteria sign-off, open risks carried over, lessons learned for the retrospective, and archive/publish.
disable-model-invocation: true
argument-hint: <sprint name>
---

# Test closure – $ARGUMENTS

1. **Inputs**: `qa/plans/<sprint>.md`, `qa/reports/<sprint>.md` (run `/test-report` first if missing or stale), `qa/rtm.csv`, `qa/bugs/`, and the iteration in ADO (story states at sprint end).
2. **Completion check**: for each story in scope – tested? DoD met? Accepted by PO (ADO state)? Unfinished stories and why.
3. **Exit criteria sign-off**: final table criterion → met / not met / waived (waivers need a named owner – ask the user).
4. **Carry-over**: open defects (severity, owner, target sprint), untested or partially tested ACs, technical test debt (flaky tests, missing automation, environment issues).
5. **Lessons learned** for the retrospective: what worked, what didn't, with evidence (e.g. "3 of 5 S2 bugs came from stories with unanswered questions at design time"). Propose 1–3 concrete actions.
6. **Testware**: confirm feature files and specs are committed, RTM is up to date, quarantined/flaky tests are listed, regression suite updated with this sprint's P1 tests.
7. **Write** `qa/closure/<sprint-slug>.md`. Ask before publishing it to the ADO wiki with `custom_wiki_create_page_only` at `/AI-Generated/QA/<sprint-slug>` (create-only: pages can't be edited afterwards).
