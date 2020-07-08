import { Address } from '../utilities/address';

export class Employee {
    constructor(){
        this.vehicle = "";
        this.dui = "";
        this.driverLicense = "";
        this.status = "";
        this.qualification = 0;
    }

    vehicle: String;
    dui: String;
    driverLicense: String;
    status: String;
    qualification: Number;
}

export class User {

    constructor(userType: String){

        this._id = '';
        this.name = '';
        this.user = '';
        this.password = '';
        this.email = '';
        this.question = '';
        this.answer = '';
        this.picture = '';
        this.status = 'Active';
        this.userType = userType;
        this.phone = '';

        switch(userType){
            case "Customer":{
                this.address = [];
                break;
            }
            case "Employee":{
                this.employee = new Employee();
                break;
            }
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
    address: Address[];
    employee: Employee;
}
