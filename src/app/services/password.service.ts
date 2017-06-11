import { Inject, Injectable } from "@angular/core";

import { AppConfig, APP_CONFIG } from "../configs/app.config";

@Injectable() 
class PasswordService {
    private paddingChars:string[];
    private passwordLength: number;

    constructor(@Inject(APP_CONFIG) appConfig:AppConfig) {
        this.paddingChars = appConfig.paddingPasswordChars;
        this.passwordLength = appConfig.passwordLength;
    }

    paddingPassword(password:string):string {
        let newPassword = password;

        if (newPassword.length >= this.passwordLength) {
            return newPassword;
        }

        let paddingCount = this.passwordLength - newPassword.length,
            leftCount = Math.floor(paddingCount / 2),
            rightCount = this.passwordLength - newPassword.length - leftCount;
            
        for(let i = 0; i < leftCount; ++i) {
            newPassword = this.paddingChars[i % this.paddingChars.length] + newPassword;
        }
        
        for(let i = 0; i < rightCount; ++i) {
            newPassword = newPassword + this.paddingChars[i % this.paddingChars.length];
        }
        
        return newPassword;
    }
}

export default PasswordService;