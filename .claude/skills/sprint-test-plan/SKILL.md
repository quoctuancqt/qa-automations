---
name: sprint-test-plan
description: STLC Test Planning – build the sprint test plan from the Jira sprint scope and story risk analyses, optionally publishing it to Confluence.
disable-model-invocation: true
argument-hint: <sprint name, or "current">
---

# Sprint test plan for $ARGUMENTS

1. **Scope**: with the Atlassian MCP (`searchJiraIssuesUsingJql`), query the sprint, e.g. `project = QA AND sprint = "<name>"` or `sprint in openSprints()` for "current". Keep Stories and Bugs; note story points and assignees.
2. **Capacity**: Jira doesn't expose team capacity – ask the user for QA days available this sprint.
3. **Inputs**: read `qa/stories/<KEY>.md` for each story. Stories without an analysis are a planning gap (suggest `/analyze-story`).
4. **Write** `qa/plans/<sprint-slug>.md`:
   - Objectives; scope in/out (table: key, summary, risk priority, test levels, automate Y/N, estimate)
   - Approach: test levels, exploratory charters, regression strategy (`@smoke` on every PR, `@regression` nightly in GitHub Actions), non-functional checks if any
   - Environments and test data with owners
   - Entry criteria (story analysed and Ready, build deployed, data available)
   - Exit criteria (DoD in CLAUDE.md plus thresholds: 100% P1 pass, ≥95% overall, 0 open S1/S2)
   - Schedule mapped onto the sprint calendar (design, execution window, regression, review/demo)
   - Plan risks and mitigations (capacity, environment instability, late stories)
   - Roles / RACI
5. **Sanity check** effort vs capacity. If it doesn't fit, propose what to descope by priority.
6. End with a 5-line summary for sprint planning. Offer to publish the plan to Confluence (`createConfluencePage` under the QA page from CLAUDE.md) – ask first.
