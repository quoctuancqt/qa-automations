---
name: analyze-story
description: STLC Requirements Analysis – fetch an Azure DevOps user story, assess testability of its acceptance criteria, raise questions for the PO, identify risks, and seed the traceability matrix.
disable-model-invocation: true
argument-hint: <work-item-id>
---

# Requirements Analysis for US-$ARGUMENTS

1. **Fetch** the work item with the Azure DevOps MCP (`wit_get_work_item`, expand relations), plus its comments (`wit_list_work_item_comments`), parent feature and linked items. If the MCP is unavailable, ask the user to paste the story.
2. **Extract acceptance criteria** and number them `AC-1..n`. If ACs are missing or written as prose, propose a numbered rewrite and mark it *proposed*.
3. **Testability review** – for each AC check:
   - Clear, measurable expected result? (no "fast", "user-friendly", "etc.")
   - Inputs, roles/permissions, data states and boundaries specified?
   - Error/negative behaviour defined?
   - Dependencies (APIs, other teams, feature flags, environments) known?
   Also apply INVEST to the story as a whole.
4. **Risk analysis** – list product risks with likelihood × impact (H/M/L) → suggested test priority P1–P3. Include non-functional risks (security/authz, performance, accessibility, data migration) only when relevant.
5. **Write** `qa/stories/US-$ARGUMENTS.md` using the template in [template.md](template.md).
6. **Update `qa/rtm.csv`**: one row per AC with `test_case_id` empty and `status=analysed`. Don't duplicate rows that already exist; update them.
7. **Finish** with: the list of open questions for the PO (ready to paste into the ADO discussion or refinement), and whether the story is *Ready for test design* (no blocking questions) or *Blocked*.

Do not invent business rules. Anything you assume goes under "Assumptions" and becomes a question.
