import { Component, OnInit, Inject } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { Store } from "redux";
import { TranslateService } from "@ngx-translate/core";

import { AppState } from "../../reducers/index";
import { AppStore } from "../../app.store";
import { addInfoDetail, updateInfoDetailItem, deleteInfoDetailItem } from "../../actions/info-edit-view.action";
import { setCurrentEditInfoDetail } from "../../actions/info-detail-edit-view.action";
import { getCurrentInfoDetail } from "../../reducers/info-detail-edit-view.reducer";

import InfoDetail from "../../models/info-detail.model";
import InfoService from "../../services/info.service";
import NoticeService from "../../services/notice.service";

import LockerView from "../locker.view";

@Component({
    templateUrl: "info-detail-edit.template.html",
    styles: ["info-detail-edit.style.scss"]
})
class InfoDetailEditView extends LockerView implements OnInit {
    private currentInfoDetail:InfoDetail;
    private titleText:string;
    private unsubscribeState;

    constructor(navigator:NavController,  @Inject(AppStore) store: Store<AppState>, events:Events, 
                private params:NavParams,
                private infoService:InfoService, 
                private noticeService:NoticeService, 
                private translateService:TranslateService) {
        super(navigator, store, events);

        this.unsubscribeState = this.store.subscribe(() => this.handleCurrentInfoDetailChange());
        this.setViewTitle(translateService);
    }

    ionViewWillUnload():void {
        super.ionViewWillUnload();
        this.stopListenStateChange();
    }

    ngOnInit():void {
        let infoDetail:InfoDetail = null;
        if (this.isEditInfoDetail()) {
            infoDetail = this.params.get("detailItem");
        } else {
            infoDetail = this.infoService.buildEmptyInfoDetail();
        }
        this.store.dispatch(setCurrentEditInfoDetail(infoDetail));
    }

    stopListenStateChange():void {
        if (this.unsubscribeState !== null) {
            this.unsubscribeState();
            this.unsubscribeState = null;            
        }
    }

    private handleCurrentInfoDetailChange():void {
        let currentItem = getCurrentInfoDetail(this.store.getState());
        if (currentItem) {
            this.currentInfoDetail = currentItem;            
        }
    }

    private isEditInfoDetail():boolean {
        return this.params.get("action") !== "create";
    }

    private setViewTitle(translateService:TranslateService):void {
        let titleKey = this.isEditInfoDetail() ? "editInfoDetail" : "createInfoDetail";
        translateService.get(titleKey).subscribe((title) => this.titleText = title);
    }

    private saveDetailItem():void {
        if (this.currentInfoDetail.name.trim().length === 0) {
            this.noticeService.showNotice("notice.propertyNameCantBeEmpty");
            return;
        }

        if (this.currentInfoDetail.content.trim().length === 0) {
            this.noticeService.showNotice("notice.propertyValueCantBeEmpty");
            return;
        }
        if (this.isEditInfoDetail()) {
            this.store.dispatch(updateInfoDetailItem(this.currentInfoDetail));
        } else {
             this.store.dispatch(addInfoDetail(this.currentInfoDetail));
        }
       
        this.navigator.pop();
    }

    private deleteDetailItem():void {
        this.store.dispatch(deleteInfoDetailItem(this.currentInfoDetail.id));
        this.navigator.pop();
    }

}

export default InfoDetailEditView;