---
name: design-tests
description: STLC Test Design – derive test cases for a Jira story using formal techniques (EP, BVA, decision tables, state transition, negative/error guessing) and write them as tagged Gherkin with traceability.
disable-model-invocation: true
argument-hint: <jira-key>
---

# Test design for $ARGUMENTS

**Gate**: read `qa/stories/$ARGUMENTS.md`. If missing, or the verdict is *Blocked*, stop and say so unless the user explicitly overrides.

1. **For each AC**, choose and name the technique(s):
   - Equivalence partitioning – valid/invalid classes per input
   - Boundary value analysis – min-1, min, min+1, max-1, max, max+1
   - Decision table – condition combinations → actions (`Scenario Outline` + `Examples`)
   - State transition – valid and invalid transitions
   - Roles/permissions – each role × action, including denied
   - Error guessing – empty, whitespace, unicode, very long, duplicate, concurrent, expired session
2. **Write** `features/$ARGUMENTS-<short-slug>.feature` following [example.feature](example.feature):
   - Feature tag `@<KEY>`; scenarios tagged `@TC-<KEY>-<nn> @P1|@P2|@P3 @smoke|@regression`
   - Comment above each scenario: `# AC-n · Technique: ...`
   - Declarative business language (no clicks/selectors); one behaviour per scenario
3. **Update `qa/rtm.csv`**: one row per TC with ac_id, priority, `status=designed`. Every AC needs ≥1 TC – list any that don't.
4. **Review gate**: run the `test-design-reviewer` subagent on the feature file and story analysis. Apply the findings you agree with; list rejected ones and why.
5. **Automation candidates**: automate now (P1, stable), later, or manual/exploratory, and at which level – prefer API when the AC is a business rule rather than UI behaviour.
6. If asked to automate, write specs in `tests/api/` or `tests/e2e/` per CLAUDE.md conventions (see `tests/` for working examples), set `spec_file` and `status=automated` in the RTM, and work on a branch named `<KEY>-<slug>` so Jira links the PR.
