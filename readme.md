# Cypress with Cucumber Integration

This project uses **Cypress** for end-to-end testing and integrates with **Cucumber** for Behavior-Driven Development (BDD). This README will guide you through the setup and how to run the tests.

---

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node package manager)
- **Cypress** (version >= 10.x)
- **Cucumber** (via `@cypress/cucumber-preprocessor`)

---

## Installation

### 1. Clone the Repository

If you haven’t already, clone the repository:

```bash
git clone https://github.com/emmanuel0425/clara
cd Clara
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

This will install:

- Cypress
- Cucumber preprocessor for Cypress
- Other project dependencies

---

## Cucumber (Gherkin) Full Support for VSCode

### 1. Install Cucumber Extension in VSCode

To enhance your experience with Gherkin syntax and Cucumber feature files in Visual Studio Code, install the **Cucumber (Gherkin) Full Support** extension by **Alexander Krechik**:

- Open **VSCode**.
- Go to the **Extensions** view (press `Ctrl+Shift+X`).
- Search for **Cucumber (Gherkin) Full Support**.
- Click **Install** on the extension by **Alexander Krechik**.

### 2. Configure the Extension Settings

After installing the extension, add the following configuration to your **VSCode settings** to ensure proper integration with your Cypress + Cucumber setup:

- Open **VSCode settings** by pressing `Ctrl + ,` or clicking on **File > Preferences > Settings**.
- Search for **Cucumber** in the search bar.
- Click on **Edit in settings.json** (at the top right).
- Add the following settings to **settings.json**:

```json
{
  "cucumberautocomplete.customParameters": [],
  "cucumberautocomplete.steps": ["/cypress/e2e/*.spec.ts"],
  "cucumberautocomplete.strictGherkinCompletion": false
}
```

These settings do the following:

- **`customParameters`**: Allows you to customize additional Gherkin syntax if needed. You can leave this empty unless you have custom Gherkin parameters.
- **`steps`**: Specifies the location of your step definition files. In this case, the step definitions are located in `cypress/e2e/*.spec.ts` (adjust based on your folder structure).
- **`strictGherkinCompletion`**: Set to `false` to allow for flexible Gherkin syntax completion without strict enforcement of the Gherkin grammar.

---

## Running the Tests

### 1. Run Tests in Interactive Mode

To open the Cypress Test Runner in interactive mode, use the following command:

```bash
npx cypress open
```

This will open a browser window where you can choose which test to run. Cypress will automatically detect `.feature` files and display them in the interface. Click on a feature file to run the associated tests.

### 2. Run Tests Headlessly (CLI Mode)

To run your tests headlessly (without the browser UI), use the following command:

```bash
npx cypress run
```

This will run all tests in the `cypress/features/**/*.feature` files. It will run the tests in the default browser and output results to the terminal.

---

## Conclusion

You’ve now integrated **Cypress with Cucumber** and are ready to write **BDD-style tests** for your application. This allows for better collaboration between developers and non-technical stakeholders and helps ensure that the application behaves as expected in real-world scenarios.

---
