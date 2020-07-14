import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/utilities/address';

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

  customerId = "5f04cad5bb4f752b0c2014ec";
  lat = 13.763992;
  lng = -89.049093;
  zoom: Number = 18;

  constructor(private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder(){

    this.order = await this.orderService.getEraserOrder(this.customerId).toPromise() as Order;
    this.addressList = await this.userService.getUserAddress(this.customerId).toPromise() as Address[];
    console.log(this.addressList);
    this.addressSelected = this.addressList[0].direction;
    this.lat = this.addressList[0].latitude;
    this.lng = this.addressList[0].longitude;

    this.order.productDetail.forEach(async element => {
      let name = await this.productService.getProductName(element.productId).toPromise() as String;
      this.productNameList.push(name)
    });
  }

  changeAddress(){
    let aux = this.addressList.find(element => element._id == this.addressSelected);
    this.lat = aux.latitude;
    this.lng = aux.longitude;
  }

  confirmOrder(){
    let address: Address = this.addressList.find(element => element.direction == this.addressSelected);
    this.order.statusDate.enCola = new Date();
    this.orderService.confirmOrder(this.order, address, this.order.statusDate);
  }
}
