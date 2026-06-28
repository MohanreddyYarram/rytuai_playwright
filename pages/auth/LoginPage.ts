
import { Page,Locator} from '@playwright/test'

export class LoginPage{
    readonly page:Page;
    readonly phoneInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    readonly errorMessage:Locator;


    constructor(page:Page){
        this.page = page;
        this.phoneInput = this.page.locator('#login-phone');
        this.passwordInput = this.page.locator('#login-password');
        this.loginButton = this.page.getByRole('button', {name:'Login →'});
        this.errorMessage = this.page.locator('#login-error');
    }
   
    async goto(){
        await this.page.goto('/')
        
    }

    async login(phone:string,password:string){
        await this.page.waitForLoadState('domcontentloaded')
        await this.phoneInput.fill(phone)
        await this.passwordInput.fill(password)
        await this.loginButton.click();
    }

    async selectLanguage() {
    const langBtn = this.page.getByRole('button', { name: 'English' });
       if (await langBtn.isVisible()) {
          await langBtn.click();
         }
    }
}  
