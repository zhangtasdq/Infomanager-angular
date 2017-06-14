import { Action } from "redux";

import * as InfoDetailEditViewAction from "../actions/info-detail-edit-view.action";
import { AppState } from "./index";
import InfoDetail from "../models/info-detail.model";

export interface InfoDetailEditViewState {
    currentInfoDetail: InfoDetail
};

const initState:InfoDetailEditViewState = {
    currentInfoDetail: null
};

export const InfoDetailEditViewReducer = function(state:InfoDetailEditViewState = initState, action:Action) {
    switch(action.type) {
        case InfoDetailEditViewAction.SET_CURRENT_EDIT_INFO_DETAIL:
            let currentInfoDetail = (<InfoDetailEditViewAction.SetCurrentEditInfoDetailAction> action).currentInfoDetail;
            return {...state, currentInfoDetail: currentInfoDetail};
        default:
            return state;
    }
};

export const getCurrentInfoDetail = (state:AppState) => {
    return state.infoDetailEditView.currentInfoDetail;
};