
import {test,expect} from '@playwright/test'

test.describe('Crop Management or Field Management',()=>{
    test.beforeEach(async({page})=>{
       await page.goto('/');
       await page.waitForLoadState('networkidle')
        const langBtn = page.getByRole('button', {name: 'English'})
        if (await langBtn.isVisible()){
            await langBtn.click()
        }
        await page.locator('#login-phone').fill(process.env.TEST_PHONE!)
        await page.locator('#login-password').fill(process.env.TEST_PASSWORD!)
        await page.getByRole('button',{name:'Login →'}).click();
    })

    test('Verify mandatory fields for adding a new field',async({page})=>{

        

        //Mandatory field validations for adding new field
        await expect(page.locator('#field-selector')).toBeVisible();
        await expect(page.getByText('🌾 Active Field',{exact:true})).toBeVisible()
        await page.waitForLoadState('load')
        await page.getByText('Switch',{exact:true}).click()
        await page.getByRole('button',{name:'+ Add New Field'}).click()
        await page.getByRole('button',{name:'Save Field'}).click();
        await expect(page.locator('#rytu-toast')).toHaveText('❌ Please fill field name, crop and acres')
    })

    test('Verify Adding new field',async({page})=>{
        await expect(page.getByText('🌾 Active Field',{exact:true})).toBeVisible()
        await page.getByText('Switch',{exact:true}).click()
        const beforeAdd = await page.locator('[onclick^="selectField"]').count()
        await page.getByRole('button',{name:'+ Add New Field'}).click()
        await page.locator('#new-field-name').fill('6 Acers');
        await page.locator('#new-field-crop').selectOption('🌶️ Chilli')
        await page.locator('#new-field-acres').fill('5')
        await page.getByRole('button',{name:'Save Field'}).click();
        await expect(page.getByText('🌾 Active Field',{exact:true})).toBeVisible()
        await page.getByText('Switch',{exact:true}).click()
        await expect(await page.locator('[onclick^="selectField"]').count()).toBe(beforeAdd+1);
   })

   test('Verify deletion of field',async({page})=>{
      await page.getByText('Switch',{exact:true}).click();
      const beforeDelete = await page.locator('[onclick^="selectField"]').count()
      await expect(page.getByText('🌾 6 Acers',{exact:true})).toBeVisible();
      await page.locator('[onclick *="6 Acers"]').click()
      await page.getByRole('button',{name:'Delete'}).click()
      await page.getByText('Switch',{exact:true}).click();
      await expect(await page.locator('[onclick^="selectField"]').count()).toBe(beforeDelete-1);

    })

    test('verify selected field is showing in home page',async({page})=>{
      await page.getByText('Switch',{exact:true}).click();
      await expect(page.getByText('🌾 Pedda Chenu',{exact:true})).toBeVisible();
      await expect(page.getByText('🌾 Pedda Chenu',{exact:true})).toBeVisible();
    
    })
})