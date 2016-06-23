Feature: HomePage 
  As a user
  I want to visit the home page
  So that I can know more about the author


   Scenario: I should be able to see all the posts
    Given I am on the homepage
    When I click nav bar option "Writing" 
    Then I should see all the posts
    And I should see post title
    And I should be able to click on it to view the post

   Scenario: I should be able to comment on the post
    Given I am on the homepage
    When I click nav bar option "Writing" 
    And I open a post
    And I authenticate with Google
    Then the submit button should be enabled
    When I enter comment as "Like it"
    And I save the comment
    Then the comment should be saved successfully
    
