import { Reducer, combineReducers, Action } from "redux";

import { RESET_APP_STATE } from "../actions/app.action";
import { UserState, UsersReducer } from "./user.reducer";
import { LoginState, LoginReducer } from "./login-view.reducer";


export interface AppState {
    users: UserState,
    loginView: LoginState
};

export const appReducer:Reducer<AppState> = combineReducers<AppState>({
    users: UsersReducer,
    loginView: LoginReducer
});

export const rootReducer:Reducer<AppState> = (state:AppState, action:Action) => {
    if (action.type === RESET_APP_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
};