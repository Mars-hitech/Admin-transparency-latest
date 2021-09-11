import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';@Component({
  selector: 'ngx-roles-user-add',
  templateUrl: './roles-user-add.component.html',
  styleUrls: ['./roles-user-add.component.scss']
})
export class RolesUserAddComponent implements OnInit {
  resultat:any;
  resultat_id:any;
  search:any;
  get_searc:any;
  get_searc_id:any;
  dataTutors: any=[];
  tab_or: any=[];
  inpt_search: any;
  inptShow=false;
  tutors:any[];
 user_search: any[];
  students: any[];
  users: any;
  tab: any[];


  resultat2:any;
  resultat_id2:any;
  search2:any;
  get_searc2:any;
  get_searc_id2:any;
  dataTutors2: any=[];
  tab_or2: any=[];
  inpt_search2: any;
  inptShow2=false;
  tutors2:any[];
 role_search: any[];
  students2: any[];
  users2: any;
  tab2: any[];


  roleUserForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_role_user: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  permission_roles: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.PermissionRole.getList(
      {
        should_paginate: false,
       
      }).subscribe((data) => {
      this.permission_roles = data;
      this.loading = false;
   
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    this.api.User.getList(
      {
        should_paginate: false,
       
      }).subscribe((data) => {
      this.users = data;
      this.loading = false;
   
    }, (error) => {
      this.loading = false;
      console.log(error);
    });

    this.api.Role.getList(
      {
        should_paginate: false,
       
      }).subscribe((data) => {
      this.roles = data;
      this.loading = false;
   
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    this.createForm();
    
    
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.RoleUser.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_role_user = event;
            console.log(this.old_role_user)
            this.roleUserForm.controls['role_id'].setValue(this.old_role_user.role_id);
            this.roleUserForm.controls['user_id'].setValue(this.old_role_user.user_id);
            this.roleUserForm.controls['user_type'].setValue(this.old_role_user.user_type);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/roles-user-list']);
  }

  save() {
    if (!(this.roleUserForm.dirty && this.roleUserForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.roleUserForm.value;
      console.log(params);
      if (this.old_role_user) {
        this.api.RoleUser.one(this.old_role_user.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/roles-user-list']);
          }, (error) => {
            this.loading = false;
            console.log(error);
            const e_array = error.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function(key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      } else {
        this.api.RoleUser
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/roles-user-list']);
          }, (error) => {
            this.loading = false;
            console.log(error);
            const e_array = error.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function(key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      }
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.roleUserForm = this._formBuilder.group({


      user_id: ['', Validators.required],
      role_id: ['', Validators.required],
      user_type: ['', Validators.required],
    
    });
  }



  //event onkey
  searchForm(){

    // console.log(this.students);
     this.user_search=[];
    this.tab=[]; 
 
     for (let nb = 0; nb <this.users.length; nb++) {
      if(this.inpt_search!=""){
     
       if(this.users[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
         
         this.tab.push(this.users[nb]);
         this.user_search=this.tab;
       
       }
      }
       
   }
 

   }
   
   values = '';
 
 onKey(event: any) { // without type info
   this.values = event.target.value ;
  
     
   if(this.values!=""){
     this.resultat=event.target.value;
     this.inptShow=true;
     this.inpt_search=this.values;
     
     console.log(this.inpt_search);
     this.searchForm();
     
   
   }else{
     
    this.dataTutors=this.tab_or;
     this.inptShow=false;
     this.resultat="";
     this.resultat_id="";
   }
  
 }
 
 click_Show(searc,searc_id){
   this.get_searc=searc;
   this.get_searc_id=searc_id;
 this.resultat=this.get_searc;
 this.resultat_id=this.get_searc_id;
 this.inptShow=false;
 if(this.resultat_id){
   this.roleUserForm.controls['user_id'].setValue(this.resultat_id);
 }
 
 }




 
  //event onkey
  searchForm2(){

    // console.log(this.students);
     this.role_search=[];
    this.tab2=[]; 
 
     for (let nb = 0; nb <this.roles.length; nb++) {
      if(this.inpt_search2!=""){
     
       if(this.roles[nb].display_name.toUpperCase().includes(this.inpt_search2.toUpperCase())===true){
         
         this.tab2.push(this.roles[nb]);
         this.role_search=this.tab2;
       
       }
      }
       
   }
 

   }
   
   values2 = '';
 
 onKey2(event: any) { // without type info
   this.values2 = event.target.value ;
  
     
   if(this.values2!=""){
     this.resultat2=event.target.value;
     this.inptShow2=true;
     this.inpt_search2=this.values2;
     
     console.log(this.inpt_search2);
     this.searchForm2();
     
   
   }else{
     
    this.dataTutors2=this.tab_or2;
     this.inptShow2=false;
     this.resultat2="";
     this.resultat_id2="";
   }
  
 }
 
 click_Show2(searc,searc_id){
   this.get_searc2=searc;
   this.get_searc_id2=searc_id;
 this.resultat2=this.get_searc2;
 this.resultat_id2=this.get_searc_id2;
 this.inptShow2=false;
 if(this.resultat_id2){
   this.roleUserForm.controls['role_id'].setValue(this.resultat_id2);
 }
 
 }

        
    }
  