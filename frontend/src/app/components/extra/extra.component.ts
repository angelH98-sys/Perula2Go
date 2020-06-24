import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { rejects } from 'assert';
import { Extra } from 'src/app/models/extra';
import { ExtraService } from 'src/app/services/extra.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {

  productName: String;
  id: String;
  extraList: Extra[] = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private extraService: ExtraService) { }

  ngOnInit(): void {
    this.checkProduct();
    this.extraList.push(new Extra);
  }

  checkProduct(){
    this.id = this.route.snapshot.paramMap.get('id');
    new Promise((respond, reject) => {
      this.productService.getProductById(this.id).subscribe(res => {
        respond(res as Product);
      })
    }).then((product: Product) => {
      this.productName = product[0].name;
    })
  }

  addOption(i){
    this.extraList[i].option.push({"name":"","price":0,"status":"Disponible"});
  }

  addExtra(){
    this.extraList.push(new Extra());
  }

  deleteExtra(i){
    this.extraList.splice(i,1);
  }
  
  deleteOption(i, j){
    this.extraList[i].option.splice(j,1);
  }

  isLastElement(i){
    if(i == (this.extraList.length - 1)){
      return true;
    }else{
      return false;
    }
  }

  isLastOptionElement(i, j){
    if(j == (this.extraList[i].option.length - 1)){
      return true;
    }else{
      return false;
    }
  }

  createExtra(){
    for(let extra of this.extraList){
      extra.product = this.id;
    }
    
    this.extraService.postExtra(this.extraList);

  }

}
