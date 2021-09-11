import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
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
  student_search2: any[];
  school_years: any[];
  tab2: any[];
  school_year_search2: any[];


  resultat3:any;
  resultat_id3:any;
  search3:any;
  get_searc3:any;
  get_searc_id3:any;
  dataTutors3: any=[];
  tab_or3: any=[];
  inpt_search3: any;
  inptShow3=false;
  tutors3:any[];
  student_search3: any[];

  tab3: any[];
  classe_search: any[];



  inscritForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_inscrit: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
        this.school_years = data;
        console.log(data);
      }, (error) => {
        console.log(error);
      });
      this.api.Student.getList(
        {
          should_paginate: false,
        }).subscribe((data) => {
        this.students = data;
        console.log(data);
      }, (error) => {
        console.log(error);
      });
      this.api.Classe.getList(
        {
          should_paginate: false,
        }).subscribe((data) => {
        this.classes = data;
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
        this.api.Inscrit.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_inscrit = event;
            this.inscritForm.controls['school_year_id'].setValue(this.old_inscrit.school_year_id);
            this.inscritForm.controls['student_id'].setValue(this.old_inscrit.student_id);
            this.inscritForm.controls['classe_id'].setValue(this.old_inscrit.classe_id);

            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/students']);
  }

  save() {
    if (!(this.inscritForm.dirty && this.inscritForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.inscritForm.value;
      console.log(params);
      if (this.old_inscrit) {
        this.api.Inscrit.one(this.old_inscrit.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/students']);
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
        this.api.Inscrit
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/students']);
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
    this.inscritForm = this._formBuilder.group({


      student_id: ['', Validators.required],
      classe_id: ['', Validators.required],
      school_year_id: ['', Validators.required],
     
 

        
    });
  }



      //event onkey
      searchForm(){

        // console.log(this.students);
         this.student_search=[];
        this.tab=[]; 
     
         for (let nb = 0; nb <this.students.length; nb++) {
          if(this.inpt_search!=""){
         
           if(this.students[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
             
             this.tab.push(this.students[nb]);
             this.student_search=this.tab;
           
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
       this.inscritForm.controls['student_id'].setValue(this.resultat_id);
     }
     
     }
   
   
   
   
   
   
   
   
   //event onkey
   searchForm2(){
   
     // console.log(this.students);
      this.school_year_search2=[];
     this.tab2=[]; 
      
      for (let nb = 0; nb <this.school_years.length; nb++) {
       if(this.inpt_search2!=""){
         
        if(this.school_years[nb].from_year.toString().includes(this.inpt_search2.toString())===true){
         console.log(this.school_years[nb].from_year);
          this.tab2.push(this.school_years[nb]);
          this.school_year_search2=this.tab2;
        
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
     this.inscritForm.controls['school_year_id'].setValue(this.resultat_id2);
   
   }
   
   }


      //event onkey
      searchForm3(){
   
        // console.log(this.students);
         this.classe_search=[];
        this.tab3=[]; 
         
         for (let nb = 0; nb <this.classes.length; nb++) {
          if(this.inpt_search3!=""){
            
            if(this.classes[nb].name.toUpperCase().includes(this.inpt_search3.toUpperCase())===true){
             
              this.tab3.push(this.classes[nb]);
              this.classe_search=this.tab3;
            
            }
          }
           
       }
       }
       
       values3 = '';
      onKey3(event: any) { // without type info
      this.values3 = event.target.value ;
      
      
      if(this.values3!=""){
      this.resultat3=event.target.value;
      this.inptShow3=true;
      this.inpt_search3=this.values3;
      
      console.log(this.inpt_search3);
      this.searchForm3();
      
      
      }else{
      
      this.dataTutors3=this.tab_or3;
      this.inptShow3=false;
      this.resultat3="";
      this.resultat_id3="";
      }
      
      }
      
      click_Show3(searc,searc_id){
      this.get_searc3=searc;
      this.get_searc_id3=searc_id;
      this.resultat3=this.get_searc3;
      this.resultat_id3=this.get_searc_id3;
      this.inptShow3=false;
      if(this.resultat_id3){
        this.inscritForm.controls['classe_id'].setValue(this.resultat_id3);
      
      }
      
      }
        
    }
  
