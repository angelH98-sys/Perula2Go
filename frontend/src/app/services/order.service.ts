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

  getEraserOrder(userId: String){
    return this.http.get(`${this.URL_API}/${userId}`);
  }

  getOrderByBusiness(business: String){
    return this.http.get(`${this.URL_API}/business/${business}`);
  }

  addProductToOrder(_id, totalAmount, wait, productDetail){
    this.http.put(`${this.URL_API}/${_id}`, {totalAmount, wait, productDetail}).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  assignBusiness(_id, business){
    this.http.put(`${this.URL_API}/assignbusiness/${_id}`, {business}).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  confirmOrder(id, address, date){
    this.http.put(`${this.URL_API}/confirm/${id}`, {status: "En cola", address: address, orderDate: date}).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  changeStatus(id, statusName){
    this.http.put(`${this.URL_API}/changestatus/${id}`, {status: statusName}).subscribe((res: any) => {
      console.log(res.status);
    });
  }

}
