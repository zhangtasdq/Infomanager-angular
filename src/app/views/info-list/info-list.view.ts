import { Component, Inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "redux";
import { NavController, AlertController, Events, LoadingController, Loading } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

import { StatusCode } from "../../configs/status-code.config";
import { AppStore } from "../../app.store";
import { AppState } from "../../reducers/index";
import { getCurrentUserPassword } from "../../reducers/user.reducer";
import { getInfoByCategory, getAllCategories } from "../../reducers/info.reducer";
import { getActiveCategory, getBackupStatus, getRestoreStatus } from "../../reducers/info-list-view.reducer";
import { 
    loadLocalInfoBegin, 
    loadLocalInfoSuccess, 
    loadLocalInfoFailed, 
    setActiveCategory,
    restoreInfoBegin,
    restoreInfoSuccess,
    restoreInfoFailed,
    resetRestoreInfoStatus,
    backupInfoBegin,
    backupInfoSuccess,
    backupInfoFailed,
    resetBackupInfoStatus
} from "../../actions/info-list-view.action";
import { setCurrentInfos } from "../../actions/info.action";
import Info from "../../models/info.model";

import InfoService from "../../services/info.service";
import NoticeService from "../../services/notice.service";

import LockerView from "../locker.view";
import InfoEditView from "../info-edit/info-edit.view";
import InfoShowView from "../info-show/info-show.view";

@Component({
    templateUrl: "info-list.template.html",
    styles: ["info-list.style.scss"]
})
class InfoListView extends LockerView implements OnInit {
    private activeCategory:string;
    private categories:string[];
    private infos:Info[];
    private unsubscribeState;

    constructor(navigator: NavController, @Inject(AppStore) store:Store<AppState>, events: Events,
                private noticeService:NoticeService,
                private infoService: InfoService, 
                private changeDetectorRef: ChangeDetectorRef, 
                private alertController:AlertController,
                private translateService:TranslateService,  
                private loadingCtrl:LoadingController) {

        super(navigator, store, events);
        this.activeCategory = "";
        this.categories = [];
        this.infos = [];
        this.unsubscribeState = this.store.subscribe(() => {this.handleInfoListChange()});
    }

    ionViewWillUnload():void {
        super.ionViewWillUnload();
        this.stopListenStateChange();
    }

    ngOnInit():void {
        this.loadLocalInfo();
    }

    stopListenStateChange():void {
        if (this.unsubscribeState !== null) {
            this.unsubscribeState();
            this.unsubscribeState = null;            
        }
    }

    private createNewInfo():void {
        this.navigator.push(InfoEditView, {action: "create"});
    }

    private loadLocalInfo():void {
        this.store.dispatch(loadLocalInfoBegin());
        let password:string = getCurrentUserPassword(this.store.getState());
        this.infoService.loadLocalInfo(password, (error?:any, statusCode?: StatusCode, data?:any) => this.handleLoadLocalInfoResult(error, statusCode, data));
    }

    private handleLoadLocalInfoResult(error?:any, statusCode?:StatusCode, data?:Info[]):void {
        if (error) {
            this.store.dispatch(loadLocalInfoFailed());
        } else {
            this.store.dispatch(loadLocalInfoSuccess());
            this.store.dispatch(setCurrentInfos(data));
            if (data.length > 0) {
                console.log("first category" + data[0].category);
                this.store.dispatch(setActiveCategory(data[0].category));
            }
        }
    }

    private handleInfoListChange():void {
        let state = this.store.getState(),
            backupStatus = getBackupStatus(state);

        if (backupStatus !== null) {
            if (backupStatus !== StatusCode.BACKUP_INFO_BEGIN) {
                if (backupStatus === StatusCode.BACKUP_INFO_FAILED) {
                    this.noticeService.showNotice("notice.backupInfoFailed");
                } else {
                    this.noticeService.showNotice("notice.backupInfoSuccess");
                }
                this.store.dispatch(resetBackupInfoStatus());
            }
            return;
        }
        let restoreStatus = getRestoreStatus(state);
        
        if (restoreStatus !== null) {
            if (restoreStatus !== StatusCode.RESTORE_INFO_BEGIN) {
                this.store.dispatch(resetRestoreInfoStatus());
                if (restoreStatus === StatusCode.RESTORE_INFO_FAILED) {
                    this.noticeService.showNotice("notice.restoreInfoFailed");
                } else {
                    this.noticeService.showNotice("notice.restoreInfoSuccess");                  
                    this.loadLocalInfo();                    
                }
            }
            return;
        }

        this.categories = getAllCategories(state);
        this.activeCategory = getActiveCategory(state);
        this.infos = getInfoByCategory(this.store.getState(), this.activeCategory);

        if (this.infos.length === 0 && this.categories.length > 0) {
            this.store.dispatch(setActiveCategory(this.categories[0]));
        }
    }

    private changeInfosByCategory(category):void {
        this.store.dispatch(setActiveCategory(category));
        this.changeDetectorRef.detectChanges();
    }

    private showInfo(id:number):void {
        this.navigator.push(InfoShowView, {infoId: id});
    }

    private tryRestoreInfo():void {
        this.translateService.get(["dialog.restore.title", "dialog.restore.content",  "restore", "cancel"]).subscribe((data) => {
            let dialog = this.alertController.create({
                title: data["dialog.restore.title"],
                message: data["dialog.restore.content"],
                buttons: [{
                    text: data["restore"],
                    handler: () => {
                        this.restoreInfo();
                    }
                }, {
                    text: data["cancel"]
                }]
            });
            dialog.present();
        });
    }

    private restoreInfo():void {
        this.translateService.get("loading.restore").subscribe((loadingMsg) => {
            let loading = this.createLoading(loadingMsg);
            
            loading.present();

            this.store.dispatch(restoreInfoBegin());
            
            this.infoService.restoreInfos((error?:any) => {
                loading.dismiss();
                if (error) {
                    this.store.dispatch(restoreInfoFailed());
                } else {
                    this.store.dispatch(restoreInfoSuccess());
                }
            });
        });
    }

    private tryBackupInfo():void {
        this.translateService.get(["dialog.backup.title", "dialog.backup.content",  "backup", "cancel"]).subscribe((data) => {
            let dialog = this.alertController.create({
                title: data["dialog.backup.title"],
                message: data["dialog.backup.content"],
                buttons: [{
                    text: data["backup"],
                    handler: () => {
                        this.backupInfo();
                    }
                }, {
                    text: data["cancel"]
                }]
            });
            dialog.present();
        });
    }

    private backupInfo():void {
        this.translateService.get("loading.backup").subscribe((loadingMsg) => {
            let loading = this.createLoading(loadingMsg);
            
            loading.present();

            this.store.dispatch(backupInfoBegin());
            
            this.infoService.backupInfos((error?:any) => {
                loading.dismiss();
                if (error) {
                    this.store.dispatch(backupInfoFailed());
                } else {
                    this.store.dispatch(backupInfoSuccess());
                }
            });
        });
    }

    private createLoading(msg:string):Loading {
        return this.loadingCtrl.create({content: msg});
    }
}

export default InfoListView;