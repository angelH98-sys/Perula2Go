import { Component, OnInit } from '@angular/core';

import { MouseEvent } from '@agm/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Address } from 'src/app/utilities/address';
import { FormBuilder, Validators, FormControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { FormValidatorsService } from 'src/app/services/form.validators.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  hide3 = true;
  hide4 = true;

  personalInformation: any;
  securityInformation: any;
  additionalInformation: any;

  lat: number = 13.763992;
  lng: number = -89.049093;
  zoom: number = 18;

  departments = ["San Salvador", "Cuscatlán"];
  cities = [];

  latMarker = 13.763992;
  lngMarker = -89.049093;

  constructor( private userService: UserService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    public formValidators: FormValidatorsService) { }

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(){
    this.personalInformation = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-7]\d{3}-\d{4}$/)]],
      user: ['', Validators.required]
    });
    this.securityInformation = this.formBuilder.group({
      pass: ['', Validators.required],
      confirmPass: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    },
    {
      validators: this.formValidators.checkPasswords
    });
    this.additionalInformation = this.formBuilder.group({
      direction: ['', Validators.required],
      homeNumber: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      reference: ['', Validators.required]
    });
  }

  mapClicked($event: MouseEvent) {
    this.lngMarker = $event.coords.lng;
    this.latMarker = $event.coords.lat;
  }

  getCities(department){
    if(department == "San Salvador"){
      this.cities = ["San Martín"];
    }else{
      this.cities = ["San Bartolomé Perulapía", "San Pedro Perulapán"];
    }
  }

  addCustomer(){
    if(this.personalInformation.invalid || this.securityInformation.invalid || this.additionalInformation.invalid) return;
    
    let user: User = new User("Customer");

    user.name = this.personalInformation.get('name').value;
    user.user = this.personalInformation.get('user').value;
    user.email = this.personalInformation.get('email').value;
    user.phone = this.personalInformation.get('phone').value;

    user.password = this.securityInformation.get('pass').value;
    user.question = this.securityInformation.get('question').value;
    user.answer = this.securityInformation.get('answer').value;

    let address: Address = new Address();

    address.latitude = this.latMarker;
    address.longitude = this.lngMarker;
    address.direction = this.additionalInformation.get('direction').value;
    address.homeNumber = this.additionalInformation.get('homeNumber').value;
    address.department = this.additionalInformation.get('department').value;
    address.city = this.additionalInformation.get('city').value;
    address.reference = this.additionalInformation.get('reference').value;

    user.address.push(address);

    this.userService.postUser(user);
    
  }

}