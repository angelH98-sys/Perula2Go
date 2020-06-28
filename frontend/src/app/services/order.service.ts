import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly URL_API = "http://localhost:3000/order";

  constructor(private http: HttpClient) { }

  postOrder(order: Order){
    this.http.post(this.URL_API, order).subscribe((res: any) => {
      console.log(res.status);
    });
  }

}
