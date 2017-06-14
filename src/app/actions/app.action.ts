import { ActionCreator, Action } from "redux";

export const RESET_APP_STATE = "[App] Reset App State";

export const resetAppState:ActionCreator<Action> = () => ({
    type: RESET_APP_STATE
});
