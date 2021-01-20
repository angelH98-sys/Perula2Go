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

  constructor( private http: HttpClient ) {
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

  async postBusiness(business: Business, logo: FormData, cover: FormData){
    /**
     * Post de un nuevo negocio a la base de datos.
     * Además de subir imagenes a servidor.
     */
    try{

      let logoName: any = await this.uploadImage(logo);
      business.picture.logo = logoName.image;

      let coverName: any = await this.uploadImage(cover);
      business.picture.cover = coverName.image;
  
      return await this.http.post(this.URL_API, business).toPromise();

    }catch(exc){

      return false;
    }
  }

  async checkPhone(phone: String){

    let response: any;
    response = await this.http.get(`${this.URL_API}/checkphone/${phone}`).toPromise(); 
    return response.docs;
  }

  async checkName(name: String){
    
    let response: any;
    response = await this.http.get(`${this.URL_API}/checkname/${name}`).toPromise();
    return response.docs;
  }

  uploadImage (image: FormData){
    if(image != undefined){

      return this.http.post(this.URL_IMAGE, image).toPromise();
    }else{
      
      return false;
    }
  }
}
