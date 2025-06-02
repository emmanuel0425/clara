@login
Feature: Login

  Background: Navigate to Swag Labs web page
    Given User navigates to the to Swag Labs web page

  # Positive Test Case
  Scenario Outline: Login with valid credentials
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  # Negative Test Cases
  Scenario Outline: Login with invalid username, invalid password, invalid credentials, blank username, blank password and blank credentials
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page

    Examples:
      | username       | password      | landingPage                                                               |
      | standard_user1 | secret_sauce  | Epic sadface: Username and password do not match any user in this service |
      | standard_user  | secret_sauce1 | Epic sadface: Username and password do not match any user in this service |
      | standard_user2 | secret_sauce2 | Epic sadface: Username and password do not match any user in this service |
      |                | secret_sauce  | Epic sadface: Username is required                                        |
      | standard_user  |               | Epic sadface: Password is required                                        |
      |                |               | Epic sadface: Username is required                                        |

  # Navigation through the product catalog
  Scenario Outline: Navigate through the product catalog
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    Then User should navigate through the product catalog

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |
