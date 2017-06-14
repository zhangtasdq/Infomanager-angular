import { Injectable } from "@angular/core";

import { StatusCode } from "../configs/status-code.config";

@Injectable()
class OneDriveService {
    isFileExist(fileName:string, clientId:string, scope: string[], callback: (error?:any, data?:StatusCode) => void ):void {
        this.getOneDriveTool().isFileExists(fileName, clientId, scope, (fileExistError?:any, isExist?:boolean) => {
            if (fileExistError) {
                callback(fileExistError);
            } else {
                if (isExist) {
                    callback(null, StatusCode.FILE_EXIST);
                } else {
                    callback(null, StatusCode.FILE_NOT_EXIST);
                }
            }
        });
    }

    uploadFile(fileName:string, content:string, clientId:string, scope:string[], callback: (error?:any, statusCode?:any) => void):void {
        this.getOneDriveTool().saveFile(fileName, content, clientId, scope, (error) => {
            if (error) {
                callback(error, StatusCode.UPLOAD_FILE_FAILED);
            } else {
                callback(null, StatusCode.UPLOAD_FILE_SUCCESS);
            }
        });
    }

    downloadFile(fileName:string, clientId:string, scope:string[], callback: (error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.getOneDriveTool().downloadFile(fileName, clientId, scope, (error, data) => {
            if (error) {
                callback(error, StatusCode.DOWNLOAD_FILE_FAILED);
            } else {
                callback(null, StatusCode.DOWNLOAD_FILE_SUCCESS, data);
            }
        });
    }

    private getOneDriveTool():any {
        return cordova.plugins.OneDriveTool;
    }
}

export default OneDriveService;