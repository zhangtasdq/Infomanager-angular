import { Action } from "redux";
import { createSelector } from "reselect";

import Info from "../models/info.model";
import * as InfoAction from "../actions/info.action";

import { AppState } from "./index";
import { StatusCode } from "../configs/status-code.config";

export interface InfoState {
    infos: Info[],
    deleteInfoStatus: StatusCode,
    saveIntoToLocalStatus: StatusCode
}

const initState:InfoState = {
    infos: [],
    deleteInfoStatus: null,
    saveIntoToLocalStatus: null
}

export const InfoReducer = function(state:InfoState = initState, action:Action) {
    switch(action.type) {
        case InfoAction.SET_INFOS:
            let infos = (<InfoAction.SetInfosAction> action).infos;
            return {...state, infos: infos}
        case InfoAction.ADD_INFO:
            let info = (<InfoAction.AddInfoAction> action).info,
                addResult = state.infos.concat(info);

            return {...state, addInfoStatus: StatusCode.ADD_INFO_FINISH, infos: addResult};
        case InfoAction.UPDATE_INFO:
            let updateInfo = (<InfoAction.UpdateInfoAction> action).info,
                updateInfos = state.infos.map((item) => item.id === updateInfo.id ? updateInfo.clone() : item);
        
            return {...state, infos: updateInfos};
        
        case InfoAction.SAVE_INFO_TO_LOCAL_BEGIN:
            return {...state, saveIntoToLocalStatus: StatusCode.SAVE_INTO_TO_LOCAL_BEGIN};
        case InfoAction.SAVE_INFO_TO_LOCAL_FAILED:
            return {...state, saveIntoToLocalStatus: StatusCode.SAVE_INTO_TO_LOCAL_FAILED};
        case InfoAction.SAVE_INFO_TO_LOCAL_SUCCESS:
            return {...state, saveIntoToLocalStatus: StatusCode.SAVE_INTO_TO_LOCAL_SUCCESS};
        case InfoAction.RESET_SAVE_INFO_TO_LOCAL_STATUS:
            return {...state, saveIntoToLocalStatus: null};
        
        case InfoAction.DELETE_INFO_BEGIN:
            return {...state, deleteInfoStatus: StatusCode.DELETE_INFO_BEGIN};
        case InfoAction.DELETE_INFO_FAILED:
            return {...state, deleteInfoStatus: StatusCode.DELETE_INFO_FAILED};
        case InfoAction.DELETE_INFO_SUCCESS:
            return {...state, deleteInfoStatus: StatusCode.DELETE_INFO_SUCCESS};
        case InfoAction.DELETE_INFO:
            let deleteId = (<InfoAction.DeleteInfoAction> action).id,
                deleteResults = state.infos.filter((item) => item.id !== deleteId);
            console.log(deleteResults);
            console.log(deleteId);
            return {...state, infos: deleteResults, deleteInfoStatus: StatusCode.DELETE_INFO_FINISH};
        case InfoAction.RESET_DELETE_INFO_STATUS:
            return {...state, deleteInfoStatus: null};

        default:
            return state;
    }
};

export const getAllInfos = (state:AppState):Info[] => {
    return state.infos.infos;
}

export const getFirstInfo = createSelector(
    getAllInfos,
    (infos: Info[]) => infos[0]
)

export const getInfoById = (state:AppState, id:number):Info => {
    let infos = state.infos.infos;

    for(let i = 0, j = infos.length; i < j; ++i) {
        if (infos[i].id === id) {
            return infos[i];
        }
    }
    return null;
}

export const getInfoByCategory = (state:AppState, category:string):Info[] => {
    return getAllInfos(state).filter((info) => info.category === category);
}

export const getInfoDetailById = (state:AppState, infoId:number, detailId:number) => {
    let details = getInfoById(state, infoId).details;

    for(let i = 0, j = details.length; i < j; ++i) {
        if (details[i].id === detailId) {
            return details[i];
        }
    }

    return null;
}

export const getSaveIntoToLocalStatus = (state:AppState):StatusCode => {
    return state.infos.saveIntoToLocalStatus;
}

export const getAllCategories = createSelector(
    getAllInfos,
    (infos:Info[]) => {
        let results = [],
            item = null;

        for(let i = 0, j = infos.length; i < j; ++i) {
            item = infos[i];
            if (results.indexOf(item.category) === -1) {
                results.push(item.category);
            }
        }
        return results;
    }
);

export const getInfoWithOut = (state:AppState, skipId):Info[] => {
    let infos = getAllInfos(state);

    return infos.filter((item) => item.id !== skipId);
}

export const getDeleteInfoStatus = (state:AppState):StatusCode => {
    return state.infos.deleteInfoStatus;
}