import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { fade, hoverZoom, listAnimation } from 'src/app/animations';

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

  constructor(private route: ActivatedRoute, public productService: ProductService, public businessService: BusinessService) { }

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
}
