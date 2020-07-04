import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { fade, hoverZoom, listAnimation } from 'src/app/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExtraService } from 'src/app/services/extra.service';
import { Extra } from 'src/app/models/extra';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

export interface productCard {
  product: Product;
  zoom: String;
}

export interface extra {
  name: String;
  multiple: boolean;
  option: option[];
  radioValue: String;
}

export interface option {
  name: String;
  price: Number;
  selected: boolean;
}

export interface productDetail {
  'product': String,
  'price': Number,
  'quantity': Number,
  'extra': [{
      'name': String,
      'price': Number
  }],
  'total': Number
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

  fade = "in";

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
        this.fade = "out";
      })
    });
  }

  loadCurrentOrder(){
    let customerId = "5eff95e7a215a7356006bae9";
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
    /*
      El modal para añadir productos a la orden en estado borrador necesita 3 argumentos:
        1. Producto a añadir.
        2. Extras del producto.
        3. Sub-total de costo del producto((precio del mismo + extras) * cantidad)
        4. Cantidad de productos(junto con extras seleccionados) a añadir a la orden
    */
    /* 
      El procedimiento es el siguiente:
        1.  Obtenemos los extras del producto que se recibio como parámetro
        2.  Creamos la lista de extras que se enviarán al modal,
            en donde cada elemento tendrá el formáto de la interfáz "extra"
    */
    new Promise((respond, reject) => {
      this.extraService.getExtraByProduct(p._id).subscribe(res => {
        respond(res as Extra[]);
      })
    }).then((list: Extra[]) => {
      let extras: extra[] = [];//Lista de extras que se enviarán al modal
      let aux: extra;//Variable que tomará los valores de cada elemento de la lista retornada de extraService
      let option: option = {//Variable que tomará los valores de cada opción
        'name': '',
        'price': 0,
        'selected': true
      };

      list.forEach(element => {

        aux = {
          'name':'',
          'multiple': false,
          'option': [],
          'radioValue': ''
        };

        aux.name = element.name;
        aux.multiple = element.multiple;

        element.option.forEach(op => {
          //Recorremos cada option registrada en el extra
          if(op.status == "Disponible"){
            option.name = op.name;
            option.price = op.price;
            aux.option.push(option);
          }
        });
        extras.push(aux);
      });

      const dialogRef = this.dialog.open(ProductDetailDialog, {
        data: {product: p, extra: extras, totalAmount: p.price, quantity: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.productToOrder(result.product, result.extra, result.totalAmount, result.quantity);
        }
      });
    });
  }

  productToOrder(productSelected: Product, extraList: extra[], totalAmount, quantity){
    /*
      Este método se encarga de modificar 3 atributos de la orden:
        1.  totalAmount: se suma el Sub-total, proporcionado por el modal, a la cantidad que esta registrada en la orden
        2.  wait: Tomará el valor de productionTime más alto de los productos que esten en productDetail
        3.  business: Si la orden no tiene registrado un negocio, se asigna el valor del negocio registrado del producto en cuestión
        4.  productDetail
    */
    let product: productDetail = {
      'product': "",
      'price':0,
      'quantity': 0,
      'extra': [{
        'name': "",
        'price': 0
      }],
      'total': 0
    };
    
    let wait = productSelected.productionTime;

    /*
      En el constructor de la orden, el array de productDetail se inicializa
      añadiendo un objeto json.

      Si la orden solo contiene ese objeto json vacio, por ende tambien los extras contiene solo 1 elemento vacio.
      Si ese es el caso, se modifica el valor de ese objeto y posteriormente se añaden los nuevos
    */

    if(this.currentOrder.productDetail[0].product == ""){
      /*
        Si productDetail solo contiene el contructor, se modifica el objeto.
      */
      this.currentOrder.productDetail[0].product = productSelected._id;
      this.currentOrder.productDetail[0].price = productSelected.price;
      this.currentOrder.productDetail[0].quantity = quantity;
      this.currentOrder.productDetail[0].total = totalAmount;
    }else{
      product.product = productSelected._id;
      product.price = productSelected.price;
      product.quantity = quantity;
      product.total = totalAmount;
      this.currentOrder.productDetail.push(product);
    }

    extraList.forEach(element => {
      element.option.forEach(op => {
        if(element.radioValue == op.name || op.selected){
          /*
            Si existe radioValue, quiere decir que el extra seleccionado no permitia la selección multiple.
            Si la opción era seleccionada, quiere decir que el extra(s) seleccionado(s) permitian la selección multiple.

            Independientemente de lo antes mencionado, caso afirmativo de alguna de las dos
            significa que se añade a la lista de extras del producto.
          */
          if(this.currentOrder.productDetail[0].product == ""){
            //Si el primer elemento esta vacio, se le asignan los valores
            if(this.currentOrder.productDetail[0].extra[0].name == ""){
              //Si el primer elemento de la lista de extras esta vacio, se le asignan los valores
              this.currentOrder.productDetail[0].extra[0].name = op.name;
              this.currentOrder.productDetail[0].extra[0].price = op.price;
            }else{
              //Sino, se añade un nuevo objeto
              this.currentOrder.productDetail[0].extra.push({'name': op.name, 'price': op.price});
            }
          }else{
            //Sino se añade un nuevo objeto
            if(product.extra.length == 1){
              //Si el primer elemento de la lista de extras esta vacio, se le asignan los valores
              product.extra[0].name = op.name;
              product.extra[0].price = op.price;
            }else{
            //Sino se añade un nuevo objeto
              product.extra.push({'name': op.name, 'price': op.price})
            }
          }
        }

      });
    });

    //Se verifica el tiempo de espera
    if(wait > this.currentOrder.wait) this.currentOrder.wait = wait;

    //Sumamos el total con el subtotal del producto nuevo
    this.currentOrder.totalAmount += this.decimalAdjust('round', totalAmount, -2);

    if(this.currentOrder.business == ""){//Si acaso no existe un registro del negocio en la orden, se modifica su valor
      this.currentOrder.business = this.business._id;
      this.orderService.assignBusiness(this.currentOrder._id, this.business._id);
    }

    
    this.orderService.addProductToOrder(this.currentOrder._id, this.currentOrder.totalAmount, this.currentOrder.wait, this.currentOrder.productDetail);
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
  selector: 'product-detail-dialog',
  templateUrl: 'product-detail-dialog.html',
  styleUrls: ['./product.catalog.component.css']
})
export class ProductDetailDialog {

  constructor(public dialogRef: MatDialogRef<ProductDetailDialog>,
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
    this.data.totalAmount *= this.data.quantity;
  }
}