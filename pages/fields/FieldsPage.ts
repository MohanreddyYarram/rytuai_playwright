import {Page,Locator} from '@playwright/test'


export class FieldsPage{

    readonly page : Page;
    readonly activeField : Locator;
    readonly switchField : Locator;
    readonly addNewField : Locator;
    readonly fieldName: Locator;
    readonly cropType: Locator;
    readonly landArea: Locator;
    readonly village: Locator;
    readonly sowingDate: Locator;
    readonly saveField : Locator;
    readonly errorMsg : Locator;

    constructor(page:Page){
        this.page = page;
        this.activeField = page.locator("[onclick^='openFieldPicker']");
        this.switchField = page.getByText('Switch',{exact:true});
        this.addNewField = page.getByRole('button',{name:'+ Add New Field'});
        this.fieldName = page.locator('#new-field-name');
        this.cropType = page.locator('#new-field-crop');
        this.landArea = page.locator('#new-field-acres');
        this.village = page.locator('#new-field-village');
        this.sowingDate = page.locator('#new-field-sowing');
        this.saveField = page.getByRole('button',{name:'Save Field'})
        this.errorMsg = page.locator('#rytu-toast')
    }

    async mandatoryFieds(){
        await this.switchField.click();
        await this.addNewField.click();
        await this.saveField.click();
    }

    async addField(fieldname:string,crop:string,area:string,villageName:string){
    
        await this.addNewField.click();
        await this.fieldName.fill(fieldname)
        await this.cropType.selectOption(crop)
        await this.landArea.fill(area)
        await this.village.fill(villageName)
        await this.saveField.click()

    }

    async deleteField(fieldname:string){
    
        await this.page.locator(`[onclick*="${fieldname}"]`).click()
        await this.page.getByRole('button',{name:'Delete'}).click()
    }

    async countFields(){
        await this.switchField.click();
        return await this.page.locator('[onclick^="selectField"]').count()
    }

    async selectField(fieldname:string){
        await this.switchField.click();
        await this.page.getByText(`${fieldname}`,{exact:true}).click()
        //await this.page.locator(`[onclick*="${fieldname}"]`).click()
    }
}