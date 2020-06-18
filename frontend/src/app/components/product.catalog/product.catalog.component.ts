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
  business: Business;

  cover = "";

  logo = "../../../assets/loading/homer.gif";

  fade = "out";

  constructor(private route: ActivatedRoute, 
    public productService: ProductService, 
    public businessService: BusinessService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
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
        this.fade = "in";
      })
    })
  }

  zoomIn(card: productCard){
    card.zoom = 'in';
  }

  zoomOut(card: productCard){
    card.zoom = 'out';
  }

  openDialog(p: Product) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {

      data: {product: p}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    @Inject(MAT_DIALOG_DATA) public data,
    public categoryService: CategoryService) {
      categoryService.getCategories().subscribe(res => {
        this.getCategoryName(res as Category[]);
      })
    }
  
  getCategoryName(list: Category[]){
    for(let l of list){
      for(let c of this.data.product.category as []){
        if(c == l._id){
          this.categories.push(l);
        }
      }
    }
  }
}