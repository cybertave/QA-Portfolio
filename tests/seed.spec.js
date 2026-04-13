import { test, expect } from '@playwright/test';

test('seed for ai', async ({ page }) => {
  // This is the destination for the AI agent
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});