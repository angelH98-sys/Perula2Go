import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();

  categoryValues;

  businessList: Business[];
  categoryList: Category[];

  image;

  sizeList = [];

  constructor(public businessService: BusinessService, public categoryService: CategoryService, public productService: ProductService) { }

  ngOnInit(): void {
    this.getBusiness();
    this.getCategories();
    this.addSize();
  }

  getBusiness(){
    this.businessService.getBusiness().subscribe(res=>{
      this.businessList = res as Business[];
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res => {
      this.categoryList = res as Category[];
    });
  }

  getPictureInfo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  addSize(){
    this.sizeList.push({'name':'', 'price': 0});
  }

  addProduct(){
    for(let i = 0; i <= this.sizeList.length ; i++){
      let s = this.sizeList[i];
      this.product.size[i] = s;
    }
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
