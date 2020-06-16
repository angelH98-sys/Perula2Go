import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly URL_API = 'http://localhost:3000/product';  
  readonly URL_IMAGE = 'http://localhost:3000/fileUpload/product';

  constructor(private http: HttpClient) { }

  postProduct(product: Product){
    this.http.post(this.URL_API, product).subscribe((res: any) => {
      console.log(res.status);
    })
  }

  uploadImage(image: FormData){
    return this.http.post(this.URL_IMAGE, image);
  }

}
