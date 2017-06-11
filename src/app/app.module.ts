import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { HttpModule, Http } from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from "@ionic-native/file";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { Store, createStore} from "redux";

import { createTranslateLoader } from "./loader/i18n.loader";
import { APP_CONFIG, AppConfigValue } from "./configs/app.config";
import { AppStore } from "./app.store";
import { AppState, rootReducer } from "./reducers/index";

import OneDriveService from "./services/onedrive.service";
import NoticeService from "./services/notice.service";
import PasswordService from "./services/password.service";
import FileService from "./services/file.service";
import AesService from "./services/aes.service";
import UserService from "./services/user.service";
import InfoService from "./services/info.service";

import { MyApp } from './app.component';
import LoginView from "./views/login/login.view";
import InfoListView from "./views/info-list/info-list.view";
import InfoEditView from "./views/info-edit/info-edit.view";
import InfoShowView from "./views/info-show/info-show.view";
import InfoDetailEditView from "./views/info-detail-edit/info-detail-edit.view";

let store:Store<AppState> = createStore<AppState>(rootReducer);

@NgModule({
  declarations: [
    MyApp,
    LoginView,
    InfoListView,
    InfoShowView,
    InfoEditView,
    InfoDetailEditView
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginView,
    InfoListView,
    InfoShowView,
    InfoEditView,
    InfoDetailEditView
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    NoticeService,
    PasswordService,
    AesService,
    FileService,
    OneDriveService,
    UserService,
    InfoService,
    {provide: APP_CONFIG, useValue: AppConfigValue},
    {provide: AppStore, useFactory: () => store},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
