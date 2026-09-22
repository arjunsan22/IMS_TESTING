# IMS_TESTING
# 🎓 NITC MIS - Automated Testing Framework

This repository contains the end-to-end (E2E) automated testing framework for the **National Institute of Technology Calicut (NITC) Management Information System (MIS)**. Built using **Playwright** and **TypeScript**, this framework ensures the reliability, security, and performance of critical institute workflows.

---

## 🚀 Key Features & Architecture

The framework is built around modern automation patterns to maximize scalability and reduce code duplication:

*   **⚡ Playwright + TypeScript:** Native speed, robust auto-waiting capabilities, and strong type safety.
*   **🏢 Page Object Model (POM):** Clean separation of test logic and UI element locators for high maintainability.
*   **🎭 Custom Fixtures:** Encapsulated page contexts and automated user states to eliminate repetitive tasks.
*   **📊 Data-Driven Testing (DDT):** Dynamically generated test suites using centralized array maps for comprehensive coverage (e.g., extensive admin login validation scenarios).
*   **🔒 Secure Environment Variables:** Zero hardcoded credentials or URLs; fully managed using a localized `.env` system.
*   **📦 Smart Session Isolation:** Preserves browser context state (Cookies & LocalStorage) via `storageState` to bypass redundant login tasks for target pages.

---

## 📁 Project Directory Structure

```text
nitc-mis-testing/
├── pages/                  # Page Object Model (POM) Classes
│   └── admin/
│       └── AdminLoginPage.ts
├── tests/                  # Test Suites & Specs
│   └── admin/
│       └── login.test.ts   # Data-driven authentication test cases
├── jsonReports/            # Local directory for tracking build results
│   └── jsonReport.json     # Ignored by Git, updated dynamically
├── .auth/                  # Stores cached authentication states (user.json)
├── .env                    # Environment-specific configuration (Ignored by Git)
├── playwright.config.ts    # Main Playwright configurations, reporters & viewports
└── tsconfig.json           # Global compiler rules for Node/TypeScript integration
```

---

## 🛠️ Setup & Installation

Follow these steps to configure the test runner on your local environment:

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd nitc-mis-testing
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory of your project:
```env
# Environments Configuration
LOGIN_URL=https://nitc.ac.in
BASE_URL=https://nitc.ac.in

# Valid Test Credentials
EMAIL=your_official_email@nitc.ac.in
PASSWORD=your_secure_password
```

### 3. Generate Type Definitions
If your code highlights local environment objects with missing types, load the Node dictionary definitions:
```bash
npm install --save-dev @types/node
```

---

## 🧪 Running the Test Suites

Execute scripts directly using the Playwright CLI runner:

```bash
# Run all tests sequentially/parallel based on config
npx playwright test

# Run a specific test file (e.g., Admin Login)
npx playwright test tests/admin/login.test.ts

# Run tests in headed UI mode to observe browser execution
npx playwright test --headed

# Debug tests step-by-step using the Playwright Inspector UI
npx playwright test --debug
```

---

## 📊 Reports & Artifacts

The project generates multi-format reports automatically upon completing a execution path:

*   **HTML Report:** Generates a visually rich dashboard capturing full failure stack-traces. Open via:
    ```bash
    npx playwright show-report
    ```
*   **JSON Report:** Extracted automatically to `jsonReports/jsonReport.json` for external CI parsing engines.
*   **Screenshots & Videos:** Captured on execution flows as configured inside the `playwright.config.ts`.

