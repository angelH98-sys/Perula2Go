import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly URL_API = "http://localhost:3000/category";

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get(this.URL_API);
  }

}
