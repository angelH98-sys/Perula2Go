import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Extra } from 'src/app/models/extra';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();

  businessList: Business[];
  categoryList = ["Promoción", "Para compartir", "Combo", "Individual", "Extra"];

  image;

  sizeList = [];

  constructor( public productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBusiness();
  }

  getBusiness(){
    this.product.business = this.route.snapshot.paramMap.get('id');
    /*this.businessService.getBusiness().subscribe(res=>{
      this.businessList = res as Business[];
    });*/
  }


  getPictureInfo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  addProduct(){
    /*for(let i = 0; i <= this.sizeList.length ; i++){
      let s = this.sizeList[i];
      this.product.size[i] = s;
    }*/
    this.product.status = "Disponible";

    let image = new FormData();
    image.append("image", this.image);

    interface imageResponse {
      image: String
    }

    new Promise((respond, rejects) => {
      this.productService.uploadImage(image).subscribe((res: imageResponse) => {
        this.product.picture = res.image;
        respond();
      })
    }).then(()=>{
      this.productService.postProduct(this.product);
    })
  }

}
