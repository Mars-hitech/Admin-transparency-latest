import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {
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
  student_search: any[];
  students: any[];



  messageForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_message: any;
  chats: any;
  tab: any[];
  chat_search: any[];

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.ChatUser
    .getList({
      should_paginate: false,
      _includes:'user',
      _sortDir: 'desc',
    })
    .subscribe( chat => {

        this.chats = chat;
    });
    this.createForm();
    
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Message.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_message = event;
            this.messageForm.controls['body'].setValue(this.old_message.body);
            this.messageForm.controls['status'].setValue(this.old_message.status);
            this.messageForm.controls['type'].setValue(this.old_message.type);
            this.messageForm.controls['chat_user_id'].setValue(this.old_message.chat_user_id);
         

            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/news-list']);
  }

  save() {
    if (!(this.messageForm.dirty && this.messageForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.messageForm.value;
      console.log(params);
      if (this.old_message) {
        this.api.Message.one(this.old_message.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/message-list']);
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
        this.api.Message
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/message-list']);
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
    this.messageForm = this._formBuilder.group({
      status: ['', Validators.required],
      type: ['', Validators.required],
      chat_user_id: ['', Validators.required],
      body: ['', Validators.required],
   
    });
  }


      //event onkey
      searchForm(){

        // console.log(this.students);
         this.chat_search=[];
        this.tab=[]; 
     
         for (let nb = 0; nb <this.chats.length; nb++) {
          if(this.inpt_search!=""){
         
           if(this.chats[nb].user.full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
             
             this.tab.push(this.chats[nb]);
             this.chat_search=this.tab;
           
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
       console.log(this.resultat_id);
       this.messageForm.controls['chat_user_id'].setValue(this.resultat_id);
     }
     
     }

        
    }
  
    
  



