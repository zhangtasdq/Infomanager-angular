import { NavController, Events } from "ionic-angular";
import { Store } from "redux";

import { AppState } from "../reducers/index";
import { resetAppState } from "../actions/app.action";

import LoginView from "./login/login.view";

abstract class LockerView {
    static APP_PAUSE_EVENT = "App.Event.Pause";
    navigator:NavController;
    store:Store<AppState>;
    events:Events;
    private viewPauseListener:() => void;
    private appPauseEventListener: () => void;

    constructor(navigator, store, events) {
        this.navigator = navigator;
        this.store = store;
        this.events = events;

        this.viewPauseListener = this.handleViewPause.bind(this);
        this.appPauseEventListener = this.handleAppPauseEvent.bind(this);
        this.events.subscribe(LockerView.APP_PAUSE_EVENT, this.appPauseEventListener);
    }

    ionViewWillEnter():void {
        document.addEventListener("pause", this.viewPauseListener);
    }

    ionViewWillLeave():void {
        document.removeEventListener("pause", this.viewPauseListener);
    }

    ionViewWillUnload():void {
        this.events.unsubscribe(LockerView.APP_PAUSE_EVENT, this.appPauseEventListener);
    }

    private handleViewPause():void {
        this.events.publish(LockerView.APP_PAUSE_EVENT);
        this.navigator.setRoot(LoginView);
    }

    private handleAppPauseEvent():void {
        this.stopListenStateChange();
    }

    abstract stopListenStateChange():void;
}

export default LockerView;