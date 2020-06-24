import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extra } from '../models/extra';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  
  readonly URL_API = "http://localhost:3000/extra";

  constructor( private http: HttpClient) { }

  postExtra(extraList){
    this.http.post(this.URL_API, extraList).subscribe((res: any) => {
      console.log(res.status);
    })
  }

  getExtraByProduct(id){
    return this.http.get(this.URL_API + "/" + id);
  }

}
