@checkout
Feature: Adding Products to the Cart and Checkout

  Background: Navigate to Swag Labs web page
    Given User navigates to the to Swag Labs web page

  Scenario Outline: Verify user can add one item to the cart
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    When User clicks on Add to cart button
    Then One item should be added to the cart

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  Scenario Outline: Verify user can remove one item from the cart
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    When User clicks on Add to cart button
    Then One item should be added to the cart
    When User clicks on Remove button
    Then One item should should be removed from the cart

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  Scenario Outline: Verify user can add multiple items to the cart
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    Then User should be able to add multiple items to the cart

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  Scenario Outline: Verify user can remove multiple items from the cart
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    Then User should be able to add multiple items to the cart
    Then User should be able to remove multiple items from the cart

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  Scenario Outline: Verify user can complete checkout for one item
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    When User clicks on Add to cart button
    Then One item should be added to the cart
    When User clicks on Cart icon
    When User clicks on Checkout button
    Then User completes required info
    When User clicks on Continue button
    Then User reviews order info
    When User clicks on Finish button
    Then The Order Confirmation page should be displayed to the user

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

  Scenario Outline: Verify user can complete checkout for multiple items
    When User enters "<username>" and "<password>"
    When User clicks on Sign In button
    Then User should land on the "<landingPage>" page
    Then User should be able to add multiple items to the cart
    When User clicks on Cart icon
    When User clicks on Checkout button
    Then User completes required info
    When User clicks on Continue button
    Then User reviews order info
    When User clicks on Finish button
    Then The Order Confirmation page should be displayed to the user

    Examples:
      | username      | password     | landingPage |
      | standard_user | secret_sauce | Products    |

# Negative Test Cases:
# Trying checking out without at least one item in the cart
# Not completing mandatory info