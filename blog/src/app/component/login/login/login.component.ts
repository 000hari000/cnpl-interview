import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { HomeService } from 'src/app/service/home/home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public saved:boolean=false;public msg:any='';
  constructor(private _fb:FormBuilder,private _homeS:HomeService,private _route:Router) { }
  public signUpForm:any = this.init_signup();

  ngOnInit(): void {
  }
  init_signup(){
    return this._fb.group({
      userEmail:['',[Validators.required,Validators.maxLength(100),Validators.email]],
      userPassword:['',[Validators.required,Validators.maxLength(20)]],
    })
  }
  inp_group(controlName:any){
    return this.signUpForm.controls[controlName];
  }
  signUp(){
    this.saved=true;this.msg='';
    this._homeS.login(this.signUpForm.value).subscribe((res:any)=>{
      this.saved=false; this.msg = res.response.message;
      if(res.response.code == 400){
        let data  = res.response.data;
        localStorage.setItem('userDetail',data);
        localStorage.setItem('token','demo***'+data['userId']);
        this.signUpForm = this.init_signup();
        this._route.navigate(['/my-blog']);
      }
    })
  }
}
 