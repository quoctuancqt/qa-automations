@QA-1
Feature: Manage todo items
  As a busy person
  I want to add, complete and filter todo items
  So that I keep track of what I still need to do

  Background:
    Given I open the todo app with an empty list

  # AC-1 · Technique: happy path
  @TC-QA-1-01 @P1 @smoke
  Scenario: Add a todo item
    When I add the todo "Buy milk"
    Then the list shows "Buy milk"
    And the counter shows "1 item left"

  # AC-2 · Technique: equivalence partitioning (invalid class: blank titles)
  @TC-QA-1-02 @P2 @regression
  Scenario Outline: Blank titles are not added
    When I add the todo "<title>"
    Then the list is empty

    Examples:
      | title  |
      |        |
      | "   "  |

  # AC-3 · Technique: state transition (active → completed → active)
  @TC-QA-1-03 @P1 @regression
  Scenario: Completing and reopening a todo updates the counter
    Given the list contains "Buy milk" and "Walk the dog"
    When I mark "Buy milk" as completed
    Then the counter shows "1 item left"
    When I mark "Buy milk" as active again
    Then the counter shows "2 items left"

  # AC-4 · Technique: decision table (filter × item state)
  @TC-QA-1-04 @P2 @regression
  Scenario Outline: Filters show only matching items
    Given "Buy milk" is completed and "Walk the dog" is active
    When I choose the "<filter>" filter
    Then I see only <visible>

    Examples:
      | filter    | visible                       |
      | All       | "Buy milk" and "Walk the dog" |
      | Active    | "Walk the dog"                |
      | Completed | "Buy milk"                    |
