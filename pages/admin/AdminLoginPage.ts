
import { Page } from "@playwright/test";

export class AdminLoginPage{

    constructor(private page: Page){}

    async enterEmail(email:string){
        await this.page.locator("//input[@id='brn-input-1']").fill(email)
    }
    
    async enterPassword(password:string){
        await this.page.locator("//input[@id='brn-input-2']").fill(password)
        
        await this.page
        .locator("//input[@id='brn-input-2']")
        .press("Tab");
    }

    async clickSignIn(){
        await this.page.locator("//button[normalize-space()='Sign In']").click();
    }

    async login(email:string, password:string){

        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();

    }

}