import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  order: Order = new Order();
  productNameList: String[] = [];

  addressList = [];
  addressSelected: String;

  customerId = "5ef8c88b89f9da00d0d7dd74";
  lat = 13.763992;
  lng = -89.049093;
  zoom: Number = 18;

  constructor(private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){
    new Promise(respond => {
      this.orderService.getEraserOrder(this.customerId).subscribe(res => {
        this.order = res as Order;
        respond(new Promise(respond2 => {
          this.userService.getUserAddress(this.customerId).subscribe(res => {
            this.addressList = res as [];
            this.addressSelected = this.addressList[0]._id;
            respond2();
          });
        }));
      });
    }).then(() => {
      this.order.productDetail.forEach(element => {
        this.productService.getProductName(element.product).subscribe((res: String) => {
          this.productNameList.push(res);
        });
      });
    });
  }

  changeAddress(){
    let aux = this.addressList.find(element => element._id == this.addressSelected);
    this.lat = aux.latitude;
    this.lng = aux.longitude;
  }

  confirmOrder(){
    let address = this.addressList.find(element => element._id == this.addressSelected);
    this.orderService.onProcess(this.order._id, address);
    let order: Order = new Order();
    order.customer = this.customerId;
    this.orderService.postOrder(order);
  }
}
