import { test, expect } from '@playwright/test';
import { PageObject } from './page/Page';

test.describe('Sample test', () => {
    let pageObject: PageObject;

    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open('file:///Users/admin/code/Playwright-TS/tests/test-workshop/index.html');
    })

    test.skip('Fill all inputs', async () => {
        await pageObject.fillFirstName('Noah');
        await pageObject.fillAge('25');
        await pageObject.checkIsAdmin();
        await pageObject.applyData();

        const firstNameText = await pageObject.text(pageObject.displayFirstName);
        const ageText = await pageObject.text(pageObject.displayAge);
        const isAdminText = await pageObject.text(pageObject.displayIsAdmin);

        expect(firstNameText).toBe('Noah');
        expect(ageText).toBe('25');
        expect(isAdminText).toBe('Yes');
    })
})