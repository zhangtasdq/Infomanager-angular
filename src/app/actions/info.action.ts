import { Action, ActionCreator } from "redux";

import Info from "../models/info.model";


export const SET_INFOS = "[Info] Set Infos";

export const ADD_INFO = "[Info] Add Info";

export const UPDATE_INFO = "[Info] Update Info";

export const DELETE_INFO_BEGIN = "[Info] Delete Info Begin";
export const DELETE_INFO_FAILED = "[Info] Delete Info Failed";
export const DELETE_INFO_SUCCESS = "[Info] Delete Info Success";
export const DELETE_INFO = "[Info] Delete Info";
export const RESET_DELETE_INFO_STATUS = "[Info] Reset Delete Info Status";

export const SAVE_INFO_TO_LOCAL_BEGIN = "[Info] Save Info To Local Begin";
export const SAVE_INFO_TO_LOCAL_FAILED = "[Info] Save Info To Local Failed";
export const SAVE_INFO_TO_LOCAL_SUCCESS = "[Info] Save Info To Local Success";
export const RESET_SAVE_INFO_TO_LOCAL_STATUS = "[Info] Reset Save Info To Local Staus";

export interface SetInfosAction extends Action {
    infos: Info[]
};

export const setCurrentInfos:ActionCreator<SetInfosAction> = (infos) => ({
    type: SET_INFOS, 
    infos
});

export interface AddInfoAction extends Action {
    info: Info
};

export const addInfo:ActionCreator<AddInfoAction> = (info: Info) => ({
    type: ADD_INFO,
    info
});

export interface UpdateInfoAction extends Action {
    info: Info
};

export const updateInfo:ActionCreator<AddInfoAction> = (info:Info) => ({
    type: UPDATE_INFO,
    info
});

export const deleteInfoBegin:ActionCreator<Action> = () => ({
    type: DELETE_INFO_BEGIN
});

export const deleteInfoFailed:ActionCreator<Action> = () => ({
    type: DELETE_INFO_FAILED
});

export const deleteInfoSuccess:ActionCreator<Action> = () => ({
    type: DELETE_INFO_SUCCESS
});

export interface DeleteInfoAction extends Action {
    id: number;
};

export const deleteInfo:ActionCreator<DeleteInfoAction> = (id:number) => ({
    type: DELETE_INFO,
    id
});

export const resetDeleteInfoStatus:ActionCreator<Action> = () => ({
    type: RESET_DELETE_INFO_STATUS
});

export const saveInfoToLocalBegin:ActionCreator<Action> = () => ({
    type: SAVE_INFO_TO_LOCAL_BEGIN
});

export const saveInfoToLocalFailed:ActionCreator<Action> = () => ({
    type: SAVE_INFO_TO_LOCAL_FAILED
});

export const saveInfoToLocalSuccess:ActionCreator<Action> = () => ({
    type: SAVE_INFO_TO_LOCAL_SUCCESS
});

export const resetSaveIntoToLocalStatus:ActionCreator<Action> = () => ({
    type: RESET_SAVE_INFO_TO_LOCAL_STATUS
});