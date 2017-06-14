import { Action, ActionCreator } from "redux";

export const SET_SHOW_INFO = "[Info-Show-View] Set Show Info";

export interface SetShowInfoAction extends Action {
    infoId:number
};

export const setShowInfo:ActionCreator<SetShowInfoAction> = (infoId: number) => ({
    type: SET_SHOW_INFO,
    infoId
});