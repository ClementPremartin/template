import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
})

test.describe('Home Page', () => {
  test('should contains title', async ({ page }) => {
    await expect(page.getByText('My wonderfull App')).toBeVisible()
  })
})
