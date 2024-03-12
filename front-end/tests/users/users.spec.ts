import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('http://localhost:4000/api', async (route) => {
    const json = {
      data: {
        getUsers: [
          {
            lastname: 'Potter',
            id: 'fe361d2e-52f1-4dad-b7a2-19f61a1adb5c',
            firstname: 'Harry',
            email: 'harrypotter@email.com',
            createdAt: '2024-03-08T16:36:52.103Z',
          },
          {
            lastname: 'Wisley',
            id: 'ef37274d-5517-4264-9fc1-487959a89ac2',
            firstname: 'Ron',
            email: 'ronwisley@email.com',
            createdAt: '2024-03-12T10:03:45.956Z',
          },
        ],
      },
    }
    await route.fulfill({ json })
  })

  await page.goto('http://localhost:3000/users')
})

test.describe('Users Page', () => {
  test('should contains title', async ({ page }) => {
    await expect(page.getByText('Users List')).toBeVisible()
    await expect(page.getByText('Harry Potter')).toBeVisible()
    await expect(page.getByText('harrypotter@email.com')).toBeVisible()
    await expect(page.getByText('Ron Wisley')).toBeVisible()
    await expect(page.getByText('ronwisley@email.com')).toBeVisible()
  })
})
