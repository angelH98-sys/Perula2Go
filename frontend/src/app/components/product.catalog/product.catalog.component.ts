import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { fade, hoverZoom, listAnimation } from 'src/app/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { ExtraService } from 'src/app/services/extra.service';
import { Extra } from 'src/app/models/extra';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

export interface productCard {
  product: Product;
  zoom: String;
}

export interface extraOptionSelected {
  extraName: String;
  multiple: boolean;
  option: selectedFormat[];
  radioValue: String;
}

export interface selectedFormat {
  name: String;
  price: Number;
  status: String;
  selected: boolean;
}

export interface productDetail {
  'product': String,
  'price': Number,
  'extra': [{
      'name': String,
      'price': Number
  }]
}

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product.catalog.component.html',
  styleUrls: ['./product.catalog.component.css'],
  animations:[fade,hoverZoom,
    listAnimation]
})
export class ProductCatalogComponent implements OnInit {

  cardList: productCard[] = [];
  business: Business = new Business();
  currentOrder: Order;

  cover = "";

  logo = "../../../assets/loading/homer.gif";

  fadeIn = "out";
  fadeOut = "in";

  constructor(private route: ActivatedRoute, 
    public productService: ProductService, 
    public businessService: BusinessService,
    public dialog: MatDialog,
    private extraService: ExtraService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadCurrentOrder();
  }

  loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    new Promise((response, reject) => {
      this.productService.getProducts(id).subscribe(res => {
        let productList = res as Product[];
        for(let p of productList){
          this.cardList.push({'product': p,'zoom':'out'});
        }
        response();
      })
    }).then(() => {
      this.businessService.getBusinessById(id).subscribe(res => {
        this.business = res[0] as Business;
        this.cover = "../../../assets/business/" + this.business.picture.cover;
        this.logo = "../../../assets/business/" + this.business.picture.logo;
        this.fadeIn = "in";
        this.fadeOut = "out";
      })
    });
  }

  loadCurrentOrder(){
    let customerId = "5ef8c88b89f9da00d0d7dd74";
    this.orderService.getEraserOrder(customerId).subscribe(res => {
      this.currentOrder = res as Order;
    });
  }

  zoomIn(card: productCard){
    card.zoom = 'in';
  }

  zoomOut(card: productCard){
    card.zoom = 'out';
  }

  openDialog(p: Product) {
    new Promise((respond, reject) => {
      this.extraService.getExtraByProduct(p._id).subscribe(res => {
        respond(res as Extra[]);
      })
    }).then((list: Extra[]) => {
      let extras: extraOptionSelected[] = [];
      let aux: extraOptionSelected;
      list.forEach(element => {
        aux = {
          'extraName':'',
          'multiple': false,
          'option': [],
          'radioValue': ''
        };
        aux.extraName = element.name;
        aux.multiple = element.multiple;
        element.option.forEach(op => {
          aux.option.push({'name': op.name,'price': op.price,'status': op.status , 'selected': false});
        });
        extras.push(aux);
      });
      const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        data: {product: p, extra: extras, totalAmount: p.price}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.productToOrder(result.product, result.extra, result.totalAmount);
        }
      });
    });
  }

  productToOrder(productSelected: Product, extraList: extraOptionSelected[], totalAmount){
    let product: productDetail = {
      'product': "",
      'price':0,
      'extra': [{
        'name': "",
        'price': 0
      }]
    };
    
    let wait = productSelected.productionTime;
    extraList.forEach(element => {
      element.option.forEach(op => {
        if(element.radioValue == op.name || op.selected){
          if(this.currentOrder.productDetail[0].product == ""){
            if(this.currentOrder.productDetail[0].extra[0].name == ""){
              this.currentOrder.productDetail[0].extra[0].name = op.name;
              this.currentOrder.productDetail[0].extra[0].price = op.price;
            }else{
              this.currentOrder.productDetail[0].extra.push({'name': op.name, 'price': op.price});
            }
          }else{
            if(product.extra.length == 1){
              product.extra[0].name = op.name;
              product.extra[0].price = op.price;
            }else{
              product.extra.push({'name': op.name, 'price': op.price})
            }
          }
        }
      });
    });

    if(this.currentOrder.productDetail[0].product == ""){
      this.currentOrder.productDetail[0].product = productSelected._id;
      this.currentOrder.productDetail[0].price = productSelected.price;
    }else{
      product.product = productSelected._id;
      product.price = productSelected.price;
      this.currentOrder.productDetail.push(product);
    }

    if(wait > this.currentOrder.wait) this.currentOrder.wait = wait;

    this.currentOrder.totalAmount += this.decimalAdjust('round', totalAmount, -2);

    this.orderService.putOrder(this.currentOrder);
  }

  decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./product.catalog.component.css']
})
export class DialogContentExampleDialog {

  categories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  
  controlChange(){
    this.data.totalAmount = this.data.product.price;
    this.data.extra.forEach(element => {
      element.option.forEach(op => {
        if(element.radioValue == op.name || op.selected){
          this.data.totalAmount += op.price;
        }
      });
    });
  }
}