
import {test,expect} from '@playwright/test'

test.describe('New Farmer Registration Flow',()=>{

    test.beforeEach(async ({page})=>{
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded')
        const langBtn = page.getByRole('button', {name: 'English'})
        if (await langBtn.isVisible()){
            await langBtn.click()
        }

    })

    test('Verify the new farmer registration fields',async({page})=>{

        await page.getByRole('button',{name:'New farmer? Sign Up'}).click();
        await expect(page.locator('#reg-name')).toBeVisible();
        await expect(page.locator('#reg-email')).toBeVisible();
        await expect(page.locator('#reg-village')).toBeVisible();
        await expect(page.locator('#reg-district')).toBeVisible();
        await expect(page.locator('#reg-acres')).toBeVisible();
        await expect(page.locator('#reg-crop')).toBeVisible();
        await expect(page.locator('#reg-sowing')).toBeVisible();
        await expect(page.locator('#reg-password')).toBeVisible();
        await expect(page.locator('#reg-confirm-password')).toBeVisible();
        await expect(page.getByRole('button',{name:'Create Account →'})).toBeVisible()
        await expect(page.getByRole('button',{name:`📧 Login with Email OTP`})).toBeVisible();
    })

    test('Verify mandatory field',async({page})=>{
       
        const crtBtn = page.getByRole('button',{name:'Create Account →'})
        const lgnErr = page.locator('#login-error');
        await page.getByRole('button',{name:'New farmer? Sign Up'}).click();
        await crtBtn.click()
        await expect(lgnErr).toHaveText('📱 Please enter valid 10-digit mobile number')

        await page.locator("#reg-phone").fill('9909097869');
        await crtBtn.click()
        await expect(lgnErr).toHaveText('👤 Please enter your full name')
        
        await page.locator('#reg-name').fill("SAI")
        await crtBtn.click()
        await expect(lgnErr).toHaveText('📧 Please enter valid Gmail address')

        await page.locator('#reg-email').fill('sai@gmail.com')
        await crtBtn.click();
        await expect(lgnErr).toHaveText('🏘️ Please enter your village')

        await page.locator('#reg-village').fill('Nuthalapadu')
        await crtBtn.click();
        await expect(lgnErr).toHaveText('📍 Please enter your district')

        await page.locator('#reg-district').fill('Prakasam')
        await crtBtn.click();
        await expect(lgnErr).toHaveText('🌾 Please enter land area in acres')

        await page.locator('#reg-acres').fill('4')
        await crtBtn.click();
        await expect(lgnErr).toHaveText('🌱 Please select crop type')

        await page.locator('#reg-crop').selectOption(`🌶️ Chilli — మిరప`)
        await crtBtn.click()
        await expect(lgnErr).toHaveText('🔒 Password must be at least 8 characters')

        

    })

    test('Verify password field',async({page})=>{
        const crtBtn = page.getByRole('button',{name:'Create Account →'})
        await page.getByRole('button',{name:'New farmer? Sign Up'}).click();
        await page.locator("#reg-phone").fill('9909097869');
        await page.locator('#reg-name').fill("SAI");
        await page.locator('#reg-email').fill('sai@gmail.com');
        await page.locator('#reg-village').fill('Nuthalapadu');
        await page.locator('#reg-district').fill('Prakasam');
        await page.locator('#reg-acres').fill('4');
        await page.locator('#reg-crop').selectOption(`🌶️ Chilli — మిరప`);
        await page.locator('#reg-password').fill('sai123');
        await crtBtn.click()
        await expect(page.locator('#login-error')).toHaveText('🔒 Password must be at least 8 characters');

        //Adding password with morethan 8 char but without capitial letter
        await page.locator('#reg-password').fill('sai123456');
        await crtBtn.click()
        await expect(page.locator('#login-error')).toHaveText('🔒 Password must have at least one capital letter')

        //Adding Passowrd woth 8 chars with one letter capitial and without special char

        await page.locator('#reg-password').fill('Sai123456');
        await crtBtn.click()
        await expect(page.locator('#login-error')).toHaveText('🔒 Password must have at least one special character')

        //Adding different confirm password
        await page.locator('#reg-password').fill('Sai@1234');
        await page.locator('#reg-confirm-password').fill('sai@1234')
        await crtBtn.click()
        await expect(page.locator('#login-error')).toHaveText('🔒 Passwords do not match')
    })

    


})