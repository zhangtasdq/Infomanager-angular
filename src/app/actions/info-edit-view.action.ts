import { Action, ActionCreator} from "redux";

import InfoDetail from "../models/info-detail.model";
import Info from "../models/info.model";

export const SET_CURRENT_EDIT_INFO = "[Info-Edit-View] Set Current Edit Info";
export const ADD_INFO_DETAIL = "[Info-Edit-View] Add Info Detail";
export const UPDATE_INFO_DETAIL_ITEM = "[Info-Edit-View] Update Info Detail Item";
export const DELETE_INFO_DETAIL_ITEM = "[Info-Edit-View] Delete Info Detail Item";

export interface SetCurrentEditInfoAction extends Action {
    currentInfo: Info
};

export const setCurrentEditInfo:ActionCreator<SetCurrentEditInfoAction> = (currentInfo:Info) => ({
    type: SET_CURRENT_EDIT_INFO,
    currentInfo,
});

export interface AddInfoDetailAction extends Action {
    infoDetail: InfoDetail
};

export const addInfoDetail:ActionCreator<AddInfoDetailAction> = (infoDetail:InfoDetail) => ({
    type: ADD_INFO_DETAIL,
    infoDetail
});

export interface UpdateInfoDetailItemAction extends Action {
    infoDetail: InfoDetail
};

export const updateInfoDetailItem:ActionCreator<UpdateInfoDetailItemAction> = (infoDetail:InfoDetail) => ({
    type: UPDATE_INFO_DETAIL_ITEM,
    infoDetail,
});

export interface DeleteInfoDetailItemAction extends Action {
    id:number
};

export const deleteInfoDetailItem:ActionCreator<DeleteInfoDetailItemAction> = (id:number) => ({
    type: DELETE_INFO_DETAIL_ITEM,
    id,
});