---
name: design-tests
description: STLC Test Design – derive test cases for a user story using formal techniques (EP, BVA, decision tables, state transition, negative/error guessing) and write them as tagged Gherkin with traceability.
disable-model-invocation: true
argument-hint: <work-item-id>
---

# Test design for US-$ARGUMENTS

**Gate**: read `qa/stories/US-$ARGUMENTS.md`. If missing, or the verdict is *Blocked*, stop and say so unless the user explicitly overrides.

1. **For each AC**, choose and name the technique(s):
   - Equivalence partitioning – valid/invalid classes per input
   - Boundary value analysis – min-1, min, min+1, max-1, max, max+1
   - Decision table – combinations of conditions → actions (use `Scenario Outline` + `Examples`)
   - State transition – valid and invalid transitions for stateful entities
   - Roles/permissions matrix – each role × each action, including denied
   - Error guessing – empty, null, whitespace, unicode, very long, duplicate, concurrent, expired session
2. **Write** `features/US-$ARGUMENTS-<short-slug>.feature` following [example.feature](example.feature):
   - Feature tag `@US-<id>`; each scenario tagged `@TC-<id>-<nn> @P1|@P2|@P3 @smoke|@regression`
   - A comment above each scenario: `# AC-n · Technique: ...`
   - Declarative steps (business language, no clicks/selectors); one behaviour per scenario
3. **Update `qa/rtm.csv`**: one row per TC with ac_id, priority, `status=designed`. Every AC must have at least one TC – list any AC that doesn't.
4. **Review gate**: invoke the `test-design-reviewer` subagent on the new feature file and story analysis. Apply the changes it finds that you agree with; list the ones you rejected and why.
5. **Automation candidates**: list which TCs to automate now (P1 and stable), later, or keep manual/exploratory, and which level (API vs E2E) – prefer API when the AC is about business rules rather than UI.
6. If asked to automate, write specs under `tests/api/` or `tests/e2e/` following CLAUDE.md conventions and set `spec_file` + `status=automated` in the RTM.
