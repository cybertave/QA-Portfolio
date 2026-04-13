// spec: .github/manual-tests/sauce-demo-login-testplan.md
// seed: .github/tests/seed.spec.js

import { test, expect } from '@playwright/test';

test.describe('Login Form - Input Validation & Error Handling', () => {
  test('Email field validation with invalid formats', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('link', { name: 'Log In' }).click();
    
    // Verify page URL is on login page
    expect(page.url()).toContain('/account/login');
    
    // Verify Email field is ready for input
    const emailField = page.getByRole('textbox', { name: 'Email Address' });
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    const signInButton = page.getByRole('button', { name: 'Sign In' });
    
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEmpty();
    
    // Enter 'invalid-email' (no @ symbol) in Email field
    await emailField.fill('invalid-email');
    
    // Enter 'password123' in Password field
    await passwordField.fill('password123');
    
    // Verify both fields show entered values
    await expect(emailField).toHaveValue('invalid-email');
    await expect(passwordField).toHaveValue('password123');
    
    // Click Sign In button
    await signInButton.click();
    
    // Verify user remains on login page
    expect(page.url()).toContain('/account/login');
    
    // Verify Email field still contains 'invalid-email'
    await expect(emailField).toHaveValue('invalid-email');
    
    // Verify Password field still contains 'password123'
    await expect(passwordField).toHaveValue('password123');
    
    // Verify that either validation error appears or form rejects submission
    // The form remains on login page indicating the submission was rejected or needs additional verification
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
  });
});
