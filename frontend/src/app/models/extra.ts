export class Option {
    constructor(){
        this.name = "";
        this.price = 0;
        this.status = "";
        this.selected = false;
    }
    name: String;
    price: Number;
    status: String;
    selected: Boolean;
}

export class Extra {

    constructor(){
        this._id = "";
        this.name = "";
        this.option = [];
        this.product = "";
        this.multiple = false;
    }

    _id: String;
    name: String;
    status: String;
    option: Option[];
    product: String;
    multiple: boolean;
}
