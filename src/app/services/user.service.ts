import { Injectable, Inject } from "@angular/core";

import { StatusCode } from "../configs/status-code.config";
import { APP_CONFIG, AppConfig } from "../configs/app.config";
import AesService from "./aes.service";
import FileService from "./file.service";
import PasswordService from "./password.service";
import User from "../models/user.model";

@Injectable()
class UserService {
    private infoFileName:string;

    constructor(@Inject(APP_CONFIG) appConfig:AppConfig,
                private aesService:AesService, 
                private fileService:FileService, 
                private passwordService:PasswordService) {

        this.infoFileName = appConfig.infoFileName;
    }

    login(password:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        let paddingPassword:string = this.passwordService.paddingPassword(password);

        this.fileService.isFileExist(this.infoFileName, (fileExistError, fileExistStatusCode) => {
            if (fileExistError) {
                callback(fileExistError, fileExistStatusCode);
            } else if (fileExistStatusCode === StatusCode.FILE_NOT_EXIST) {
                callback(null, StatusCode.LOGIN_SUCCESS, paddingPassword);
            } else {
                this.fileService.getFileContent(this.infoFileName, (fileContentError, fileContentStatusCode, data) => {
                    if (fileContentError) {
                        return callback(fileContentError, fileContentStatusCode);
                    }

                    this.aesService.decrypt(paddingPassword, data, (decryptError, decryptStatusCode) => {
                        if (decryptError) {
                            callback(decryptError, decryptStatusCode);
                        } else {
                            callback(null, StatusCode.LOGIN_SUCCESS, paddingPassword);
                        }
                    });
                });
            }
        });
    }

    createUser(password:string):User {
        return new User(password);
    }
}

export default UserService;