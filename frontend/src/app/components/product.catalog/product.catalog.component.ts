import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { fade, hoverZoom, listAnimation } from 'src/app/utilities/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExtraService } from 'src/app/services/extra.service';
import { Extra } from 'src/app/models/extra';
import { OrderService } from 'src/app/services/order.service';
import { Order, productInOrder, extraInOrder, optionInOrder } from 'src/app/models/order';

export interface productCard {
  product: Product;
  zoom: String;
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

  async loadData(){
    const id = this.route.snapshot.paramMap.get('id');
    let products: Product[] = await this.productService.getProducts(id).toPromise() as Product[];
    products.forEach(element => {
      this.cardList.push({'product': element,'zoom':'out'});
    });
    this.business = await this.businessService.getBusinessById(id).toPromise() as Business;
    this.cover = "../../../assets/business/" + this.business.picture.cover;
    this.logo = "../../../assets/business/" + this.business.picture.logo;
    this.fade = "out";
    /*
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
    });*/
  }

  async loadCurrentOrder(){
    let customerId = "5f04cad5bb4f752b0c2014ec";
    this.currentOrder = await this.orderService.getEraserOrder(customerId).toPromise() as Order;
    /*this.orderService.getEraserOrder(customerId).subscribe(res => {
      this.currentOrder = res as Order;
    });*/
  }

  zoomIn(card: productCard){
    card.zoom = 'in';
  }

  zoomOut(card: productCard){
    card.zoom = 'out';
  }

  async openDialog(p: Product) {
    /*
      El modal para añadir productos a la orden en estado borrador necesita 3 argumentos:
        1. Producto a añadir.
        2. Extras del producto.
        3. Sub-total de costo del producto((precio del mismo + extras) * cantidad)
        4. Cantidad de productos(junto con extras seleccionados) a añadir a la orden
    */
    let extrasInDb: any = await this.extraService.getExtraByProduct(p._id).toPromise();
    
    const dialogRef = this.dialog.open(ProductDetailDialog, {
      data: {product: p, extra: extrasInDb, totalAmount: p.price, quantity: 1}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productToOrder(result.product, result.extra, result.totalAmount, result.quantity);
      }
    });
  }

  productToOrder(productSelected: Product, extraList: Extra[], totalAmount, quantity){
    /*
      Este método se encarga de modificar 3 atributos de la orden:
        1.  totalAmount: se suma el Sub-total, proporcionado por el modal, a la cantidad que esta registrada en la orden
        2.  wait: Tomará el valor de productionTime más alto de los productos que esten en productDetail
        3.  business: Si la orden no tiene registrado un negocio, se asigna el valor del negocio registrado del producto en cuestión
        4.  productDetail
    */
    let product: productInOrder = new productInOrder();

    product.businessId = this.business._id;
    product.productId = productSelected._id;
    product.price = productSelected.price;
    product.quantity = quantity;
    product.total = this.decimalAdjust('round', totalAmount, -2);;

    let extraSelected: extraInOrder[] = [];
    let optionSelected: optionInOrder[] = [];

    extraList.forEach(extra => {
      optionSelected = [];
      extra.option.forEach(option => {
        if(option.selected) optionSelected.push({'name': option.name, 'price': option.price});
      });
      if(optionSelected.length > 0) extraSelected.push({'name': extra.name, 'option': optionSelected});
    });

    product.extra = extraSelected;

    this.currentOrder.productDetail.push(product);

    let wait = productSelected.productionTime;
    //Se verifica el tiempo de espera
    if(wait > this.currentOrder.wait) this.currentOrder.wait = wait;

    //Sumamos el total con el subtotal del producto nuevo
    this.currentOrder.totalAmount += this.decimalAdjust('round', totalAmount, -2);

    this.currentOrder.totalAmount = this.decimalAdjust('round', this.currentOrder.totalAmount, -2);

    this.orderService.addProductToOrder(this.currentOrder._id, this.currentOrder.totalAmount, 
      this.currentOrder.wait, this.currentOrder.productDetail);
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
    @Inject(MAT_DIALOG_DATA) public data) {
      this.defaulOptions();
      }
  
  /*
      Este dialog se encarga de alimentar el atributo 'productDetail' de las ordenes.
      Se muestra la información del producto, los extras que desea seleccionar y la
      cantidad de productos con la misma configuración que desea.

      Para satisfacer dichos requisitos, se opto por la implementación de 3 controles:
      1. Input de tipo numérico para obtener la cantidad de elementos que desea.
      2. RadioButtons para la selección de los extras que no permiten opción multiple.
      3. Checkbox para la selección de los extras que permiten opción multiple.

      Para los radio buttons, existen las opciones seleccionadas por defecto proveenientes
      de los parametros de este dialog.
      Sin embargo, no fue posible establecerlas directamente modificando la propiedad checked
      o selected, así que se recurrió a la variable auxiliar 'optionValues' que contiene el nombre
      de la opción seleccionada por defecto y el id del extra al que pertenece.
  */
  optionValues: {'name': String, 'extraId': String}[] = [];
  
  controlChange(){
    /*
      Método que realiza realiza el calculo del monto total a pagar
    */
    this.checkOptions();
    this.data.totalAmount = this.data.product.price;
    this.data.extra.forEach((element: Extra) => {
      element.option.forEach(op => {
        if(op.selected && op.price > 0){
          this.data.totalAmount += op.price;
        }
      });
    });
    this.data.totalAmount *= this.data.quantity;
  }

  checkOptions(){
    /*
      Método que se encarga de cambiar el atributo "selected" a todas aquellas
      opciones (radioButtons) que se encuentren almacenadas en el array optionValues
    */
    this.optionValues.forEach(element => {
      this.data.extra.forEach((extra: Extra) => {
        if(extra._id == element.extraId){
          for(let i = 0; i < extra.option.length; i++){
            if(extra.option[i].name == element.name){
              extra.option[i].selected = true;
            }else{
              extra.option[i].selected = false;
            }
          }
        }
      });
    });
  }

  defaulOptions(){
    /*
      Método que se encarga de llenar el array optionValues con
      las opciones seleccionadas por defecto
    */
    const extras: Extra[] = this.data.extra;
    let extra: Extra;
    for(let i = 0; i < extras.length; i++){
      extra = extras[i];
      extra.option.forEach(option => {
        if(option.selected) this.optionValues[i] = {'name':option.name, 'extraId': extra._id};
      });
    };
    this.controlChange();
  }
}