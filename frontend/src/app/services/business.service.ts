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
  readonly URL_GET_BY_ID = 'http://localhost:3000/business/';
  readonly URL_IMAGE = 'http://localhost:3000/fileUpload/business';

  businesses: Business[];
  selectedBusiness: Business;

  constructor( private http: HttpClient ) { 
    this.selectedBusiness = new Business();
  }

  getBusiness(){
    return this.http.get(this.URL_GET);
  }

  getBusinessById(id: String){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  checkBusinessById(id: String){
    return this.http.get(`${this.URL_API}/checkbusiness/${id}`);
  }

  async postBusiness(business: Business){
    await this.http.post(this.URL_API, business).toPromise();
  }

  checkPhone(phone: String){
    return this.http.get(`${this.URL_API}/checkphone/${phone}`);
  }

  checkName(name: String){
    return this.http.get(`${this.URL_API}/checkname/${name}`);
  }

  uploadImage (image: FormData){
      return this.http.post(this.URL_IMAGE, image);
  }
}
