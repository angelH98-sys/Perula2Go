import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { ProductService } from 'src/app/services/product.service';
import { listAnimation } from 'src/app/animations';

export interface orderCards {
  '_id': Order;
  'orderDate': Date;
  'status': String;
  'productDetail': [];
}

@Component({
  selector: 'app-business-order',
  templateUrl: './business.order.component.html',
  styleUrls: ['./business.order.component.css'],
  animations:[
    listAnimation
  ]
})
export class BusinessOrderComponent implements OnInit {

  businessId = "5ee0ecf75cd382217c88a783";
  incommingOrders: orderCards[] = [];
  onProcessOrders: orderCards[] = [];
  finishedOrders: orderCards[] = [];
  productNames = [];

  constructor(private orderService: OrderService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.productService.getProductByBusiness(this.businessId).subscribe(res => {
      this.productNames = res as [];
      this.orderService.getOrderByBusiness(this.businessId).subscribe(res => {
        (res as []).forEach((element: any) => {
          let aux;
          for(let i = 0; i < element.productDetail.length; i++){
            aux = element.productDetail[i].product;
            element.productDetail[i].name = this.productNames.find(p => p._id == aux).name;
          }
          switch(element.status){
            case "En cola":{
              this.incommingOrders.push({'_id': element._id, 'orderDate': element.orderDate, 'productDetail': element.productDetail, 'status': element.status});
              break;
            }
            case "En proceso":{
              this.onProcessOrders.push({'_id': element._id, 'orderDate': element.orderDate, 'productDetail': element.productDetail, 'status': element.status});
              break;
            }
            case "Lista":{
              this.finishedOrders.push({'_id': element._id, 'orderDate': element.orderDate, 'productDetail': element.productDetail, 'status': element.status});
              break;
            }
          }
        });
      });
    });
  }

  zoomIn(card){
    card.zoom = 'in';
  }

  zoomOut(card){
    card.zoom = 'out';
  }

  getDate(date: Date){
    return date.toDateString;
  }

  toProcess(id, index){
    this.onProcessOrders.push(this.incommingOrders[index]);
    this.incommingOrders.splice(index, 1);
    this.orderService.changeStatus(id,'En proceso');
  }

  finished(id, index){
    this.finishedOrders.push(this.onProcessOrders[index]);
    this.onProcessOrders.splice(index, 1);
    this.orderService.changeStatus(id,'Lista');
  }

}
