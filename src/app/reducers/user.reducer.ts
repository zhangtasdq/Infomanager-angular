import { Action } from "redux";
import { createSelector } from "reselect";

import User from "../models/user.model";
import { AppState } from "./index";
import * as UserActions from "../actions/user.action";

export interface UserState {
    currentUser: User
}

const initState:UserState = {
    currentUser: null
}

export const UsersReducer = function(state:UserState = initState, action:Action) {
    switch(action.type) {
        case UserActions.SET_CURRENT_USER:
            const user:User = (<UserActions.SetCurrentUserAction> action).user;
            return {...state, currentUser: user};
        default:
            return state;
    }
};

export const getCurrentUserInfo = (state:AppState):UserState => {
    return state.users;
}

export const getCurrentUser = createSelector(
    getCurrentUserInfo,
    (state:UserState) => state.currentUser
)

export const getCurrentUserPassword = createSelector(
    getCurrentUser, 
    (user:User) => user ?  user.getPassword() : null
);
