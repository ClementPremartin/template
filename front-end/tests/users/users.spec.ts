import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/users')
})

test.describe('Users Page', () => {
  test('should contains title', async ({ page }) => {
    await expect(page.getByText('Users List')).toBeVisible()
  })
})
