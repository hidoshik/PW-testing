import { Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { Button } from './Button';
import { Input } from './Input';

export class PageObject extends AbstractPage {
    private button: Button;
    private input: Input;

    readonly firstNameInputSelector = '#firstName';
    readonly ageInputSelector = '#age';
    readonly isAdminCheckboxSelector = '#isAdmin';
    readonly applyDataButtonSelector = '#applyData';
    
    readonly displayFirstName = '#displayFirstName';
    readonly displayAge = '#displayAge';
    readonly displayIsAdmin = '#displayIsAdmin';

    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    async open (url: string): Promise<void> {
        await this.page.goto(url);
    }

    async applyData(): Promise<void> {
        await this.button.clickButton(this.applyDataButtonSelector);
    }

    async fillFirstName(value: string): Promise<void> {
        await this.input.setInputValue(this.firstNameInputSelector, value);
    }

    async fillAge(value: string): Promise<void> {
        await this.input.setInputValue(this.ageInputSelector, value);
    }

    async checkIsAdmin(): Promise<void> {
        await this.page.check(this.isAdminCheckboxSelector);
    }

    async text(selector: string): Promise<string | null> {
        const textContext = await this.page.textContent(selector);
        return textContext ?? null;
    }
}