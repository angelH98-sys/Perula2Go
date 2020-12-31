import { Form, FormGroup } from "@angular/forms";

export class User {

    constructor(form: FormGroup){

        this.name = form.get('name').value;
        this.user = form.get('user').value;
        this.password = form.get('pass').value;
        this.email = form.get('email').value;
        this.phone = form.get('phone').value;
        this.status = 'Active';
        this.userType = 'Customer';
    }

    _id: String;

    name: String;
    email: String;
    phone: String;
    user: String;

    password: String;
    
    status: String;
    userType: String;
}
