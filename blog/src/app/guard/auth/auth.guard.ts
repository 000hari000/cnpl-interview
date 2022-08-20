import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authS:AuthService,private _route:Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean {
      let data = route.data;
      let isLogged = this._authS.isLogged();
      if(!isLogged){
        this._route.navigate(['/login']);
        return false;
      }else{
        return true;
      }
     /* let type=0;
      if(typeof data != 'undefined'){
        data = data[0];
        let haveLogin = data['login'];
        if(haveLogin == 'No'){
          type=1;
        }else if(haveLogin == 'Yes'){
          type=2;
        }
      }
      
      if(type == 2){
        
      }else if(type == 1){
        if(isLogged){
          this._route.navigate([state.url]);
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }*/
  }
  
}
