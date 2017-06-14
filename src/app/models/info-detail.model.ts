class InfoDetail {
    id:number;
    name: string;
    content: string;

    constructor(name:string, content:string) {
        this.id = (new Date()).getTime();
        this.name = name;
        this.content = content;
    }

    clone():InfoDetail {
        let cloneItem = new InfoDetail(this.name, this.content);
        cloneItem.id = this.id;

        return cloneItem;
    }
}

export default InfoDetail;