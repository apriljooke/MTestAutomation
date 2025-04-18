import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.pause();
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only('get github link', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const homePage = new HomePage(page);
  await homePage.goto();
  const [newPage] = await Promise.all([context.waitForEvent('page'),
  homePage.gotoGitHub()])
  await newPage.waitForLoadState();
  expect(newPage.url()).toBe('https://github.com/microsoft/playwrightdupa');
});
