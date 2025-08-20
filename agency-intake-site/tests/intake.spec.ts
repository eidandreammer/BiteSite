import { test, expect } from '@playwright/test'

test.describe('Intake E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the edge function call and respond with success
    await page.route('**/functions/v1/intake-submit', async (route) => {
      const body = await route.request().postDataJSON()
      if (!body.turnstileToken) {
        return route.fulfill({ status: 400, body: JSON.stringify({ error: 'missing_captcha' }) })
      }
      return route.fulfill({ status: 201, body: JSON.stringify({ ok: true, intakeId: 'e2e-intake-id' }) })
    })
  })

  test('submits multi-step form', async ({ page }) => {
    await page.goto('/start')
    await expect(page.getByRole('heading', { name: 'Start a Project' })).toBeVisible()

    // Step 1: Business Info
    await page.getByPlaceholder('Your Business Name').fill('Acme Co')
    await page.locator('label:has-text("Industry *") + div select').selectOption({ label: 'Retail & E-commerce' })
    await page.locator('label:has-text("Country *") + div select').selectOption({ label: 'United States' })
    await page.locator('label:has-text("State *") + select').selectOption('CA')
    await page.getByPlaceholder('123 Main Street').fill('1 Main St')
    await page.getByPlaceholder('City Name').fill('San Francisco')
    await page.getByPlaceholder('12345 or A1B 2C3').fill('94105')
    await page.getByLabel('Phone *').fill('5551234567')
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 2: Goals & Pages
    await page.getByText('Phone Calls').click()
    await page.getByText('Lead Capture').click()
    await page.getByText('Home').click()
    await page.getByText('About').click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 3: Style & Colors (brand color defaults are fine)
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 4: Templates & Inspiration
    await page.getByText('Style A').first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 5: Additional Features (optional)
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 6: Review & Submit
    // Mock Turnstile token on window
    await page.addInitScript(() => {
      // @ts-ignore
      window.turnstile = { getResponse: () => 'e2e-mock-token' }
    })

    // Submit on step 6 main button
    await page.getByRole('button', { name: 'Submit Project Request' }).click()

    await expect(page.getByText(/Your project has been submitted successfully/)).toBeVisible()
  })
})


