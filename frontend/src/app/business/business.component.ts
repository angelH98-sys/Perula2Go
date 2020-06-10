import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MouseEvent } from '@agm/core';


import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
  providers: [BusinessService]
})
export class BusinessComponent implements OnInit {

  business: Business = new Business();

  scheduleType: String = "general";

  lat: number = 13.763992;
  lng: number = -89.049093;
  zoom: number = 18;

  general = {'start': '', 'end': ''};

  cover;
  logo;

  constructor( public businessService: BusinessService ) { 
  }

  ngOnInit(): void {
  }

  mapClicked($event: MouseEvent) {
    this.business.address.longitude = $event.coords.lng;
    this.business.address.latitude = $event.coords.lat;
  }

  getCoverInfo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cover = file;
    }
  }

  getLogoInfo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.logo = file;
    }
  }

  addBusiness() {

    if(this.scheduleType == "general"){

      this.business.schedule.monday = this.general;
      this.business.schedule.tuesday = this.general;
      this.business.schedule.wednesday = this.general;
      this.business.schedule.thursday = this.general;
      this.business.schedule.friday = this.general;
      this.business.schedule.saturday = this.general;
      this.business.schedule.sunday = this.general;

    }

    const cover = new FormData();
    cover.append('cover', this.cover);

    const logo = new FormData();
    logo.append('logo', this.logo);

    interface format {
      image: String;
    }

    new Promise(resolve => {
      this.businessService.uploadImage(cover, "cover").subscribe((res: format) => {
        this.business.picture.cover = res.image;
        resolve(new Promise(resolve2 => {
          this.businessService.uploadImage(logo, "logo").subscribe((res: format) => {
            this.business.picture.logo = res.image;
            resolve2();
          });
        }));
      });
    }).then(() => {
      this.businessService.postBusiness(this.business);
    });
  }

}
