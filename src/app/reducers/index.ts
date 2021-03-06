import { Reducer, combineReducers, Action } from "redux";

import { RESET_APP_STATE } from "../actions/app.action";
import { UserState, UsersReducer } from "./user.reducer";
import { InfoState, InfoReducer } from "./info.reducer";
import { LoginState, LoginReducer } from "./login-view.reducer";
import { InfoListViewState, InfoListViewReducer } from "./info-list-view.reducer";
import { InfoEditViewState, InfoEditViewReducer } from "./info-edit-view.reducer";
import { InfoDetailEditViewState, InfoDetailEditViewReducer } from "./info-detail-edit-view.reducer";
import { InfoShowViewState, InfoShowViewReducer } from "./info-show-view.reducer";

export interface AppState {
    users: UserState,
    infos: InfoState,
    loginView: LoginState,
    infoListView: InfoListViewState,
    infoEditView: InfoEditViewState,
    infoDetailEditView: InfoDetailEditViewState,
    infoShowView: InfoShowViewState
};

export const appReducer:Reducer<AppState> = combineReducers<AppState>({
    users: UsersReducer,
    infos: InfoReducer,
    loginView: LoginReducer,
    infoListView: InfoListViewReducer,
    infoEditView: InfoEditViewReducer,
    infoDetailEditView: InfoDetailEditViewReducer,
    infoShowView: InfoShowViewReducer
});

export const rootReducer:Reducer<AppState> = (state:AppState, action:Action) => {
    if (action.type === RESET_APP_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
};