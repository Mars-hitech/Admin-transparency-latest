import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-chat-user-add',
  templateUrl: './chat-user-add.component.html',
  styleUrls: ['./chat-user-add.component.scss']
})
export class ChatUserAddComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  inptShow=false;
  chatUserForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_message: any;
  user_search: any[];
  tab: any[];
  users: any;
  inpt_search: string;
  resultat: any;

  dataTutors: any;
  tab_or: any;
  resultat_id: string;
  get_searc: any;
  get_searc_id: any;
  old_chat_user: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.User.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.users = data;
    
    }, (error) => {
      console.log(error);
    });
    this.createForm();
    this.loading = false;
    
    
  }

  ngOnInit() {
  
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.ChatUser.one(route_params.params.id)
          .get()
          .subscribe((users) => {
         
            this.old_chat_user = users;
            this.chatUserForm.controls['is_admin'].setValue(this.old_chat_user.is_admin);
            this.chatUserForm.controls['chat_id'].setValue(this.old_chat_user.chat_id);
            this.chatUserForm.controls['user_id'].setValue(this.old_chat_user.user_id);
     

            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });


  }

  cancel() {
    this.router.navigate(['/pages/chat-user-list']);
  }

  save() {
    if (!(this.chatUserForm.dirty && this.chatUserForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.chatUserForm.value;
      console.log(params);
      console.log(this.old_chat_user);
      if (this.old_chat_user) {
        console.log("good");
        this.api.ChatUser.one(this.old_chat_user.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/chat-user-list']);
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
        this.api.ChatUser
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/chat-user-list']);
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
    this.chatUserForm = this._formBuilder.group({
      chat_id: ['', Validators.required],
      user_id: ['', Validators.required],
      is_admin: ['', Validators.required],
     
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
   this.chatUserForm.controls['user_id'].setValue(this.resultat_id);
 }
 
 }

        
    }
  
    
  



