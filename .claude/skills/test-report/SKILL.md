---
name: test-report
description: STLC Test Reporting – summarise execution results, triage, coverage against the RTM and defects into a sprint/run test report with a go/no-go recommendation.
disable-model-invocation: true
argument-hint: <sprint name, or "latest" for the last local run>
---

# Test report – $ARGUMENTS

1. **Results source**
   - Local: `reports/results.json` (Playwright JSON reporter).
   - CI: with the ADO MCP, find the latest relevant pipeline run (`pipelines_get_builds`, `pipelines_get_build_status`) and read test logs/artifacts.
2. **Analysis**: if there are failures without a verdict, run the `failure-triager` subagent first. The report must separate product bugs from test/flaky/environment failures.
3. **Metrics** (compute; show formulas once):
   - Executed / passed / failed / skipped / flaky, pass rate
   - Pass rate by priority (P1, P2, P3) and by story (`@US-` tags)
   - Requirements coverage from `qa/rtm.csv`: ACs with ≥1 TC, TCs executed, ACs fully passing
   - Automation ratio: automated TCs / designed TCs
   - Defects: open by severity, found this sprint, fixed, reopened; escaped defects if known
4. **Exit criteria check** against the sprint plan in `qa/plans/` (or the DoD in CLAUDE.md): table of criterion → met / not met.
5. **Write** `qa/reports/<sprint-slug>.md`: executive summary (3–5 lines + recommendation **Go / Go with risks / No-go**), metrics tables, failures by verdict, open defects, coverage gaps, risks, next actions.
6. Offer to share: a short Teams/Outlook summary (only send after the user approves the text and the recipients) or a wiki page under `/AI-Generated/QA/`.

Report facts only; if a number can't be computed from the data, say "n/a" and why.
