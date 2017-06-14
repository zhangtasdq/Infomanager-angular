import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "redux";
import { NavController, NavParams, AlertController, Events } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

import { StatusCode } from "../../configs/status-code.config";
import { AppStore } from "../../app.store";
import { AppState } from "../../reducers/index";
import { getCurrentUserPassword } from "../../reducers/user.reducer";
import { getInfoById, getInfoWithOut, getDeleteInfoStatus } from "../../reducers/info.reducer";
import { deleteInfoBegin, deleteInfoFailed, deleteInfoSuccess, resetDeleteInfoStatus, deleteInfo } from "../../actions/info.action";
import { setShowInfo } from "../../actions/info-show-view.action";
import { getCurrentShowInfoId } from "../../reducers/info-show-view.reducer";

import Info from "../../models/info.model";

import NoticeService from "../../services/notice.service";
import InfoService from "../../services/info.service";

import LockerView from "../locker.view";
import InfoEditView from "../info-edit/info-edit.view";

@Component({
    templateUrl: "info-show.template.html",
    styles: ["info-show.style.scss"]
})
class InfoShowView extends LockerView implements OnInit {
    private currentInfo:Info;
    private unsubscribeState;

    constructor(navigator: NavController,  @Inject(AppStore) store:Store<AppState>, events:Events, 
                private noticeService:NoticeService, 
                private params:NavParams, 
                private alertController:AlertController, 
                private translateService:TranslateService, 
                private infoService:InfoService ) {
        super(navigator, store, events);
        this.unsubscribeState = this.store.subscribe(() => {this.handleShowInfoChange()});
    }

    ionViewWillUnload():void {
        super.ionViewWillUnload();
        this.stopListenStateChange();
    }

    ngOnInit():void {
        this.store.dispatch(setShowInfo(this.params.get("infoId")));
    }

    stopListenStateChange():void {
        if (this.unsubscribeState !== null) {
            this.unsubscribeState();
            this.unsubscribeState = null;            
        }
    }

    private handleShowInfoChange():void {
        let state = this.store.getState(),
            deleteInfoStatus = getDeleteInfoStatus(state);

        if (deleteInfoStatus !== null) {
            if (deleteInfoStatus === StatusCode.DELETE_INFO_FAILED) {
                this.noticeService.showNotice("notice.deleteInfoFailed");
                this.store.dispatch(resetDeleteInfoStatus());
            } else if (deleteInfoStatus === StatusCode.DELETE_INFO_SUCCESS) {
                this.store.dispatch(deleteInfo(getCurrentShowInfoId(this.store.getState())));
            } else if (deleteInfoStatus === StatusCode.DELETE_INFO_FINISH) {
                this.store.dispatch(resetDeleteInfoStatus());
                this.noticeService.showNotice("notice.deleteInfoSuccess");
                setTimeout(() => {
                    this.navigator.pop();
                    this.navigator.pop();
                }, 1200);
            }
            return;
        }
        let info = getInfoById(state, getCurrentShowInfoId(state));
        if (info) {
            this.currentInfo = info;
        }
    }

    private tryDeleteInfo():void {
        this.translateService.get(["dialog.deleteInfo.title", "dialog.deleteInfo.content",  "delete", "cancel"]).subscribe((data) => {
            let dialog = this.alertController.create({
                title: data["dialog.deleteInfo.title"],
                message: data["dialog.deleteInfo.content"],
                buttons: [{
                    text: data["delete"],
                    handler: () => {
                        this.deleteInfo();
                    }
                }, {
                    text: data["cancel"]
                }]
            });
            dialog.present();
        });
    }

    private deleteInfo() {
        let state = this.store.getState(),
            infos = getInfoWithOut(this.store.getState(), getCurrentShowInfoId(state)),
            userPassword = getCurrentUserPassword(state);

        this.store.dispatch(deleteInfoBegin());
        this.infoService.saveInfoToLocal(infos, userPassword, (saveError) => {
            if (saveError) {
                this.store.dispatch(deleteInfoFailed());
            } else {
                this.store.dispatch(deleteInfoSuccess());
            }
        });
    }

    private editInfo():void {
        this.navigator.push(InfoEditView, {action: "edit", id: getCurrentShowInfoId(this.store.getState())});
    }
}

export default InfoShowView;