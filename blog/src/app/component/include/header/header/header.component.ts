import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private _authS:AuthService,private _route:Router) { }
  public isLog:boolean=false;
  ngOnInit(): void {
    this.isLog = this._authS.isLogged();
  }
  make_logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userDetail');
    this._route.navigate(['/login']);
  }
}
