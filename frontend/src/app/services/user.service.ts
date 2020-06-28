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
      console.log(res.status);
      this.http.get(this.URL_API + "/" + user.email).subscribe(res => {
        let aux = res as User;
        let order = new Order;
        order.customer = aux._id;
        this.http.post(this.URL_API_ORDER,order).subscribe((res: any) => {
          console.log(res.status);
        });
      })
    });
  }

  getUserByEmail(email: String){
    return ;
  }

  uploadImage (image: FormData){
      return this.http.post(this.URL_IMAGE, image);
  }

}
