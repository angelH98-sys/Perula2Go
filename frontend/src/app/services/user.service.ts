import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = 'http://localhost:3000/user';
  readonly URL_IMAGE = 'http://localhost:3000/fileUpload/user';

  constructor( private http: HttpClient) { }

  postUser(user: User){
    this.http.post(this.URL_API, user).subscribe((res: any) => {
      console.log(res.status);
    });
  }

  uploadImage (image: FormData){
      return this.http.post(this.URL_IMAGE, image);
  }

}
