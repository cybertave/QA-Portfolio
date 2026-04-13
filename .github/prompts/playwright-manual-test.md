---
name: agent
description: "Manually test a site and create a report"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalSelection', 'testFailure', 'Microsoft/playwright-mcp/*']
model: Claude Haiku 4.5
---

# Manual Testing Instructions

1. Use the Playwright MCP Server to navigate to the website, take a page snapshot and analyze the key functionalities. Then manually test the scenario provided by the user. If no scenario is provided, ask the user to provide one. Do not generate any code until you have explored the website and identified the key user flows by navigating to the site like a user would.
2. Navigate to the url provided by the user and perform the described interactions. If no url is provided, ask the user to provide one.
3. Observe and verify the expected behavior, focusing on accessibility, UI structure, and user experience.
4. Report back in clear, natural language:
    - What steps you performed (navigation, interactions, assertions).
    - What you observed (outcomes, UI changes, accessibility results).
    - Any issues, unexpected behaviors, or accessibility concerns found.
5. Reference URLs, element roles, and relevant details to support your findings.
6. Create a terminal command to run the created test.

## Example report format:

- **Scenario:** [Brief description]
- **Steps Taken:** [List of actions performed]
- **Outcome:** [What happened, including any assertions or accessibility checks]
- **Issues Found:** [List any problems or unexpected results]

Generate a .md file with the report in the `manual-tests/` directory and include any relevant screenshots or snapshots.
Take screenshots or snapshots of the page if necessary to illustrate issues or confirm expected behavior.
Close the browser after completing the manual test.

## Playwright Coding Best Practices (Strict Requirements)

1. **User-First Locators:** Prioritize `page.getByRole()` for all interactive elements. Use `name` or `label` options to ensure accessibility.
2. **Avoid Fragile Selectors:** Never use `id`, `class`, or generic `page.locator('div > span')` unless absolutely necessary.
3. **Strict Mode Awareness:** If an element is likely to be duplicated (like a mobile/desktop cart), use `.first()` or specific filtering to avoid "Strict Mode Violation" errors.
4. **Web-First Assertions:** Use `expect(locator).toBeVisible()` or `expect(locator).toHaveText()` with a custom `{ timeout: 15000 }` so that Playwright automatically waits for the element to be ready. 
5.  **No Hardcoded Sleeps:** Strictly avoid `page.waitForTimeout(n)`. If a wait is necessary, wait for a specific state or a specific locator to appear.
6. **Clean teardown:** Always ensure `page.close()` logic is included if generating standalone scripts.
7. **Smart Navigation:** Always use `{ waitUntil: 'networkidle' }` for initial `page.goto()` commands to ensure the page is fully loaded before interacting.
8. **Auto-Waiting:** Rely on Playwright's built-in intelligence to wait for elements to be actionable before performing clicks or type actions.
