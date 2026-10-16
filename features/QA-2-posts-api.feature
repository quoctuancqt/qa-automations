@QA-2
Feature: Posts API
  As an API client
  I want to read and create posts
  So that I can display and publish content

  # AC-1 · Technique: happy path
  @TC-QA-2-01 @P1 @smoke
  Scenario: Get an existing post
    When I request post 1
    Then the response status is 200
    And the post has an id, userId, title and body

  # AC-2 · Technique: equivalence partitioning (invalid class: unknown id)
  @TC-QA-2-02 @P2 @regression
  Scenario: Unknown post returns 404
    When I request post 999999
    Then the response status is 404

  # AC-3 · Technique: filtering by owner
  @TC-QA-2-03 @P2 @regression
  Scenario: Posts can be filtered by user
    When I request the posts of user 1
    Then every returned post belongs to user 1

  # AC-4 · Technique: happy path (write)
  @TC-QA-2-04 @P1 @regression
  Scenario: Create a post
    When I create a post with title "Hello" and body "World" for user 1
    Then the response status is 201
    And the response echoes the title, body and user with a new id
