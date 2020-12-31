import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = 'http://localhost:3000/user';
  readonly URL_API_ORDER = 'http://localhost:3000/order';
  readonly URL_IMAGE = 'http://localhost:3000/fileUpload/user';

  constructor( private http: HttpClient) { }

  async postUser(user: User){

    let customer: any = await this.http.post(this.URL_API, user).toPromise();

    if(customer._id){
      //Solo para desarrollo de registro de clientes
      return true;
    }else{
      return false;
    }

    //const order: Order = new Order(customer._id);

    //await this.http.post(this.URL_API_ORDER, order).toPromise();
  }

  putAddress(id: String, address){
    this.http.put(`${this.URL_API}/address/${id}`, address).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  getUserById(id: String){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  async checkUser(user: String){
    
    let response: any;
    response = await this.http.get(`${this.URL_API}/checkuser/${user}`).toPromise();

    return response.docs;
  }

  async checkEmail(email: String){

    let response: any;
    response = await this.http.get(`${this.URL_API}/checkemail/${email}`).toPromise();

    return response.docs;
  }

  async checkPhone(phone: String){

    let response: any;
    response = await this.http.get(`${this.URL_API}/checkphone/${phone}`).toPromise();

    return response.docs;
  }

  checkUserById(id: String){
    return this.http.get(`${this.URL_API}/checkuserbyid/${id}`);
  }


  getUserAddress(id: String){
    return this.http.get(`${this.URL_API}/address/${id}`);
  }

  uploadImage (image: FormData){
      return this.http.post(this.URL_IMAGE, image);
  }

}
