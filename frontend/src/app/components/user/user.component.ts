import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MouseEvent } from '@agm/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();

  lat: number = 13.763992;
  lng: number = -89.049093;
  zoom: number = 18;

  departments = ["San Salvador", "Cuscatlán"];
  cities = [];

  latMarker;
  lngMarker;
  reference;

  password;
  comprobationPassword;
  picture;

  constructor( private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit(): void {
  }

  mapClicked($event: MouseEvent) {
    this.lngMarker = $event.coords.lng;
    this.latMarker = $event.coords.lat;
    this.user.address[0].longitude = this.lngMarker;
    this.user.address[0].latitude = this.latMarker;
  }

  getPictureInfo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.picture = file;
    }
  }

  getCities(department){
    if(department == "San Salvador"){
      this.cities = ["San Martín"];
    }else{
      this.cities = ["San Bartolomé Perulapía", "San Pedro Perulapán"];
    }
  }

  addUser(){
    this.user.password = this.password;
    this.user.userType = "Customer";
    this.user.status = "Active";

    const image = new FormData();
    image.append('image', this.picture);

    interface format {
      image: String;
    }
    new Promise(resolve => {
      this.userService.uploadImage(image).subscribe((res: format) => {
        this.user.picture = res.image;
        resolve();
      });
    }).then(() => {
      this.userService.postUser(this.user);
    });
  }

}
