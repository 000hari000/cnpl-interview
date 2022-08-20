import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public base_url:any=environment.base_url;
  constructor(private _http:HttpClient) { }
  getBlog(search:any=null):Observable<any>{
    return this._http.post(this.base_url+'cwebsite/getBlog',{search});
  }
  signUp(registerData:any):Observable<any>{
    return this._http.post(this.base_url+'clogin/registerUser',{registerData});
  }
  login(loginData:any):Observable<any>{
    return this._http.post(this.base_url+'clogin/doLogin',{loginData});
  }
  getMyBlog():Observable<any>{
    return this._http.post(this.base_url+'cblog/getBlog',{});
  }
  saveBlog(blogData:any):Observable<any>{
    return this._http.post(this.base_url+'cblog/saveBlog',{blogData});
  }
  getBlogById(blogId:any):Observable<any>{
    return this._http.post(this.base_url+'cblog/getBlogById',{blogId});
  }
  deleteBlog(blogId:any):Observable<any>{
    return this._http.post(this.base_url+'cblog/deleteById',{blogId});
  }
  getTag():Observable<any>{
    return this._http.post(this.base_url+'cblog/getTag',{});
  }
}
