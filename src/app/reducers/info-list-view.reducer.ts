import { Action } from "redux";

import * as InfoListViewAction from "../actions/info-list-view.action";
import { AppState } from "./index";
import { StatusCode } from "../configs/status-code.config";

export interface InfoListViewState {
    activeCategory:string,
    loadLocalInfoStatus: StatusCode,
    backupInfoStatus:StatusCode,
    restoreInfoStatus:StatusCode
};

const initState:InfoListViewState = {
    activeCategory: "",
    loadLocalInfoStatus: null,
    backupInfoStatus: null,
    restoreInfoStatus: null
};

export const InfoListViewReducer = function(state:InfoListViewState = initState, action:Action) {
    switch(action.type) {
        case InfoListViewAction.LOAD_LOCAL_INFO_BEGIN:
            return {...state, loadLocalInfoStatus: StatusCode.BEGIN_LOAD_LOCAL_INFO};
        case InfoListViewAction.LOAD_LOCAL_INFO_SUCCESS:
            return {...state, loadLocalInfoStatus: StatusCode.LOAD_LOCAL_INFO_SUCCESS};
        case InfoListViewAction.loadLocalInfoSuccess:
            return {...state, loadLocalInfoStatus: StatusCode.LOAD_LOCAL_INFO_SUCCESS};
        case InfoListViewAction.SET_ACTIVE_CATEGORY:
            let category:string = (<InfoListViewAction.SetActiveCategoryAction> action).activeCategory;
            return {...state, activeCategory: category};
        
        case InfoListViewAction.BACKUP_INFO_BEGIN:
            return {...state, backupInfoStatus: StatusCode.BACKUP_INFO_BEGIN};
        case InfoListViewAction.BACKUP_INFO_SUCCESS:
            return {...state, backupInfoStatus: StatusCode.BACKUP_INFO_SUCCESS};
        case InfoListViewAction.BACKUP_INFO_FAILED:
            return {...state, backupInfoStatus: StatusCode.BACKUP_INFO_FAILED};
        case InfoListViewAction.RESET_BACKUP_INFO_STATUS:
            return {...state, backupInfoStatus: null};

        case InfoListViewAction.RESTORE_INFO_BEGIN:
            return {...state, restoreInfoStatus: StatusCode.RESTORE_INFO_BEGIN};
        case InfoListViewAction.RESTORE_INFO_SUCCESS:
            return {...state, restoreInfoStatus: StatusCode.RESTORE_INFO_SUCCESS};
        case InfoListViewAction.RESTORE_INFO_FAILED:
            return {...state, restoreInfoStatus: StatusCode.RESTORE_INFO_FAILED};
        case InfoListViewAction.RESET_RESTORE_INFO_STATUS:
            return {...state, restoreInfoStatus: null};    
        default:
            return state;
    }
};

export const getActiveCategory = (state:AppState):string => {
    return state.infoListView.activeCategory;
};

export const getRestoreStatus = (state:AppState):StatusCode => {
    return state.infoListView.restoreInfoStatus;
};

export const getBackupStatus = (state:AppState):StatusCode => {
    return state.infoListView.backupInfoStatus;
};