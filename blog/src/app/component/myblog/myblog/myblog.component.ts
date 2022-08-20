import { Component, OnInit ,ElementRef,ViewChild } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { FormBuilder,Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.scss']
})
export class MyblogComponent implements OnInit {
  @ViewChild('manageBlog')
  manageBlogModel!:ElementRef;
  public title:any='';
  public blogForm:any=this.init_blogForm();
  constructor(config: NgbModalConfig,private _homeS:HomeService,private _fb:FormBuilder,private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
   //dropdown 
   public tagList:any=[];
   //end
  public blogList:any=[];public saved:boolean=false;public msg:any='';
  ngOnInit(): void {
    this.getBlog(); this.getTag();
    
  }
  getBlog(){
    this.blogList=[];
    this._homeS.getMyBlog().subscribe((res:any)=>{
      if(res.response.code == 200){
        this.blogList = res.response.data;
      }
    });
  }
  getTag(){
    this.tagList=[];
    this._homeS.getTag().subscribe((res:any)=>{
      if(res.response.code == 200){
        this.tagList = res.response.data;
      }
    });
  }
  format_data(d:any){
    let dtArr = d.split(' ');
    let dateArr = dtArr[0].split('-');
    let date = dateArr[2]+'/'+dateArr[1]+'/'+dateArr[0];
    return date+' '+dtArr[1];
  }
  init_blogForm(){
    return this._fb.group({
      blogId:[0],
      blogTitle:['',[Validators.required,Validators.maxLength(20)]],
      blogSubTitle:['',[Validators.required,Validators.maxLength(50)]],
      description:['',[Validators.required,Validators.maxLength(250)]],
      tags:['']
    })
  }
  add_form(){
    this.empty_form();
    this.title='Add Blog';
    this.modalService.open(this.manageBlogModel,{size:'lg'});
  }
  empty_form(){
    this.blogForm.patchValue({
      blogId:0,
      blogTitle:'',
      blogSubTitle:'',
      description:'',
      tags:''
    })
  }
  inp_group(controlName:any){
    return this.blogForm.controls[controlName];
  }
  edit_form(i:any){
    this._homeS.getBlogById(i).subscribe((res:any)=>{
      if(res.response.code == 200){
        let data = res.response.data;
        this.blogForm.patchValue({
          blogId:data.blogId,
          blogTitle:data.blogTitle,
          blogSubTitle:data.blogSubTitle,
          description:data.description,
          tags:data.tags
        });
        this.modalService.open(this.manageBlogModel,{size:'lg'});
      }
    })
  }
  delete_form(i:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._homeS.deleteBlog(i).subscribe((res:any)=>{
          if(res.response.code == 200){
            this.getBlog();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }
    })
    
  }
  saveData(){
 //   this.saved=true;this.msg='';
    this._homeS.saveBlog(this.blogForm.value).subscribe((res:any)=>{
      this.saved=false;this.msg=res.response.message;
      if(res.response.code == 200){
        this.modalService.dismissAll();
        this.getBlog();
        Swal.fire(
          'Saved!',
          'Blog saved successfully!.',
          'success'
        )
      }
    })
  }
}
