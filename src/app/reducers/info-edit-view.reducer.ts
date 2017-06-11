import { Action } from "redux";

import * as InfoEditViewAction from "../actions/info-edit-view.action";
import { AppState } from "./index";
import Info from "../models/info.model";

export interface InfoEditViewState {
    currentInfo:Info
};

const initState:InfoEditViewState = {
    currentInfo: null
};

export const InfoEditViewReducer = function(state:InfoEditViewState = initState, action:Action) {
    switch(action.type) {
        case InfoEditViewAction.SET_CURRENT_EDIT_INFO:
            let currentInfo = (<InfoEditViewAction.SetCurrentEditInfoAction> action).currentInfo.clone();
            return {...state, currentInfo: currentInfo};
        
        case InfoEditViewAction.ADD_INFO_DETAIL:
            let copyDetail = (<InfoEditViewAction.AddInfoDetailAction> action).infoDetail.clone(),
                copyInfo = state.currentInfo.clone();
                
            copyInfo.details.push(copyDetail);
            return {...state, currentInfo: copyInfo};
        
        case InfoEditViewAction.UPDATE_INFO_DETAIL_ITEM:
            let updateInfo = state.currentInfo.clone(),
                updateDetailItem = (<InfoEditViewAction.UpdateInfoDetailItemAction>action).infoDetail.clone(),
                updateDetails = updateInfo.details.map((item) => item.id === updateDetailItem.id ? updateDetailItem : item);
            
            updateInfo.setDetails(updateDetails);
            return {...state, currentInfo: updateInfo};

        case InfoEditViewAction.DELETE_INFO_DETAIL_ITEM:
            let deleteInfo = state.currentInfo.clone(),
                deleteDetailId = (<InfoEditViewAction.DeleteInfoDetailItemAction>action).id,
                newDetails = deleteInfo.details.filter((item) => item.id !== deleteDetailId);

            deleteInfo.setDetails(newDetails);
            return {...state, currentInfo: deleteInfo};
            
        default:
            return state;
    }
}

export const getCurrentInfo = (state:AppState):Info => {
    return state.infoEditView.currentInfo;
}