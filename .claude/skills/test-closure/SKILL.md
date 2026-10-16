---
name: test-closure
description: STLC Test Closure – close the sprint's testing: final metrics, exit-criteria sign-off, carry-over risks, lessons learned for the retrospective, and publish the closure report to Confluence.
disable-model-invocation: true
argument-hint: <sprint name>
---

# Test closure – $ARGUMENTS

1. **Inputs**: `qa/plans/<sprint>.md`, `qa/reports/<sprint>.md` (run `/test-report` first if missing or stale), `qa/rtm.csv`, `qa/bugs/`, and the sprint's Jira issues and their final statuses (`searchJiraIssuesUsingJql`).
2. **Completion**: per story – tested? DoD met? Done in Jira? List unfinished stories and why.
3. **Exit criteria sign-off**: criterion → met / not met / waived. Waivers need a named owner – ask the user.
4. **Carry-over**: open bugs (priority, assignee, target sprint), untested or partly tested ACs, test debt (flaky or quarantined tests, missing automation, environment issues).
5. **Lessons learned** for the retrospective, backed by evidence (e.g. "3 of 4 High bugs came from stories with unanswered questions at design time"). Propose 1–3 concrete actions.
6. **Testware**: feature files and specs merged to `main`, RTM up to date, this sprint's P1 tests added to `@regression`, flaky tests listed with tickets.
7. **Write** `qa/closure/<sprint-slug>.md`. Offer to publish to Confluence under the QA page and to create Jira tasks for carry-over test debt – show the content and wait for a yes before each write.
