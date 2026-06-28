
import {test,expect} from '../utils/fixtures'
import { FieldsPage } from '../pages/fields/FieldsPage';


test.describe('Crop Management or Field Management',()=>{
    let fieldspage:FieldsPage
    test.beforeEach(async({loggedInPage})=>{
        fieldspage = new FieldsPage(loggedInPage)
       
    })

    test('Verify mandatory fields for adding a new field',async({loggedInPage})=>{
        
        await fieldspage.mandatoryFieds()
        await expect(fieldspage.errorMsg).toHaveText('❌ Please fill field name, crop and acres')
    })

    test('Verify Adding new field',async({loggedInPage})=>{
        
        await expect(fieldspage.activeField).toBeVisible()
        const beforeAdding = await fieldspage.countFields()
        await fieldspage.addField('7 Acers','🌶️ Chilli','7','Nuthalapadu')
        expect (await fieldspage.countFields()).toBe(beforeAdding+1);
        
   })

   test('Verify deletion of field',async({loggedInPage})=>{

      await expect(fieldspage.activeField).toBeVisible();
      const beforeAdding = await fieldspage.countFields()
      await fieldspage.deleteField('7 Acers');
      expect (await fieldspage.countFields()).toBe(beforeAdding-1)
      

    })

   
})