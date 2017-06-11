import { Component, Inject } from "@angular/core";
import { Store } from "redux";
import { NavController } from "ionic-angular";

import { AppStore } from "../../app.store";
import { AppState } from "../../reducers/index";
import { StatusCode } from "../../configs/status-code.config";
import { userBeginLogin, userLoginSuccess, userLoginFailed, resetUserLoginStatus } from "../../actions/login-view.action";
import { setCurrentUser } from "../../actions/user.action";
import { getLoginStatus, getLoginPassword } from "../../reducers/login-view.reducer";

import UserService from "../../services/user.service";
import NoticeService from "../../services/notice.service";

import InfoListView from "../info-list/info-list.view";

@Component({
    templateUrl: "login.template.html",
    styles: ["login.style.scss"]
})
class LoginView {
    private inputPassword:string;
    private unsubscribeState;

    constructor(private navigator: NavController, 
                private noticeService:NoticeService, 
                @Inject(AppStore) private store:Store<AppState>, 
                private userService: UserService) {

        this.navigator = navigator;
        this.store = store;
        this.userService = userService;
        this.noticeService = noticeService;
        this.unsubscribeState = this.store.subscribe(() => this.listenUserLoginStatus());
    }

    ionViewWillUnload():void {
        this.unsubscribeState();
    }

    onLogin():void {
        if (!this.inputPassword) {
            this.noticeService.showNotice("notice.passwordCantBeEmpty");
            return;
        }
        this.store.dispatch(userBeginLogin(this.inputPassword));
        
        this.userService.login(this.inputPassword, (error?:any, statusCode?:StatusCode, data?:any) => {
            if (error) {
                console.log(error);
                this.store.dispatch(userLoginFailed());
            } else {
                this.store.dispatch(userLoginSuccess(data));
            }
        });
    }

    listenUserLoginStatus():void {
        let state = this.store.getState(),
            loginStatus = getLoginStatus(state),
            password = getLoginPassword(state);

        if (loginStatus === null) {
            this.inputPassword = password
            return;
        }

        if (loginStatus === StatusCode.BEGIN_LOGIN) {
            return;
        }

        this.store.dispatch(resetUserLoginStatus());
        if (loginStatus === StatusCode.LOGIN_SUCCESS) {
            this.noticeService.showNotice("notice.loginSuccess");
            this.store.dispatch(setCurrentUser(this.userService.createUser(password)));
            this.navigator.setRoot(InfoListView);
            return;
        }

        if (loginStatus === StatusCode.LOGIN_FAILED) {
            this.noticeService.showNotice("notice.loginFailed");
            return;
        }
    }
}

export default LoginView;