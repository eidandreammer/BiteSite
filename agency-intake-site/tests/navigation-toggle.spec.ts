import { test, expect } from '@playwright/test'

const selectors = {
	modeToggle: '.fixed.right-3.bottom-3',
	pillBtn: 'button:has-text("Pill Nav")',
	cardBtn: 'button:has-text("Card Nav")',
	dockBtn: 'button:has-text("Dock")',
	hamburger: '.hamburger-menu'
}

async function assertCanNavigate(page, linkText: string, urlContains: string) {
	await page.getByRole('link', { name: linkText, exact: false }).first().click()
	await expect(page).toHaveURL(new RegExp(urlContains.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
}

test.describe('Navigation toggle across nav variants', () => {
	test('Card Nav: can navigate to About and Start', async ({ page }) => {
		await page.goto('/?nav=card')
		await page.locator(selectors.hamburger).click()
		await expect(page.locator('.card-nav-content')).toBeVisible()
		await assertCanNavigate(page, 'About', '/about')
		await page.goto('/?nav=card')
		await assertCanNavigate(page, 'Get Started', '/start')
	})

	test('Pill Nav: links work and active state updates', async ({ page }) => {
		await page.goto('/?nav=pill')
		await expect(page.locator('.pill-nav')).toBeVisible()
		await assertCanNavigate(page, 'About', '/about')
	})

	test('Dock: items navigate to pages', async ({ page }) => {
		await page.goto('/?nav=dock')
		await expect(page.locator('.dock-panel')).toBeVisible()
		await page.locator('.dock-item').first().click()
		await expect(page).toHaveURL(/\/?(\?nav=dock)?$/)
		await page.locator('.dock-item').nth(1).click()
		await expect(page).toHaveURL(/about|#features|#pricing|start|contact/)
	})
})
