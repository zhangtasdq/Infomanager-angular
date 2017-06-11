import { Action, ActionCreator} from "redux";

export const LOAD_LOCAL_INFO_BEGIN = "[Info-List-View] Begin Load Local Info";
export const LOAD_LOCAL_INFO_SUCCESS = "[Info-List-View] Load Local Info Success";
export const LOAD_LOCAL_INFO_FAILED = "[Info-List-View] Load Local Info Failed";
export const SET_ACTIVE_CATEGORY = "[Info-List-View] Set Active Category";


export const BACKUP_INFO_BEGIN = "[Info-List-View] Backup Info Begin";
export const BACKUP_INFO_SUCCESS = "[Info-List-View] Backup Info Success";
export const BACKUP_INFO_FAILED = "[Info-List-View] Backup Info Failed";
export const RESET_BACKUP_INFO_STATUS = "[Info-List-View] Reset Backup Info Status";

export const RESTORE_INFO_BEGIN = "[Info-List-View] Restore Info Begin";
export const RESTORE_INFO_SUCCESS = "[Info-List-View] Restore Info Success";
export const RESTORE_INFO_FAILED = "[Info-List-View] Restore Info Failed";
export const RESET_RESTORE_INFO_STATUS = "[Info-List-View] Reset Restore Info Status";

export const loadLocalInfoBegin:ActionCreator<Action> = () => ({
    type: LOAD_LOCAL_INFO_BEGIN
});

export const loadLocalInfoSuccess:ActionCreator<Action> = () => ({
    type: LOAD_LOCAL_INFO_SUCCESS
});

export const loadLocalInfoFailed:ActionCreator<Action> = () => ({
    type: LOAD_LOCAL_INFO_FAILED
});

export interface SetActiveCategoryAction extends Action {
    activeCategory:string
};

export const setActiveCategory:ActionCreator<SetActiveCategoryAction> = (category:string) => ({
    type: SET_ACTIVE_CATEGORY,
    activeCategory: category
});

export const backupInfoBegin:ActionCreator<Action> = () => ({
    type: BACKUP_INFO_BEGIN
});

export const backupInfoSuccess:ActionCreator<Action> = () => ({
    type: BACKUP_INFO_SUCCESS
});

export const backupInfoFailed:ActionCreator<Action> = () => ({
    type: BACKUP_INFO_FAILED
});
export const resetBackupInfoStatus:ActionCreator<Action> = () => ({
    type: RESET_BACKUP_INFO_STATUS
});

export const restoreInfoBegin:ActionCreator<Action> = () => ({
    type: RESTORE_INFO_BEGIN
});

export const restoreInfoSuccess:ActionCreator<Action> = () => ({
    type: RESTORE_INFO_SUCCESS
});

export const restoreInfoFailed:ActionCreator<Action> = () => ({
    type: RESTORE_INFO_FAILED
});
export const resetRestoreInfoStatus:ActionCreator<Action> = () => ({
    type: RESET_RESTORE_INFO_STATUS
});