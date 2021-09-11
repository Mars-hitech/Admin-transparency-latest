import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-absent',
  templateUrl: './absent.component.html',
  styleUrls: ['./absent.component.scss'],
})
export class AbsentComponent implements OnInit {
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


  absentForm: FormGroup;
  loading: boolean = false;
  user: any;
  errors = [];
  student: any;

  time_slots: any[];
  old_absent: any;
  tab: any[];
  tutors_search: any[];
  school_year_search: any[];

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
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
    this.api.TimeSlot.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.time_slots = data;
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
        this.api.Absent.one(route_params.params.id)
          .get({
            _includes: 'student,time_slot',
        })
          .subscribe((absent) => {
            console.log(absent);
            this.old_absent = absent;
            this.absentForm.controls['registration_number'].setValue(this.old_absent.student.registration_number);
            this.absentForm.controls['time_slot_id'].setValue(this.old_absent.time_slot.id);
            this.absentForm.controls['school_year_id'].setValue(this.old_absent.school_year_id);
            this.absentForm.controls['day'].setValue(this.old_absent.day);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/absences']);
  }

  save() {
    const d = new Date(Date.parse(this.absentForm.get('day').value)).toISOString().split('T')[0];
    if (!(this.absentForm.dirty && this.absentForm.valid)) {
      const params = this.absentForm.value;
      console.log(params);
     // alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.absentForm.value;
      params.day = d;
      // find student
      this.api.Student.getList(
        {
          should_paginate: false,
          registration_number: params.registration_number,
        }).subscribe((data) => {
        console.log(data);
        if (data.length > 0) {
          delete params.registration_number;
          this.student = data[0];
          params.student_id = this.student.id;
        
          console.log(params);
          if (this.old_absent) {
            this.api.Absent.one(this.old_absent.id + '')
              .put(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/absences']);
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
            this.api.Absent
              .post(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/absences']);
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
        } else {
          this.loading = false;
          console.log('we was not able to find student with this registration number');
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.absentForm = this._formBuilder.group({
      registration_number: ['', Validators.required],
      time_slot_id: ['', Validators.required],
      school_year_id: ['', Validators.required],
      day: ['', Validators.required],
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
    this.absentForm.controls['registration_number'].setValue(this.resultat_id);
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
  this.absentForm.controls['school_year_id'].setValue(this.resultat_id2);

}

}
}
