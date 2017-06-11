import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";

import { StatusCode } from "../configs/status-code.config";

@Injectable() 
class FileService {
    private appPath:string;

    constructor(private file: File) {
    }

    isFileExist(fileName:string, callback:(error?:any, statusCode?:StatusCode) => void):void {
        this.file.checkFile(this.getAppPath(), fileName).then((exists) => {
            callback(null, StatusCode.FILE_EXIST);
        }).catch((error:any) => {
            if (this.isFileNotExistError(error)) {
                callback(null, StatusCode.FILE_NOT_EXIST);
            } else {
                callback(error, StatusCode.CHEKC_FILE_EXIST_FAILED);
            }
        });
    }

    getFileContent(fileName:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.file.readAsText(this.getAppPath(), fileName).then((data:string) => {
            callback(null, StatusCode.GET_FILE_CONTENT_SUCCESS, data);
        }).catch((error) => {
            callback(error, StatusCode.GET_FILE_CONTENT_FAILED);
        });
    }

    saveFileContent(fileName:string, data:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.file.writeFile(this.getAppPath(), fileName, data, {append: false, replace: true}).then(() => {
            callback(null, StatusCode.SAVE_FILE_SUCCESS);
        }).catch((error:any) => {
            callback(error, StatusCode.SAVE_FILE_FAILED);
        });
    }

    private getAppPath():string {
        if (!this.appPath) {
            console.log(cordova);
            this.appPath = cordova.file.dataDirectory;
        }
        return this.appPath;
    }

    private isFileNotExistError(error:any):boolean {
        return error.message === this.file.cordovaFileError[1];
    }
}

export default FileService;