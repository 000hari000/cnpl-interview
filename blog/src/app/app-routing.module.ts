import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home/home.component';
import { HeaderComponent } from './component/include/header/header/header.component';
import { LoginComponent } from './component/login/login/login.component';
import { SignupComponent } from './component/signup/signup/signup.component';
import { MyblogComponent } from './component/myblog/myblog/myblog.component';
import { AuthGuard } from './guard/auth/auth.guard';
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    canActivate:[],
    data:[{"login":'N/A',"page":1}]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[],
    data:[{"login":'No',"page":2}]
  },{
    path:'signup',
    component:SignupComponent,
    canActivate:[],
    data:[{"login":'No',"page":3}]
  },{
    path:'my-blog',
    component:MyblogComponent,
    canActivate:[AuthGuard],
    data:[{"login":'Yes',"page":1}]
  },
  { 
    path: '**', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[HomeComponent,HeaderComponent,LoginComponent,SignupComponent,MyblogComponent];
