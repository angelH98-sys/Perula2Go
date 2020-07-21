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
    const id: any = await this.http.post(this.URL_API, user).toPromise();

    const order: Order = new Order();
    order.customer = id._id;
    order.statusDate.borrador = new Date();

    await this.http.post(this.URL_API_ORDER, order).toPromise();
  }

  putAddress(id: String, address){
    this.http.put(`${this.URL_API}/address/${id}`, address).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  getUserById(id: String){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  checkUser(user: String){
    return this.http.get(`${this.URL_API}/checkuser/${user}`);
  }

  checkEmail(email: String){
    return this.http.get(`${this.URL_API}/checkemail/${email}`);
  }

  checkPhone(phone: String){
    return this.http.get(`${this.URL_API}/checkphone/${phone}`);
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
