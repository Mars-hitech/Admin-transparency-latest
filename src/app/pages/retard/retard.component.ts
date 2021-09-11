import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-retard',
  templateUrl: './retard.component.html',
  styleUrls: ['./retard.component.scss'],
})
export class RetardComponent implements OnInit {
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

  retardForm: FormGroup;
  loading: boolean = false;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  old_retard: any;
  tab: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {
    this.loading = true;
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
    this.createForm();
    this.loading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Retard.one(route_params.params.id)
          .get()
          .subscribe((retard) => {
            console.log(retard);
            this.old_retard = retard;
            this.retardForm.controls['student_id'].setValue(this.old_retard.student_id);
            this.retardForm.controls['arrived_at'].setValue(this.old_retard.arrived_at);
            this.retardForm.controls['school_year_id'].setValue(this.old_retard.school_year_id);
            this.retardForm.controls['day'].setValue(this.old_retard.day);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/retards']);
  }
  save() {
    //const d = new Date(Date.parse(this.retardForm.get('day').value)).toISOString().split('T')[0];
    const d = new Date(Date.parse(this.retardForm.get('day').value));
    d.setDate(d.getDate()+1);
    const f= new Date(d).toISOString().split('T')[0];

    // expected output: 1
    if (!(this.retardForm.dirty && this.retardForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.retardForm.value;
      
      params.day = f;
      console.log(params.day)
      params.arrived_at = this.datepipe.transform(params.day, 'yyyy-MM-dd') + ' '
        + params.arrived_at.hour + ':' + params.arrived_at.minute + ':00';
      console.log(params);
     
      if (this.old_retard) {
        this.api.Retard.one(this.old_retard.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/retards']);
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
        this.api.Retard
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/retards']);
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
    this.retardForm = this._formBuilder.group({
      student_id: [''],
      school_year_id: [''],
      arrived_at: [''],
      day: [''],
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
         console.log(this.values);
           
         if(this.values!=""){
           this.resultat=event.target.value;
           this.inptShow=true;
           this.inpt_search=this.values;
           
           
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
         this.retardForm.controls['student_id'].setValue(this.resultat_id);
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
  this.retardForm.controls['school_year_id'].setValue(this.resultat_id2);

}

}

}
