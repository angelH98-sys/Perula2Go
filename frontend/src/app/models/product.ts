export class Product {

    constructor(){
        this._id = "";
        this.name = "";
        this.description = "";
        this.price = 0;
        this.business = "";
        this.picture = "";
        this.category = [];
        this.status = "";
        this.productionTime = "";
        this.combo = []
        this.size = [{'name':'','price':0}];
    }

    _id: String;
    name: String;
    description: String;
    price: Number;
    business: String;
    picture: String;
    category: [];
    status: String;
    productionTime: String;
    combo: [];
    size: [{
        'name': String,
        'price': Number
    }]
}
