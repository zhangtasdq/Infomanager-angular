import { Injectable } from "@angular/core";

import { StatusCode } from "../configs/status-code.config";

@Injectable()
class AesService {
    decrypt(password:string, content:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.getAesTool().decrypt(password, content, (error:any, data:any) => {
            if (error) {
                callback(error, StatusCode.DECRYPT_FAILED);
            } else {
                callback(null, StatusCode.DECRYPT_SUCCESS, data);
            }
        });

    }

    encrypt(password:string, content:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.getAesTool().encrypt(password, content, (error:any, data:any) => {
            if (error) {
                callback(error, StatusCode.ENCRYPT_FAILED);
            } else {
                callback(null, StatusCode.ENCRYPT_SUCCESS, data);
            }
        });
    }

    private getAesTool():any {
        return cordova.plugins.Aestool;
    }
}

export default AesService;