import { Action } from "redux";

import * as InfoShowAction from "../actions/info-show-view.action";
import { AppState } from "./index";

export interface InfoShowViewState {
    infoId: number
};

const initState:InfoShowViewState = {
    infoId: null
};

export const InfoShowViewReducer = function(state:InfoShowViewState = initState, action:Action) {
    switch(action.type) {
        case InfoShowAction.SET_SHOW_INFO:
            let showId = (<InfoShowAction.SetShowInfoAction> action).infoId;
            return {...state, infoId: showId};
        default:
            return state;
    }
};

export const getCurrentShowInfoId = (state:AppState):number => {
    return state.infoShowView.infoId;
};