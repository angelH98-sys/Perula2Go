export class User {

    constructor(){
        this._id = '';
        this.name = '';
        this.user = '';
        this.password = '';
        this.email = '';
        this.question = '';
        this.answer = '';
        this.picture = '';
        this.status = '';
        this.userType = '';
        this.phone = '';
        this.address = [{
            'latitude': 0,
            'longitude': 0,
            'direction': '',
            'homeNumber': '',
            'department': '',
            'city': '',
            'reference': ''
        }];
        this.employee = {
            'vehicle': '',
            'dui': '',
            'driverLicense': '',
            'status': '',
            'qualification': 0
        }
    }

    _id: String;
    name: String;
    user: String;
    password: String;
    email: String;
    question: String;
    answer: String;
    picture: String;
    status: String;
    userType: String;
    phone: String;
    address: [{
        'latitude': Number,
        'longitude': Number,
        'direction': String,
        'homeNumber': String,
        'department': String,
        'city': String,
        'reference': String
    }];
    employee: {
        'vehicle': String,
        'dui': String,
        'driverLicense': String,
        'status': String,
        'qualification': Number
    }
}
