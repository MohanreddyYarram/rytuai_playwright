
import {test,expect} from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';

let loginPage : LoginPage;

test.describe('Login Flow',()=>{
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        await loginPage.goto();
        await loginPage.selectLanguage();

    })

    test('TC01: Verify that user can login with valid credentials',async({page})=>{

        await loginPage.login(process.env.TEST_PHONE,process.env.TEST_PASSWORD);
        await expect(page.locator('.topbar-logo')).toHaveText('RytuAI');
    })

    test('TC02: Verify that user cannot login with invalid credentials',async({page})=>{
        await loginPage.login(process.env.TEST_PHONE,'MOhan123')
        await expect(loginPage.errorMessage).toHaveText('Incorrect password. Please try again.');
    })

    test('TC03: Verify that user cannot login with worng phone number',async({page})=>{
        await loginPage.login('9550108',process.env.TEST_PASSWORD)
        await expect(loginPage.errorMessage).toHaveText('Please enter valid 10-digit number');

    })

    test('TC04: Verify that user cannot login without registerd phone number',async({page})=>{
        await loginPage.login('9998668890','Mohan@334');
        await expect(loginPage.errorMessage).toHaveText('Phone number not registered. Please sign up.');
    })

    test('TC05: Verify that user cannot login with empty password field',async({page})=>{
        await loginPage.login(process.env.TEST_PHONE,'')
        await expect(loginPage.errorMessage).toHaveText('Please enter your password');
    })

    test('TC06: Verify that user cannot login with empty credentials',async({page})=>{
        await loginPage.login('','')
        await expect(loginPage.errorMessage).toHaveText('Please enter valid 10-digit number');
    })
})