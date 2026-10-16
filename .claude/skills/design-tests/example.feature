@US-1234
Feature: Candidate applies to a job offer
  As a candidate
  I want to apply to a published job offer
  So that the recruiter receives my application

  Background:
    Given a published job offer "Senior QA Engineer"

  # AC-1 · Technique: happy path
  @TC-1234-01 @P1 @smoke
  Scenario: Logged-in candidate applies with a complete profile
    Given I am logged in as a candidate with a complete profile
    When I apply to the job offer
    Then my application is recorded with status "Submitted"
    And the recruiter is notified

  # AC-2 · Technique: boundary value analysis on cover letter length (max 2000 chars)
  @TC-1234-02 @P2 @regression
  Scenario Outline: Cover letter length limits
    Given I am logged in as a candidate with a complete profile
    When I apply with a cover letter of <length> characters
    Then the application is <outcome>

    Examples:
      | length | outcome                         |
      | 0      | accepted                        |
      | 1999   | accepted                        |
      | 2000   | accepted                        |
      | 2001   | rejected with "Cover letter too long" |

  # AC-3 · Technique: decision table (profile complete × offer state)
  @TC-1234-03 @P1 @regression
  Scenario Outline: Application is only allowed on a published offer with a complete profile
    Given I am logged in as a candidate whose profile is <profile>
    And the job offer is <offer_state>
    When I try to apply
    Then I see <result>

    Examples:
      | profile    | offer_state | result                          |
      | complete   | published   | the application confirmation    |
      | incomplete | published   | "Complete your profile first"   |
      | complete   | closed      | "This offer is no longer open"  |
      | incomplete | closed      | "This offer is no longer open"  |

  # AC-4 · Technique: roles/permissions (negative)
  @TC-1234-04 @P1 @regression
  Scenario: A recruiter cannot apply to a job offer
    Given I am logged in as a recruiter
    When I try to apply to the job offer
    Then the request is denied with 403
