import { OpaqueToken } from "@angular/core";

export interface AppConfig {
    language:string,
    passwordLength: number,
    infoFileName: string,
    oneDriveClientId:string,
    oneDriveScope: string[],
    paddingPasswordChars: string[]
};

export const AppConfigValue:AppConfig = {
    language: "zhCN",
    passwordLength: 256,
    infoFileName: "info_manager_data_file",
    oneDriveClientId: "",
    oneDriveScope: ["onedrive.appfolder"],
    paddingPasswordChars: ['`', '~', '(', ')', ':', '"', ',', '!', '@', '+', 'a', 'c',
                           'd', '.', '\\', 'w', 'r', 'p', 'l', 'e', '=', '&', '^', '$',
                           '#', '?', '>', '<', ';', '{', 'y', 'v', 'm', 'i', 'g', 'h',
                           'H', 'P', 'S', 'Q', '}', '|', '[', ']', '*', '%', 'X', 'Z',
                           'S', 'J']
};

export const APP_CONFIG = new OpaqueToken("app.config");