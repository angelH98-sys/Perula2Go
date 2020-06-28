export class Order {

    constructor(){
        this._id = "";
        this.status = "Borrador";
        this.comment = "";
        this.totalAmount = 0;
        this.wait = 0;
        this.customer = "";
        this.employee = "";
        this.qualification = 0;
        this.orderDate = new Date();
        this.address = {
            'latitude': 0,
            'longitude': 0,
            'reference': ''
        };
        this.productDetail = [{
            'product': '',
            'extra': [{
                'name': '',
                'price': 0
            }]
        }]
    }

    _id: String;
    status: String;
    comment: String;
    totalAmount: Number;
    wait: Number;
    customer: String;
    employee: String;
    qualification: Number;
    orderDate: Date;
    address: {
        'latitude': Number,
        'longitude': Number,
        'reference': String
    };
    productDetail: [{
        'product': String,
        'extra': [{
            'name': String,
            'price': Number
        }]
    }]
}
