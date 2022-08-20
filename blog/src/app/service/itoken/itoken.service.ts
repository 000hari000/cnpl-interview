import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ItokenService implements HttpInterceptor {
  
  constructor(private _authS:AuthService) { }
  public token = this._authS.getToken();
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.token);
    const res = req.clone({
      setHeaders:{
        Authentication:`${this.token}`
      }
    });
    return next.handle(res);
  }
}
