import {test as base , expect } from '@playwright/test'
import { LoginPage } from '../pages/auth/LoginPage';

type MyFixtures = {
    loggedInPage : any;
};



export const test = base.extend<MyFixtures>({
   loggedInPage : async({page},use) =>{
         const loginPage = new LoginPage(page)
         await loginPage.goto()
         await loginPage.selectLanguage()
         await loginPage.login(process.env.TEST_PHONE!,process.env.TEST_PASSWORD!);
         await use(page)

        }
});

export {expect} from '@playwright/test'