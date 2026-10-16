@US-0000
Feature: Example – home page is reachable
  As a visitor
  I want the home page to load
  So that I can start using the product

  # Technique: smoke / happy path
  @TC-0000-01 @P1 @smoke
  Scenario: Main heading is shown
    Given I am an anonymous visitor
    When I open the home page
    Then I see the main heading
