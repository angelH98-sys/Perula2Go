export class Business {
    constructor(){
        this._id = '';
        this.name = '';
        this.description = '';
        this.phone = '';
        this.type = '';
        this.address = {'latitude':0,'longitude':0};
        this.schedule = {
            'monday':{'start':'','end':''},'tuesday':{'start':'','end':''},
            'wednesday':{'start':'','end':''},'thursday':{'start':'','end':''},
            'friday':{'start':'','end':''},'saturday':{'start':'','end':''},
            'sunday':{'start':'','end':''}
        };
        this.picture = {'cover':'','logo':''};
        this.user = [{'user':'','role':''}];
    }

    _id: String;
    name: String;
    description: String;
    phone: String;
    type: String;
    address: {
        'latitude': Number,
        'longitude': Number
    };
    schedule:{
        'monday': {
            'start': String,
            'end': String
        },
        'tuesday':{
            'start': String,
            'end': String
        },
        'wednesday': {
            'start': String,
            'end': String
        },
        'thursday': {
            'start': String,
            'end': String
        },
        'friday': {
            'start': String,
            'end': String
        },
        'saturday':{
            'start': String,
            'end': String
        },
        'sunday': {
            'start': String,
            'end': String
        }
    };
    picture: {
        'cover': String,
        'logo': String
    };
    user: [{
        'user': String,
        'role': String
    }];
}
