import { Address } from '../utilities/address';

export class Schedule {

    constructor(){
        this.monday = {'start':'','end':''};
        this.tuesday = {'start':'','end':''};
        this.wednesday = {'start':'','end':''};
        this.thursday = {'start':'','end':''};
        this.friday = {'start':'','end':''};
        this.saturday = {'start':'','end':''};
        this.sunday = {'start':'','end':''};
    }

    monday: {
        'start': String,
        'end': String
    };
    tuesday:{
        'start': String,
        'end': String
    };
    wednesday: {
        'start': String,
        'end': String
    };
    thursday: {
        'start': String,
        'end': String
    };
    friday: {
        'start': String,
        'end': String
    };
    saturday:{
        'start': String,
        'end': String
    };
    sunday: {
        'start': String,
        'end': String
    }
}

export class Business {
    constructor(){
        this._id = '';
        this.name = '';
        this.description = '';
        this.phone = '';
        this.type = '';
        this.address = new Address();
        this.schedule = new Schedule;
        this.status = "Pendiente";
        this.picture = {
            'cover': '',
            'logo': ''
        };
        this.user = [];
    }

    _id: String;
    name: String;
    description: String;
    phone: String;
    type: String;
    address: Address;
    schedule: Schedule;
    status: String;
    picture: {
        'cover': String,
        'logo': String
    };
    user: {'userId': String, 'role': String}[];
}
