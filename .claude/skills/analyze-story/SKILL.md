---
name: analyze-story
description: STLC Requirements Analysis – fetch a Jira story (and linked Confluence requirements), assess testability of its acceptance criteria, raise questions for the PO, identify risks, and seed the traceability matrix.
disable-model-invocation: true
argument-hint: <jira-key, e.g. QA-12>
---

# Requirements Analysis for $ARGUMENTS

1. **Fetch** the issue with the Atlassian MCP (`getJiraIssue`): summary, description, acceptance criteria (field or description section), status, sprint, priority, comments, issue links and the parent epic. Follow remote links to **Confluence** pages (`getConfluencePage`) for specs, mockups or business rules. If the MCP isn't connected, tell the user to authenticate it with `/mcp` or paste the story.
2. **Extract acceptance criteria** and number them `AC-1..n`. If they are missing or written as prose, propose a numbered Given/When/Then rewrite and mark it *proposed*.
3. **Testability review** – for each AC:
   - Clear, measurable expected result? (no "fast", "intuitive", "etc.")
   - Inputs, roles/permissions, data states and boundaries specified?
   - Error/negative behaviour defined?
   - Dependencies known (APIs, feature flags, environments, other teams)?
   Then apply INVEST to the story as a whole.
4. **Risk analysis** – product risks with likelihood × impact (H/M/L) → test priority P1–P3. Add non-functional risks (security/authz, performance, accessibility, data) only where relevant.
5. **Write** `qa/stories/$ARGUMENTS.md` from [template.md](template.md).
6. **Update `qa/rtm.csv`**: one row per AC, `test_case_id` empty, `status=analysed`. Update existing rows rather than duplicating.
7. **Finish** with the open questions for the PO and the verdict *Ready for test design* or *Blocked*. Offer to post the questions as a Jira comment (`addCommentToJiraIssue`) – show the exact text and wait for a yes.

Do not invent business rules. Anything assumed goes under "Assumptions" and becomes a question.
