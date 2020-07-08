export class Option {
    constructor(){
        this._id = "";
        this.name = "";
        this.price = 0;
        this.status = "";
    }
    _id: String;
    name: String;
    price: Number;
    status: String;
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
    price: Number;
    status: String;
    option: Option[];
    product: String;
    multiple: boolean;
}
