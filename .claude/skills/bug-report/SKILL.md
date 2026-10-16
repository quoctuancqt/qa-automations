---
name: bug-report
description: STLC Fixing – turn a failed test or observed defect into a complete, reproducible bug report with evidence, check Jira for duplicates, and file it in Jira after approval.
disable-model-invocation: true
argument-hint: <failing test title, TC id, or a description of the defect>
---

# Bug report: $ARGUMENTS

1. **Gather evidence**
   - Local failure: `reports/results.json` for the error and steps; trace, screenshot and video under `reports/artifacts/`.
   - CI failure: `gh run list --workflow playwright.yml`, `gh run view <id> --log-failed`; download the `playwright-report` artifact only after asking.
   - If the `failure-triager` already ran, reuse its verdict. Only *product bug* verdicts become bugs; for *test bug / flaky / environment* say so and stop.
2. **Reproduce** minimally. With the user's OK, reproduce in the browser via the Playwright MCP or with a direct API call, and record exact steps. Note reproducibility (Always / Intermittent x/y / Once).
3. **Duplicates**: `searchJiraIssuesUsingJql`, e.g. `project = QA AND issuetype = Bug AND statusCategory != Done AND text ~ "<keywords>"`, plus `qa/bugs/`.
4. **Write** `qa/bugs/BUG-<short-slug>.md`:

```markdown
# <[Area] What fails – under which condition>
- Story: <KEY> · Test case: TC-<KEY>-<nn> · Commit/build: <sha or run url> · Environment: <url, browser>
- Severity: S1–S4 (<reason>) · Priority: P1–P3 (<reason>)   ← definitions in CLAUDE.md
- Reproducibility: Always | Intermittent (x/y) | Once
## Preconditions
## Steps to reproduce
1. ...
## Expected result   (cite the AC)
## Actual result
## Evidence
- trace/screenshot paths, CI run URL, response body/status
## Notes / suspected area
```

5. **File in Jira** – show the summary, description, priority and labels, then wait for an explicit yes before calling `createJiraIssue` (type Bug, project from CLAUDE.md, label `qa-found`, link "is caused by"/"relates to" the story with `createIssueLink` if available). Attach evidence by path reference; large files stay in CI artifacts.
6. Rename the file to `qa/bugs/<BUG-KEY>.md` and add the key to `bug_ids` of the affected TC rows in `qa/rtm.csv` with `last_result=failed`.
