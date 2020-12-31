import { Address } from '../utilities/address';

class orderDates {
    constructor(){
        this.borrador = new Date();
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
        this.name = "";
        this.price = 0;
    }
    name: String;
    price: Number;
}

export class extraInOrder {
    constructor(){
        this.name = "";
        this.option = [];
    }
    name: String;
    option: optionInOrder[];
}

export class productInOrder {
    constructor(){
        this.businessId = "";
        this.productId = "";
        this.price = 0;
        this.quantity = 0;
        this.extra = [];
        this.total = 0;
        this.status = "enCola";
        this.statusDate = {
            'enCola': new Date(),
            'enProceso': null,
            'listo': null
        }
    }
    businessId: String;
    productId: String;
    price: Number;
    quantity: Number;
    extra: extraInOrder[];
    total: Number;
    status: String;
    statusDate: {
        'enCola': Date,
        'enProceso': Date,
        'listo': Date,
    }
}

export class Order {

    constructor(customer = ""){
        this._id = "";
        this.status = "Draft";
        this.comment = "";
        this.totalAmount = 0;
        this.wait = 0;
        this.customer = customer;
        this.employee = "";
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
    qualification: Number;
    statusDate: orderDates;
    address: Address;
    productDetail: productInOrder[];
}
