---
name: retest
description: STLC Fixing – confirmation test of a fixed bug plus targeted regression around it, then update the bug file and RTM.
disable-model-invocation: true
argument-hint: <bug id or BUG-slug>
---

# Retest $ARGUMENTS

1. Read the bug from `qa/bugs/` (and from ADO via the MCP if it has an id: check state is Resolved and note the fix build / linked PR).
2. Confirm the fix is deployed to the test environment (ask if unknown). Don't retest against a build without the fix.
3. **Confirmation test**: run the affected TCs, e.g. `npx playwright test --grep "@TC-1234-02"`. For manual cases, follow the bug's repro steps (Playwright MCP if available).
4. **Targeted regression**: run the rest of the story (`--grep @US-<id>`) plus any `@smoke` tests in the same area. If the linked PR touched shared code, propose a wider `@regression` run.
5. **Outcome**
   - Fixed → append a "Retest" section to the bug file (date, build, result, evidence) and set `last_result=passed` in the RTM. Tell the user to close the bug in ADO.
   - Not fixed / regression found → append the evidence and say whether to reopen or file a new bug (new behaviour ⇒ new bug via `/bug-report`).
6. If a new automated test would have caught this bug, add or propose it and tag it `@regression`.
