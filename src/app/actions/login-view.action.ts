import { Action, ActionCreator} from "redux";

export const USER_BEGIN_LOGIN = "[User] Begin Login";
export const USER_LOGIN_SUCCESS = "[User] Login Success";
export const USER_LOGIN_FAILED = "[User] Login Failed";
export const RESET_USER_LOGIN_STATUS = "[User] Reset Login Status";

export interface UserBeginLoginAction extends Action {
    password:string
};

export const userBeginLogin:ActionCreator<UserBeginLoginAction> = (password:string) => ({
    type: USER_BEGIN_LOGIN,
    password
});

export interface userLoginSuccessAction extends Action {
    password:string
};

export const userLoginSuccess:ActionCreator<userLoginSuccessAction> = (password:string) => ({
    type: USER_LOGIN_SUCCESS,
    password
});

export const userLoginFailed:ActionCreator<Action> = () => ({
    type: USER_LOGIN_FAILED
});

export const resetUserLoginStatus:ActionCreator<Action> = () => ({
    type: RESET_USER_LOGIN_STATUS
});
