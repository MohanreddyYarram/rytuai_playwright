
import {test,expect} from '@playwright/test'

test.describe('Crop Management or Field Management',()=>{
    test.beforeEach(async({page})=>{
    await page.goto('/');
        const langBtn = page.getByRole('button', {name: 'English'})
        if (await langBtn.isVisible()){
            await langBtn.click()
        }
    })

    test('Verify the Adding of new field',async({page})=>{

        //User Login
        await page.locator('#login-phone').fill(process.env.TEST_PHONE!)
        await page.locator('#login-password').fill(process.env.TEST_PASSWORD!)
        await page.getByRole('button',{name:'Login →'}).click();

        //Mandatory field validations for adding new field
        await expect(page.locator('#field-selector')).toBeVisible();
        await expect(page.getByText('🌾 Active Field',{exact:true})).toBeVisible()
        await page.waitForLoadState('load')
        await page.getByText('Switch',{exact:true}).click()
        await page.getByRole('button',{name:'+ Add New Field'}).click()
        await page.getByRole('button',{name:'Save Field'}).click();
        await expect(page.locator('#rytu-toast')).toHaveText('❌ Please fill field name, crop and acres')


    


    })
})