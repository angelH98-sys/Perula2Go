import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { rejects } from 'assert';
import { Extra, Option } from 'src/app/models/extra';
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
    this.getProductName();
    this.addExtra();
  }

  async getProductName(){
    this.id = this.route.snapshot.paramMap.get('id');
    const res: any = await this.productService.getProductById(this.id).toPromise() as String;
    this.productName = res.name;
  }

  addOption(i){
    this.extraList[i].option.push(new Option());
  }

  addExtra(){
    let extra = new Extra();
    extra.option.push(new Option());
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
