import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly URL_API = "http://localhost:3000/order";

  constructor(private http: HttpClient) { }

  async postOrder(order: Order){
    await this.http.post(this.URL_API, order).toPromise();
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

  async confirmOrder(order: Order){
    await this.http.put(`${this.URL_API}/confirm/${order._id}`,{
      order: order
    }).toPromise();
    
    let eraserOrder = new Order();
    eraserOrder.customer = order.customer;
    eraserOrder.statusDate.borrador = new Date();

    await this.http.post(this.URL_API, eraserOrder).toPromise();
  }

  async updateAndConfirmOrder(order: Order){
    await this.http.put(`${this.URL_API}/updateandconfirm/${order._id}`,{
      order: order
    }).toPromise();
    
    let eraserOrder = new Order();
    eraserOrder.customer = order.customer;
    eraserOrder.statusDate.borrador = new Date();
    
    await this.http.post(this.URL_API, eraserOrder).toPromise();
  }

  async changeStatus(id, statusName){
    let res: any = await this.http.get(`${this.URL_API}/statusdate/${id}`).toPromise();

    switch(statusName){
      case "En proceso":{
        res.statusDate.enProceso = new Date();
      }
      case "Lista":{
        res.statusDate.lista = new Date();
      }
    }

    await this.http.put(`${this.URL_API}/changestatus/${id}`, {status: statusName, statusDate: res.statusDate}).toPromise();
  }

}
