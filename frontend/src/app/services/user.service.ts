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

  postUser(user: User){
    this.http.post(this.URL_API, user).subscribe((res: any) => {
      let order = new Order();
      order.customer = res._id;
      this.http.post(this.URL_API_ORDER, order).subscribe((res: any) => {
        console.log(res.status);
      });
    });
  }

  putAddress(id: String, address){
    this.http.put(`${this.URL_API}/address/${id}`, address).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  getUserById(id: String){
    return this.http.get(`${this.URL_API}/${id}`);
  }

  getUserAddress(id: String){
    return this.http.get(`${this.URL_API}/address/${id}`);
  }

  uploadImage (image: FormData){
      return this.http.post(this.URL_IMAGE, image);
  }

}
