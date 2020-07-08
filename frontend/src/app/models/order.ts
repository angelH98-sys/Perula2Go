import { Address } from '../utilities/address';

class orderDates {
    constructor(){
        this.borrador = null;
        this.enCola = null;
        this.enProceso = null;
        this.lista = null;
        this.enCamino = null;
        this.entregada = null;
    }
    borrador: Date;
    enCola: Date;
    enProceso: Date;
    lista: Date;
    enCamino: Date;
    entregada: Date;
}

export class optionInOrder{
    constructor(){
        this.optionId = "";
        this.name = "";
        this.price = 0;
    }
    optionId: String;
    name: String;
    price: Number;
}

export class extraInOrder {
    constructor(){
        this.extraId = "";
        this.extraName = "";
        this.option = [];
    }
    extraId: String;
    extraName: String;
    option: optionInOrder[];
}

export class productInOrder {
    constructor(){
        this.product = "";
        this.price = 0;
        this.quantity = 0;
        this.extra = [];
        this.total = 0;
    }
    product: String;
    price: Number;
    quantity: Number;
    extra: extraInOrder[];
    total: Number
}

export class Order {

    constructor(){
        this._id = "";
        this.status = "Borrador";
        this.comment = "";
        this.totalAmount = 0;
        this.wait = 0;
        this.customer = "";
        this.employee = "";
        this.business = "";
        this.qualification = 0;
        this.statusDate = new orderDates();
        this.address = new Address();
        this.productDetail = [];
    }

    _id: String;
    status: String;
    comment: String;
    totalAmount: Number;
    wait: Number;
    customer: String;
    employee: String;
    business: String;
    qualification: Number;
    statusDate: orderDates;
    address: Address;
    productDetail: productInOrder[];
}
