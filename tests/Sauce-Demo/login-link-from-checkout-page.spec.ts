// spec: specs/plan.md
// seed: tests/seed.spec.js

import { test, expect } from '@playwright/test';

test.describe('Shopping Features & Integration Tests', () => {
  test('Login link from checkout page', async ({ page }) => {
    // Set longer default timeout for all operations
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(15000);

    // Navigate to homepage
    await page.goto('https://sauce-demo.myshopify.com/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('link', { name: 'Catalog' })).toBeVisible({ timeout: 10000 });

    // Navigate to catalog to view products
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/collections/all', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: /Black heels/ })).toBeVisible({ timeout: 10000 });

    // Click on product to view details
    await page.getByRole('link', { name: /Black heels/ }).click();
    await expect(page).toHaveURL(/\/products\/flower-print-jeans/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible({ timeout: 10000 });

    // Add product to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'My Cart (1)' })).toBeVisible({ timeout: 10000 });

    // Navigate to cart
    const checkOutLink = page.getByRole('link', { name: 'Check Out' });
    await expect(checkOutLink).toBeVisible({ timeout: 10000 });
    await checkOutLink.click();
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/cart', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Check Out' })).toBeVisible({ timeout: 10000 });

    // Proceed to checkout
    await page.getByRole('button', { name: 'Check Out' }).click();
    await expect(page).toHaveURL(/\/checkouts\//, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    // Verify checkout page is displayed
    await expect(page.getByRole('heading', { name: /Sauce Demo Checkout/ })).toBeVisible({ timeout: 10000 });

    // Wait for Sign in link to be visible and click it
    const signInLink = page.getByRole('link', { name: 'Sign in' });
    await expect(signInLink).toBeVisible({ timeout: 10000 });
    await signInLink.click();
    await page.waitForLoadState('networkidle');

    // Verify user is directed to login page
    await expect(page).toHaveURL(/\/account\/login/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible({ timeout: 10000 });
  });
});
