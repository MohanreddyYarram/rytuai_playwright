
import {test,expect} from '@playwright/test';

test.describe('Login Flow',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('/');
        const langBtn = page.getByRole('button', {name: 'English'})
        if (await langBtn.isVisible()){
            await langBtn.click()
        }

    })

    test('TC01: Verify that user can login with valid credentials',async({page})=>{

        await page.locator('#login-phone').fill(process.env.TEST_PHONE!);
        await page.locator('#login-password').fill(process.env.TEST_PASSWORD!);
        await page.getByRole('button',{name:'Login →'}).click();

        await expect(page.locator('.topbar-logo')).toHaveText('RytuAI');
    })

    test('TC02: Verify that user cannot login with invalid credentials',async({page})=>{
        await page.locator('#login-phone').fill(process.env.TEST_PHONE!);
        await page.locator('#login-password').fill('Mohan@246');
        await page.getByRole('button',{name:'Login →'}).click();
        await expect(page.locator('#login-error')).toHaveText('Incorrect password. Please try again.');
    })

    test('TC03: Verify that user cannot login with worng phone number',async({page})=>{

        await page.locator('#login-phone').fill('955010826');
        await page.locator('#login-password').fill(process.env.TEST_PASSWORD!);
        await page.getByRole('button',{name:'Login →'}).click();
        await expect(page.locator('#login-error')).toHaveText('Please enter valid 10-digit number');

    })

    test('TC04: Verify that user cannot login without registerd phone number',async({page})=>{
        await page.locator('#login-phone').fill('9999999999');
        await page.locator('#login-password').fill('Mohan@2468');
        await page.getByRole('button',{name:'Login →'}).click();
        await expect(page.locator('#login-error')).toHaveText('Phone number not registered. Please sign up.');
    })

    test('TC05: Verify that user cannot login with empty password field',async({page})=>{
        await page.locator('#login-phone').fill('9550108266');
        await page.locator('#login-password').fill('');
        await page.getByRole('button',{name:'Login →'}).click();
        await expect(page.locator('#login-error')).toHaveText('Please enter your password');
    })

    test('TC06: Verify that user cannot login with empty credentials',async({page})=>{
        await page.locator('#login-phone').fill('');
        await page.locator('#login-password').fill('');
        await page.getByRole('button',{name:'Login →'}).click();
        await expect(page.locator('#login-error')).toHaveText('Please enter valid 10-digit number');
    })
})