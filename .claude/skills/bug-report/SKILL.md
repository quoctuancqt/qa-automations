---
name: bug-report
description: STLC Fixing – turn a failed test or observed defect into a complete, reproducible bug report with evidence and App Insights correlation, ready to file in Azure DevOps.
disable-model-invocation: true
argument-hint: <failing test title, TC id, or a description of the defect>
---

# Bug report: $ARGUMENTS

1. **Gather evidence**
   - If it's an automated failure: read `reports/results.json` for the test's error, steps and attachments (trace, screenshot, video under `reports/artifacts/`).
   - If the `failure-triager` already classified it, reuse its verdict. Only *product bug* verdicts become bug reports; for *test bug / flaky / environment* say so and stop.
   - Correlate server-side with the `appinsights-failures` MCP: `list_failed_requests` / `list_top_exceptions` around the failure time, then `get_operation_details` for the operation_Id. Quote the exception type and message, not whole stack traces.
2. **Reproduce** minimally. If the Playwright MCP is available and the user agrees, reproduce in the browser and record exact steps. Note reproducibility (Always / Intermittent x/y / Once).
3. **Check for duplicates**: search ADO with `wit_query_by_wiql` for open bugs with similar titles or the same exception, and existing `qa/bugs/` files.
4. **Write** `qa/bugs/BUG-<short-slug>.md`:

```markdown
# <Concise title: [Area] What fails – under which condition>
- Story: US-<id> · Test case: TC-<id> · Build/version: <...> · Environment: <...>
- Severity: S1–S4 (<reason>) · Priority: P1–P3 (<reason>)  ← definitions in CLAUDE.md
- Reproducibility: Always | Intermittent (x/y) | Once
## Preconditions
## Steps to reproduce
1. ...
## Expected result   (cite the AC)
## Actual result
## Evidence
- Trace/screenshot paths, App Insights operation_Id, exception type + message
## Notes / suspected area
```

5. **Update `qa/rtm.csv`**: add the bug slug to `bug_ids` of the affected TC rows, `last_result=failed`.
6. **Hand-off**: the ADO MCP can't create work items. Print the report as ready-to-paste text and tell the user to file it; when they give you the ADO id, rename the file and replace the slug in the RTM.
