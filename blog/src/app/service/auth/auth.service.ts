import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLogged(){
    let token = localStorage.getItem('token');
    let err=0;
    if(token){
      let tokenArr = token.split('***');
      if(tokenArr[0] == 'demo'){
        err++;
      }
    }
    if(err == 0){
      return false;
    }else{
      return true;
    }
  }
  getToken(){
    let token = localStorage.getItem('token');
    if(token){
      let tokenArr = token.split('***');
      token = tokenArr[1];
    }
    return token;
  }
}
