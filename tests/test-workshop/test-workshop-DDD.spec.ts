import { test, expect } from '@playwright/test';
import { PageObject } from './page/Page';
import * as testData from './testData.json';

test.describe('Sample test', () => {
    let pageObject: PageObject;

    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open('file:///Users/admin/code/Playwright-TS/tests/test-workshop/index.html');
    })

    for (const data of Object.values(testData)) {
        test(data.testName, async () => {
            await pageObject.fillFirstName(data.firstName);
            await pageObject.fillAge(data.age);
            if (data.isAdmin) {
                await pageObject.checkIsAdmin();
            }
            await pageObject.applyData();

            const firstNameText = await pageObject.text(pageObject.displayFirstName);
            const ageText = await pageObject.text(pageObject.displayAge);
            const isAdminText = await pageObject.text(pageObject.displayIsAdmin);

            expect(firstNameText).toBe(data.expectedFirstName);
            expect(ageText).toBe(data.expectedAge);
            expect(isAdminText).toBe(data.expectedIsAdmin);
        })
    }
})