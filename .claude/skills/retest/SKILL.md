---
name: retest
description: STLC Fixing – confirmation test of a fixed Jira bug plus targeted regression, then update the bug in Jira (after approval), the bug file and the RTM.
disable-model-invocation: true
argument-hint: <bug Jira key>
---

# Retest $ARGUMENTS

1. Read the bug from Jira (`getJiraIssue`) and `qa/bugs/$ARGUMENTS.md`. Check the status is the team's "ready for QA"/resolved state, and find the fix PR – from the Jira development panel or `gh pr list --search "$ARGUMENTS"`. Note the merge commit.
2. Make sure the fix is in what you're testing (deployed env or the CI run on the merge commit). Don't retest a build without the fix.
3. **Confirmation test**: run the affected TCs, e.g. `npx playwright test --grep "@TC-QA-12-02"`; for manual cases follow the bug's repro steps (Playwright MCP if available).
4. **Targeted regression**: the rest of the story (`--grep @<STORY-KEY>`) plus `@smoke`. If the PR touched shared code (`gh pr view <n> --json files`), propose a full `@regression` run.
5. **Outcome**
   - Fixed → append a "Retest" section (date, commit, result, evidence) to the bug file and set `last_result=passed` in the RTM. Propose a Jira comment and transition to Done; do both only after a yes (`addCommentToJiraIssue`, `transitionJiraIssue`).
   - Not fixed → append evidence and propose reopening with a comment (after a yes). New, different behaviour ⇒ new bug via `/bug-report`.
6. If no automated test would have caught the bug, add one tagged `@regression` and reference the bug key in its title.
