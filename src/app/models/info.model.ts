import InfoDetail from "./info-detail.model";

class Info {
    id: number;
    title: string;
    category: string;
    details: InfoDetail[];

    constructor(title:string, category:string, details:InfoDetail[]) {
        this.id = (new Date()).getTime();
        this.title = title;
        this.category = category;
        this.details = details;
    }

    clone():Info {
        let details = [];
        if (this.details) {
            details = this.details.map((detail) => detail.clone());
        }

        let cloneItem =  new Info(this.title, this.category, details);
        cloneItem.id = this.id;
        
        return cloneItem;
    }

    setDetails(details:InfoDetail[]):void {
        this.details = details;
    }
}

export default Info;