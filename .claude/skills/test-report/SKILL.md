---
name: test-report
description: STLC Test Reporting – summarise execution results (local or GitHub Actions), triage, coverage against the RTM and Jira defects into a test report with a go/no-go recommendation, optionally published to Confluence.
disable-model-invocation: true
argument-hint: <sprint name, or "latest" for the last run>
---

# Test report – $ARGUMENTS

1. **Results source**
   - Local: `reports/results.json`.
   - CI: `gh run list --workflow playwright.yml --branch main --limit 5`, then `gh run view <id>` for the summary. Ask before `gh run download <id> -n playwright-results` to get `results.json`.
2. **Analysis**: if failures have no verdict yet, run the `failure-triager` subagent first. The report separates product bugs from test/flaky/environment failures.
3. **Metrics** (show formulas once):
   - Executed / passed / failed / skipped / flaky, pass rate
   - Pass rate by priority tag and by story tag
   - Requirements coverage from `qa/rtm.csv`: ACs with ≥1 TC, TCs executed, ACs fully passing
   - Automation ratio: automated TCs / designed TCs
   - Defects from Jira (`searchJiraIssuesUsingJql`, e.g. `project = QA AND issuetype = Bug AND sprint = "<name>"`): open by priority, created, resolved, reopened
4. **Exit criteria** from `qa/plans/<sprint>.md` (or the DoD in CLAUDE.md): criterion → met / not met.
5. **Write** `qa/reports/<sprint-slug>.md`: executive summary (3–5 lines + **Go / Go with risks / No-go**), metrics tables, failures by verdict, open defects with Jira links, coverage gaps, risks, next actions.
6. Offer to publish it to Confluence (`createConfluencePage`, or `updateConfluencePage` if the page exists) and/or post a short summary as a PR comment (`gh pr comment`) – show the text and wait for a yes.

Report facts only. If a number can't be computed from the data, write "n/a" and why.
