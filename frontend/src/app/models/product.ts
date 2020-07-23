export class PromotionInformation{
    constructor(){
        this.isPermanent = null;
        this.start = null;
        this.end = null;
    }
    isPermanent: Boolean;
    start: Date;
    end: Date;
}

export class Product {

    constructor(){
        this._id = "";
        this.name = "";
        this.description = "";
        this.price = 0;
        this.business = "";
        this.picture = "";
        this.category = "";
        this.promotionData = new PromotionInformation();
        this.status = "Disponible";
        this.productionTime = 0;
    }

    _id: String;
    name: String;
    description: String;
    price: Number;
    business: String;
    picture: String;
    category: String;
    promotionData: PromotionInformation;
    status: String;
    productionTime: Number;
}
