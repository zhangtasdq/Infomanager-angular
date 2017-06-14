import { Action } from "redux";

import { AppState } from "./index";
import * as LoginViewAction from "../actions/login-view.action";
import { StatusCode } from "../configs/status-code.config";

export interface LoginState {
    loginStatus: StatusCode,
    password:string
};

const initState:LoginState = {
    loginStatus: null,
    password: null
};

export const LoginReducer = function(state:LoginState = initState, action:Action) {
    switch(action.type) {
        case LoginViewAction.USER_BEGIN_LOGIN:
            let loginPassword = (<LoginViewAction.UserBeginLoginAction> action).password;
            return {...state, loginStatus: StatusCode.BEGIN_LOGIN, password: loginPassword};
        case LoginViewAction.USER_LOGIN_FAILED:
            return {...state, loginStatus: StatusCode.LOGIN_FAILED};
        case LoginViewAction.USER_LOGIN_SUCCESS:
            let password:string = (<LoginViewAction.userLoginSuccessAction> action).password;
            return {...state, password, loginStatus: StatusCode.LOGIN_SUCCESS};
        case LoginViewAction.RESET_USER_LOGIN_STATUS:
            return {loginStatus: null, password: null};
        default:
            return state;
    }
};

export const getLoginStatus = (state:AppState):StatusCode => {
    return state.loginView.loginStatus;
};

export const getLoginPassword = (state:AppState):string => {
    return state.loginView.password;
};