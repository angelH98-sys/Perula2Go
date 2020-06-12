import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/business';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  readonly URL_API = 'http://localhost:3000/business';
  readonly URL_GET = 'http://localhost:3000/business/catalog';
  readonly URL_API_COVER = 'http://localhost:3000/business/file/cover';
  readonly URL_API_LOGO = 'http://localhost:3000/business/file/logo';


  businesses: Business[];
  selectedBusiness: Business;

  constructor( private http: HttpClient ) { 
    this.selectedBusiness = new Business();
  }

  getBusiness(){
    return this.http.get(this.URL_GET);
  }

  postBusiness(business: Business){
    this.http.post(this.URL_API, business).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  uploadImage (image: FormData, type: String){
    if(type == "cover"){
      return this.http.post(this.URL_API_COVER, image)
    }else{
      return this.http.post(this.URL_API_LOGO, image);
    }
  }
}
