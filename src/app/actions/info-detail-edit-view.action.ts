import { Action, ActionCreator} from "redux";

import InfoDetail from "../models/info-detail.model";

export const SET_CURRENT_EDIT_INFO_DETAIL = "[Info-Detail-Edit-View] Set Current Edit Info Detail";

export interface SetCurrentEditInfoDetailAction extends Action {
    currentInfoDetail: InfoDetail
};

export const setCurrentEditInfoDetail:ActionCreator<SetCurrentEditInfoDetailAction> = (currentInfoDetail:InfoDetail) => ({
    type: SET_CURRENT_EDIT_INFO_DETAIL,
    currentInfoDetail
});