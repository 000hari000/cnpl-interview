import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tagList:any=[];
  constructor(private _homeS:HomeService) { }
  public blogList:any=[];public selectedTag:any=[];
  ngOnInit(): void {
    this.getBlog();this.getTag();
  }
  getTag(){
    this.tagList=[];
   
    this._homeS.getTag().subscribe((res:any)=>{
      if(res.response.code == 200){
        this.tagList = res.response.data;
      }
    });
  }
  getBlog(){
    this.blogList=[];
    let search:any={};
    search['selectedTag']=this.selectedTag;
    this._homeS.getBlog(search).subscribe((res:any)=>{
      if(res.response.code == 200){
        this.blogList = res.response.data;
      }
    })
  }
  get_by_tag(i:any){
    let selRow = this.tagList[i];
    console.log(selRow);
    console.log(this.tagList);
    let id = selRow['tagId'];
    var a = this.selectedTag.lastIndexOf(id);
   /* 
    console.log(this.selectedTag[a]);*/
    if(this.selectedTag.indexOf(id) !== -1) {
      this.selectedTag.splice(a,1);
      this.tagList[i]['status']='00';
    }else{
      this.selectedTag.push(id);
      this.tagList[i]['status']='01';
    }
    this.getBlog();
  }
  format_data(d:any){
    let dtArr = d.split(' ');
    let dateArr = dtArr[0].split('-');
    let date = dateArr[2]+'/'+dateArr[1]+'/'+dateArr[0];
    return date+' '+dtArr[1];
  }
}
