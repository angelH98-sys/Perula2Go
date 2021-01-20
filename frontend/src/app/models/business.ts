import { FormGroup } from '@angular/forms';
import { Address } from '../utilities/address';

export class Business {

    constructor(form?: FormGroup, schedule?: any){
        let values = form.value;
        this.name = values.name;
        this.description = values.description;
        this.phone = values.phone;
        this.type = values.type;
        this.address = undefined;
        this.status = "Pendiente";
        this.schedule = schedule;
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
    schedule: {'isOpen': boolean, 'start': Date, 'end': Date}[];
    status: String;
    picture: {
        'cover': String,
        'logo': String
    };
    user: {'userId': String, 'role': String}[];
}
