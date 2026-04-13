# ParaBank Automation Suite

**Playwright & TypeScript test automation framework for ParaBank online banking platform**, providing comprehensive coverage of registration, authentication, navigation, content verification, and security workflows.

## Quick Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npx playwright test                              # All tests (headless)
npx playwright test tests/combined-scenarios.spec.ts --headed   # Specific test + browser visible
npx playwright test --debug                      # Interactive debug mode
npx playwright show-report                       # View HTML report
```

## Test Execution Workflow

Scripts follow a four-step logic flow when executing tests:

**1. Initialization** – Launch browser, navigate to `https://parabank.parasoft.com/parabank/index.htm`, wait for page stability and critical elements.

**2. Authentication** – Locate username/password fields, input credentials using data-driven approach, click Login, verify authenticated state.

**3. Validation** – Assert successful navigation using URL checks, verify expected content/elements visible, confirm form data integrity (special characters, long inputs).

**4. Cleanup & Reporting** – Browser shutdown, capture screenshots/traces on failure, generate HTML report with test timeline and artifacts.

```typescript
// Example workflow
await page.goto('https://parabank.parasoft.com/parabank/index.htm');
await page.locator('[id="username"]').fill('demo_user');
await page.locator('[id="password"]').fill('password');
await page.getByRole('button', { name: 'Log In' }).click();
await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible();
```

## Troubleshooting

### 30000ms Test Timeout Resolution

**Problem**: Tests timeout despite pages loading successfully due to background network requests.

**Solution**: Implemented multi-faceted approach:

1. **Adjust playwright.config.ts timeouts:**
```typescript
export default defineConfig({
  timeout: 45000,           // Increased from 30000ms
  navigationTimeout: 20000,
});
```

2. **Use `waitUntil: 'networkidle'` for slow loads:**
```typescript
await page.goto(url, { waitUntil: 'networkidle' });
```
Waits for less than 2 pending network connections for 500ms, handling background AJAX requests.

3. **Environment-specific adjustments:**
```bash
SLOW_NETWORK=true npx playwright test
```

4. **Debug network issues:**
```bash
npx playwright test --debug  # Interactive debugging
npx playwright test --trace on
```

### Other Tips
- Use element waits instead of fixed delays: `await expect(page.getByText('Success')).toBeVisible()`
- Prefer role locators: `page.getByRole('button', { name: 'Log In' })`
- Run with `--debug` for step-by-step execution

---

## Resources

- **Playwright Docs**: https://playwright.dev
- **ParaBank**: https://parabank.parasoft.com
- **Test Plan**: [.github/manual-tests/parabank-test-plan.md](.github/manual-tests/parabank-test-plan.md)

**Framework**: Playwright + TypeScript | **Updated**: April 2026
