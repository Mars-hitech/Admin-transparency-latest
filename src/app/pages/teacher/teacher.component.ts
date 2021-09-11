import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  teacherForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_teacher: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  tab1: any[];
  user_search: any[];
  inpt_search: string;
  resultat_id1: string;
  resultat1: string;
  inptShow1=false;
  dataTutors1: any;
  tab_or1: any;
  get_searc: any;
  get_searc_id: any;

  schools: any;
  tab2: any[];
  school_search: any[];
  inpt_search2: string;
  resultat_id2: string;
  resultat2: string;
  inptShow2=false;
  dataTutors2: any;
  tab_or2: any;
  get_searc2: any;
  get_searc_id2: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.User.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.users = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.api.School.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.schools = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.createForm(); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Teacher.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_teacher = event;
            
            this.teacherForm.controls['registration_number'].setValue(this.old_teacher.registration_number);
            this.teacherForm.controls['user_id'].setValue(this.old_teacher.user_id);
            this.teacherForm.controls['school_id'].setValue(this.old_teacher.school_id);
            this.teacherForm.controls['first_name'].setValue(this.old_teacher.first_name);
            this.teacherForm.controls['last_name'].setValue(this.old_teacher.last_name);
            this.teacherForm.controls['birth_date'].setValue(this.old_teacher.birth_date);
            this.teacherForm.controls['title'].setValue(this.old_teacher.title);

            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/teachers']);
  }

  save() {
    if (!(this.teacherForm.dirty && this.teacherForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.teacherForm.value;
      console.log(params);
      if (this.old_teacher) {
        this.api.Teacher.one(this.old_teacher.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/teachers']);
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
        this.api.Teacher
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/teachers']);
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
    this.teacherForm = this._formBuilder.group({

      registration_number: ['', Validators.required],
      user_id: ['', Validators.required],
      school_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      title: ['', Validators.required],

        
    });
  }





   //event onkey
   searchForm(){

    // console.log(this.students);
     this.user_search=[];
    this.tab1=[]; 
 
     for (let nb = 0; nb <this.users.length; nb++) {
      if(this.inpt_search!=""){
     
       if(this.users[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
         
         this.tab1.push(this.users[nb]);
         this.user_search=this.tab1;
       
       }
      }
       
   }
 
   
 
 
   
   }
   
   values = '';
 
 onKey1(event: any) { // without type info
   this.values = event.target.value ;
  
     
   if(this.values!=""){
     this.resultat1=event.target.value;
     this.inptShow1=true;
     this.inpt_search=this.values;
     
     console.log(this.inpt_search);
     this.searchForm();
     
   
   }else{
     
    this.dataTutors1=this.tab_or1;
     this.inptShow1=false;
     this.resultat1="";
     this.resultat_id1="";
   }
  
 }
 
 click_Show1(searc,searc_id){
   this.get_searc=searc;
   this.get_searc_id=searc_id;
 this.resultat1=this.get_searc;
 this.resultat_id1=this.get_searc_id;
 this.inptShow1=false;
 if(this.resultat_id1){
   this.teacherForm.controls['user_id'].setValue(this.resultat_id1);
 }
 
 }


    //event onkey
    searchForm2(){

      // console.log(this.students);
       this.school_search=[];
      this.tab2=[]; 
   
       for (let nb = 0; nb <this.schools.length; nb++) {
        if(this.inpt_search2!=""){
       
         if(this.schools[nb].name.toUpperCase().includes(this.inpt_search2.toUpperCase())===true){
           
           this.tab2.push(this.users[nb]);
           this.school_search=this.tab2;
         
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
     this.teacherForm.controls['school_id'].setValue(this.resultat_id2);
   }
   
   }

        
    }
  
