// spec: .github/manual-tests/parabank-test-plan.md
// seed: tests/seed.spec.js

import { test, expect } from '@playwright/test';

test.describe('Navigation, Content Verification, and Edge Cases', () => {
  test('Verify Home Page Content and Navigation with Edge Case Handling', async ({ page }) => {
    // 1. Navigate to ParaBank home page
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    // 2. Verify home page content (Section 4.3)
    // Verify Customer Login section is visible on home page
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();

    // Verify ATM Services section is visible
    await expect(page.getByText('ATM Services')).toBeVisible();

    // Verify Online Services section is visible
    await expect(page.getByText('Online Services')).toBeVisible();

    // Verify Latest News section is visible
    await expect(page.getByRole('heading', { name: 'Latest News' })).toBeVisible();

    // 3. Verify main navigation links on home page (Section 4.1)
    // Click About Us link to verify navigation
    await page.locator('#headerPanel').getByRole('link', { name: 'About Us' }).click();

    // Click ParaBank logo to return to home page (Section 4 - Navigation & Logo test)
    await page.getByRole('img', { name: 'ParaBank' }).click();

    // Click Services link to verify navigation
    await page.locator('#headerPanel').getByRole('link', { name: 'Services' }).click();

    // Click ParaBank logo to return to home page
    await page.getByRole('img', { name: 'ParaBank' }).click();

    // Click Contact link from footer to verify navigation
    await page.getByRole('link', { name: 'contact', exact: true }).click();

    // Click ParaBank logo to return to home page
    await page.getByRole('img', { name: 'ParaBank' }).click();

    // 4. Test long input values in form fields (Section 5.3)
    // Click Register link to navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();

    // Enter 1000+ character string in First Name field to test long input handling
    const longInput = 'a'.repeat(1000);
    await page.locator('[id="customer.firstName"]').fill(longInput);

    // 5. Test special characters in form fields (Section 5.4)
    // Enter special character name O'Brien in Last Name field to test special characters
    await page.locator('[id="customer.lastName"]').fill('O\'Brien');

    // Enter Address with special characters 123 Main St. #456
    await page.locator('[id="customer.address.street"]').fill('123 Main St. #456');

    // Verify long input was accepted in First Name field
    await expect(page.locator('[id="customer.firstName"]')).toHaveValue(longInput);

    // Verify special character O'Brien was accepted in Last Name field
    await expect(page.locator('[id="customer.lastName"]')).toHaveValue('O\'Brien');

    // Verify special character address format was accepted in Address field
    await expect(page.locator('[id="customer.address.street"]')).toHaveValue('123 Main St. #456');
  });
});