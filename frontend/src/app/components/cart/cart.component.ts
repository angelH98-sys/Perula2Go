import { Component, OnInit, Inject } from '@angular/core';
import { Order, productInOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/utilities/address';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  order: Order = new Order();
  isModified: Boolean;
  productNameList: String[] = [];

  addressList = [];
  addressSelected: String;

  customerId = "5f04cad5bb4f752b0c2014ec";
  lat = 13.763992;
  lng = -89.049093;
  zoom: Number = 18;

  constructor(private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  async loadOrder(){

    this.order = await this.orderService.getEraserOrder(this.customerId).toPromise() as Order;
    this.isModified = false;
    this.addressList = await this.userService.getUserAddress(this.customerId).toPromise() as Address[];
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

  async confirmOrder(){
    if(this.isModified){
      let address: Address = this.addressList.find(element => element.direction == this.addressSelected);
      this.order.address = address;
      this.order.status = "En cola";
      this.order.statusDate.enCola = new Date();

      await this.orderService.updateAndConfirmOrder(this.order);
    }else{
      let address: Address = this.addressList.find(element => element.direction == this.addressSelected);
      this.order.address = address;
      this.order.status = "En cola";
      this.order.statusDate.enCola = new Date();

      await this.orderService.confirmOrder(this.order);
    }
  }

  editProduct(index){
    let product: productInOrder = this.order.productDetail[index];
    if(product.quantity > 1){
      this.openDialog(index, this.productNameList[index], product.quantity);
    }
  }

  openDialog(index, name, quantity): void {
    const dialogRef = this.dialog.open(QuantityModificatorDialog, {
      width: '250px',
      data: {index: index, name: name, quantity: quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteProduct(result.index, result.quantity)
    });
  }

  deleteProduct(index, quantity){
    let product: productInOrder = this.order.productDetail[index];

    if(isNaN(quantity) || quantity <= 0 || product.quantity < quantity || product == undefined){
      this.openAlert("Error al eliminar el producto");
      return;
    }

    if(product.quantity > quantity){
      let resta = product.quantity as any - quantity;
      this.order.productDetail[index].quantity = resta;
    }else{
      this.order.productDetail.splice(index, 1);
    }

    this.calculateTotal();

  }

  deleteExtra(productIndex, extraIndex, optionIndex){

    this.order.productDetail[productIndex].extra.splice(extraIndex, 1);
    this.calculateTotal();
  }

  calculateTotal(){
    let totalAmount = 0;
    let totalProduct;
    this.order.productDetail.forEach(element => {
      totalProduct = element.price;
      element.extra.forEach(extra => {
        extra.option.forEach(op => {
          totalProduct += op.price;
        });
      });
      totalProduct *= element.quantity as any;
      element.total = totalProduct;
      totalAmount += totalProduct;
    });
    this.order.totalAmount = totalAmount;
    this.isModified = true;
  }

  openAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    })
  }
  
}

@Component({
  selector: 'quantity-modificator-dialog',
  templateUrl: 'quantity-modificator-dialog.html',
})
export class QuantityModificatorDialog {

  constructor(
    public dialogRef: MatDialogRef<QuantityModificatorDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.maxQuantity = data.quantity;
      data.quantity = 1;
    }

  maxQuantity: Number;

  onNoClick(): void {
    this.dialogRef.close();
  }

}
