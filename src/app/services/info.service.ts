import { Injectable, Inject } from "@angular/core";

import FileService from "./file.service";
import AesService from "./aes.service";
import OneDriveService from "./onedrive.service";
import { APP_CONFIG, AppConfig } from "../configs/app.config";
import { StatusCode } from "../configs/status-code.config";
import InfoDetail from "../models/info-detail.model";
import Info from "../models/info.model";

@Injectable()
class InfoService {
    private infoFileName:string;
    private oneDriveClientId:string;
    private oneDriveScope:string[];

    constructor(private fileService:FileService, 
                private aesService:AesService, 
                private oneDriveService:OneDriveService, 
                @Inject(APP_CONFIG)appConfig: AppConfig) {
                    
        this.infoFileName = appConfig.infoFileName;
        this.oneDriveClientId = appConfig.oneDriveClientId;
        this.oneDriveScope = appConfig.oneDriveScope;
    }

    loadLocalInfo(password:string, callback:(error?:any, statusCode?:StatusCode, data?:any) => void):void {
        this.fileService.isFileExist(this.infoFileName, (checkFileExistError:any, checkFileExistStatusCode:StatusCode) => {
            if (checkFileExistError) {
                return callback(checkFileExistError, checkFileExistStatusCode);
            }

            if (checkFileExistStatusCode === StatusCode.FILE_NOT_EXIST) {
                return callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, []);
            }
            
            this.fileService.getFileContent(this.infoFileName, (getContentError?:any, getContentStatusCode?:StatusCode, fileContent?:any) => {
                if (getContentError) {
                    return callback(getContentError, getContentStatusCode);
                }
                if (!fileContent) {
                    return callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, []);
                }

                this.aesService.decrypt(password, fileContent, (decryptError?:any, decryptStatusCode?:StatusCode, decryptContent?:any) => {
                    if (decryptError) {
                        return callback(decryptError, decryptStatusCode);
                    } 
                    callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, this.covertStringToInfoLists(decryptContent));
                });
            });
        });
    }

    saveInfoToLocal(infos:Info[], password:string, callback:(error?:any, statusCode?:StatusCode) => void):void {
        let infoStr = JSON.stringify(infos);
        
        this.aesService.encrypt(password, infoStr, (encryptError, encryptStatus, encryptData) => {
            if (encryptError) {
                callback(encryptError, encryptStatus);
            }

            this.fileService.saveFileContent(this.infoFileName, encryptData, (saveFileError, saveFileStatus) => {
                if (saveFileError) {
                    callback(saveFileError, saveFileStatus);
                } else {
                    callback(null, StatusCode.SAVE_INTO_TO_LOCAL_SUCCESS);
                }
            });
        });
    }

    restoreInfos(callback: (error?:any, statusCode?:StatusCode) => void):void {
        this.oneDriveService.isFileExist(this.infoFileName, this.oneDriveClientId, this.oneDriveScope, (fileExistError?:any, statusCode?:StatusCode) => {
            if (fileExistError) {
                callback(fileExistError, StatusCode.RESTORE_INFO_FAILED);
            } else if (statusCode === StatusCode.FILE_NOT_EXIST) {
                callback(null, StatusCode.RESTORE_INFO_SUCCESS);
            } else {
                this.oneDriveService.downloadFile(this.infoFileName, this.oneDriveClientId, this.oneDriveScope, 
                        (downloadError?:any, downloadStatusCode?:StatusCode, downloadData?:any) => {
                    if (downloadError) {
                        callback(downloadError, StatusCode.RESTORE_INFO_FAILED);
                    } else {
                        this.fileService.saveFileContent(this.infoFileName, downloadData, (saveError?:any) => {
                            if (saveError) {
                                callback(saveError, StatusCode.RESTORE_INFO_FAILED);
                            } else {
                                callback(null, StatusCode.RESTORE_INFO_SUCCESS);
                            }
                        });
                    }
                });
            }
        });
        
    }

    backupInfos(callback: (error?:any, statusCode?:StatusCode) => void):void {
        this.fileService.isFileExist(this.infoFileName, (fileExistError?:any, fileExistStatus?:StatusCode) => {
            if (fileExistError) {
                return callback(fileExistError, StatusCode.BACKUP_INFO_FAILED);
            }
            if (fileExistStatus === StatusCode.FILE_NOT_EXIST) {
                return callback(null, StatusCode.BACKUP_INFO_SUCCESS);
            }

            this.fileService.getFileContent(this.infoFileName, (getFileError?:any, getFileStatus?:StatusCode, fileContent?:any) => {
                if (getFileError) {
                    callback(getFileError, StatusCode.BACKUP_INFO_FAILED);
                } else {
                    this.oneDriveService.uploadFile(this.infoFileName, fileContent, this.oneDriveClientId, this.oneDriveScope, 
                            (uploadError?:any, uploadStatus?:StatusCode) => {
                        if (uploadError) {
                            callback(uploadError, StatusCode.BACKUP_INFO_FAILED);
                        } else {
                            callback(null, StatusCode.BACKUP_INFO_SUCCESS);
                        }
                    })
                }
            });
        });
        
    }

    buildEmptyInfo():Info {
        return new Info("", "", []);
    }

    buildEmptyInfoDetail():InfoDetail {
        return new InfoDetail("", "");
    }

    private covertStringToInfoLists(infoStr: string): Info[] {
        let data = JSON.parse(infoStr);
        let results:Info[] = [];

        for(let i = 0, j = data.length; i < j; ++i) {
            let itemData = data[i];
            let detailsData = itemData.details;
            let details:InfoDetail[] = [];

            if (detailsData) {
                for(let k = 0, p = detailsData.length; k < p; ++k) {
                    let detailItem = new InfoDetail(detailsData[k].name, detailsData[k].content);
                    details.push(detailItem);
                }
            }

            let info = new Info(itemData.title, itemData.category, details);
            results.push(info);
        }

        return results;
    }
}

export default InfoService;