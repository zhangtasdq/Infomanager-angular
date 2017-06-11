import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular"
import { TranslateService } from "@ngx-translate/core";


@Injectable()
class NoticeService {

    constructor(private toastCtl: ToastController, 
                private translateServie:TranslateService) {
    }

    showNotice(messageKey: string, duration:number = 1200):void {
        this.translateServie.get(messageKey).subscribe((message) => {
            this.toastCtl.create({message, duration, position: "top"}).present();
        });
    }

    showInfo(message: string) {
        this.toastCtl.create({message, duration: 2000, position: "top"}).present();
    }
}

export default NoticeService;