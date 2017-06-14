import { Component, OnInit, Inject } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { Store } from "redux";
import { TranslateService } from "@ngx-translate/core";

import { StatusCode } from "../../configs/status-code.config";
import { AppState } from "../../reducers/index";
import { AppStore } from "../../app.store";
import { getInfoById, getAllInfos, getSaveIntoToLocalStatus } from "../../reducers/info.reducer";
import { getCurrentUserPassword } from "../../reducers/user.reducer";
import { 
    addInfo, 
    updateInfo, 
    saveInfoToLocalBegin, 
    saveInfoToLocalFailed, 
    saveInfoToLocalSuccess, 
    resetSaveIntoToLocalStatus
} from "../../actions/info.action";
import { setCurrentEditInfo } from "../../actions/info-edit-view.action";
import { getCurrentInfo } from "../../reducers/info-edit-view.reducer";

import InfoDetail from "../../models/info-detail.model";
import Info from "../../models/info.model";
import InfoService from "../../services/info.service";
import NoticeService from "../../services/notice.service";

import LockerView from "../locker.view";
import InfoDetailEditView from "../info-detail-edit/info-detail-edit.view";

@Component({
    templateUrl: "info-edit.template.html",
    styles: ["info-edit.style.scss"]
})
class InfoEditView extends LockerView implements OnInit {
    private currentInfo:Info;
    private titleText:string;
    private unsubscribeState;

    constructor(navigator:NavController, @Inject(AppStore) store: Store<AppState>, events:Events, 
                private params:NavParams,  
                private infoService:InfoService, 
                private noticeService:NoticeService, 
                private translateService:TranslateService) {
        super(navigator, store, events);

        this.unsubscribeState = this.store.subscribe(() => this.handleCurrentInfoChange());
        this.setViewTitle(translateService);
    }

    ionViewWillUnload():void {
        super.ionViewWillUnload();
        this.stopListenStateChange();
    }

    ngOnInit():void {
        let info:Info = null;
        if (this.isEditInfo()) {
            info = getInfoById(this.store.getState(), this.params.get("id"));
        } else {
            info = this.infoService.buildEmptyInfo();
        }
        this.store.dispatch(setCurrentEditInfo(info));
    }

    stopListenStateChange():void {
        if (this.unsubscribeState !== null) {
            this.unsubscribeState();
            this.unsubscribeState = null;            
        }
    }

    private handleCurrentInfoChange():void {
        let saveInfoStatus = getSaveIntoToLocalStatus(this.store.getState());

        if (saveInfoStatus !== null) {
            this.store.dispatch(resetSaveIntoToLocalStatus());
            if (saveInfoStatus !== StatusCode.SAVE_INTO_TO_LOCAL_BEGIN) {
                if (saveInfoStatus === StatusCode.SAVE_INTO_TO_LOCAL_FAILED) {
                    this.noticeService.showNotice("notice.saveIntoToLocalFailed");
                } else {
                     this.noticeService.showNotice("notice.saveInfoToLocalSuccess");
                     if (this.isEditInfo()) {
                         this.store.dispatch(updateInfo(this.currentInfo));
                     } else {
                         this.store.dispatch(addInfo(this.currentInfo));
                     }
                }
                setTimeout(() => {
                    this.navigator.pop();
                }, 1200);
            }
            return;
        }
        this.currentInfo = getCurrentInfo(this.store.getState());
    }

    private isEditInfo():boolean {
        return this.params.get("action") !== "create";
    }

    private setViewTitle(translateService:TranslateService):void {
        let titleKey = this.isEditInfo() ? "editInfo" : "createInfo";
        translateService.get(titleKey).subscribe((title) => this.titleText = title);
    }

    private createNewDetailItem():void {
        this.navigator.push(InfoDetailEditView, {action: "create", infoId: this.currentInfo.id});
    }

    private editInfoDetailItem(detailItem: InfoDetail):void {
        this.navigator.push(InfoDetailEditView, {action: "edit", detailItem: detailItem});
    }

    private saveInfo():void {
        if (this.currentInfo.title.trim().length === 0) {
            this.noticeService.showNotice("notice.titleCantBeEmpty");
            return;
        }

        if (this.currentInfo.category.trim().length === 0) {
            this.noticeService.showNotice("notice.categoryCantBeEmpty");
            return;
        }

        let state = this.store.getState(),
            allInfos = getAllInfos(state),
            password = getCurrentUserPassword(state),
            infos = null;

        if (this.isEditInfo()) {
            infos = allInfos.map((item) => item.id === this.currentInfo.id ? this.currentInfo.clone() : item);
        } else {
            infos = allInfos.concat(this.currentInfo.clone());
        }

        this.store.dispatch(saveInfoToLocalBegin());
        this.infoService.saveInfoToLocal(infos, password, (error?:any) => {
            if (error) {
                this.store.dispatch(saveInfoToLocalFailed());
            } else {
                this.store.dispatch(saveInfoToLocalSuccess());
            }
        })
    }

}

export default InfoEditView;