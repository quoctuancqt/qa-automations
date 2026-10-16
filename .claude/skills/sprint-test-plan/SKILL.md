---
name: sprint-test-plan
description: STLC Test Planning – build the sprint test plan from the Azure DevOps iteration scope, capacity and story risk analyses.
disable-model-invocation: true
argument-hint: <sprint name or iteration path>
---

# Sprint test plan for $ARGUMENTS

1. **Scope**: with the Azure DevOps MCP, find the iteration (`work_list_team_iterations`) and its items (`wit_get_work_items_for_iteration`). Keep User Stories and Bugs; note Tasks only for QA capacity.
2. **Capacity**: read QA capacity for the iteration (`work_get_iteration_capacities` / `work_get_team_capacity`) if available; otherwise ask.
3. **Inputs**: for each story, read `qa/stories/US-<id>.md`. List stories with no analysis yet as a planning gap (suggest running `/analyze-story`).
4. **Write** `qa/plans/<sprint-slug>.md` with these sections:
   - Objectives and scope in / out (table: story, title, risk priority, test levels, automation candidate Y/N, estimate)
   - Test approach: levels (API, E2E, exploratory charters), regression strategy (`@smoke` on every build, `@regression` nightly), non-functional checks if any
   - Environments and test data, with owners
   - Entry criteria (story analysed and Ready, build deployed to test env, test data available)
   - Exit criteria (the Definition of Done in CLAUDE.md, plus agreed thresholds: e.g. 100% P1 pass, ≥95% overall, 0 open S1/S2)
   - Schedule against the sprint calendar (design by day X, execution window, regression, demo)
   - Risks and mitigations for the plan itself (capacity, environment instability, late stories)
   - Roles / RACI
5. **Sanity check**: estimated effort vs capacity. If it doesn't fit, propose what to descope by priority instead of silently trimming.
6. End with a 5-line summary suitable for the sprint planning meeting.
