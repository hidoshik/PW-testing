import { test, expect } from '@playwright/test';

test('Automation Form Submissions @githubAction', async ({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc');

    const newTodo = await page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('API testing');
    await newTodo.press('Enter');
    await newTodo.fill('UI testing');
    await newTodo.press('Enter');
    
    const firstTodo = await page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();

    const secondTodo = await page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await expect(firstTodo).toHaveClass('completed')
})