import { Component, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from "@ngx-translate/core";

import { APP_CONFIG, AppConfig } from "./configs/app.config";

import LoginView from "./views/login/login.view";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginView;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
             translateService:TranslateService, @Inject(APP_CONFIG) appConfig: AppConfig) {

    translateService.setDefaultLang(appConfig.language);
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

