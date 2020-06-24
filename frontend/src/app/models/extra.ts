export class Extra {

    constructor(){
        this._id = "";
        this.name = "";
        this.option = [{
            "name": "",
            "price": 0,
            "status": "Disponible"
        }];
        this.product = "";
        this.multiple = false;
    }

    _id: String;
    name: String;
    price: Number;
    status: String;
    option: [{
        "name": String,
        "price": Number,
        "status": String
    }];
    product: String;
    multiple: boolean;
}
