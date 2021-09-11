import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'ngx-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.scss']
})
export class StudentsAddComponent  {
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



  studentForm: FormGroup;
  loading: boolean = false;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  time_slots: any[];
  old_absent: any;
  tab: any[];
  tutors_search: any[];
  old_student: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
      this.school_year = data[0];
      this.api.Tutor.getList(
        {
          should_paginate: false,
         
        }).subscribe((tutors) => {
        this.tutors = tutors;
        this.loading = false;
        console.log(tutors);
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, (error) => {
      this.loading = false;
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
        this.api.Student.one(route_params.params.id)
          .get()
          .subscribe((student) => {
            console.log(student);
            this.old_student = student;
            this.studentForm.controls['registration_number'].setValue(this.old_student.registration_number);
            this.studentForm.controls['first_name'].setValue(this.old_student.first_name);
            this.studentForm.controls['last_name'].setValue(this.old_student.last_name);
            this.studentForm.controls['gender'].setValue(this.old_student.gender);
            this.studentForm.controls['birth_date'].setValue(this.old_student.birth_date);
            this.studentForm.controls['birth_place'].setValue(this.old_student.birth_place);
            this.studentForm.controls['tutor_id'].setValue(this.old_student.tutor_id);
            this.studentForm.controls['tutor_phone_number'].setValue(this.old_student.tutor_phone_number);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/students-list']);
  }

  save() {
    if (!(this.studentForm.dirty && this.studentForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.studentForm.value;
      console.log(params);
      if (this.old_student) {
        this.api.Student.one(this.old_student.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/students-list']);
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
        this.api.Student
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/students-list']);
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
    this.studentForm = this._formBuilder.group({
      registration_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      birth_place: ['', Validators.required],
      birth_date: ['', Validators.required],
      tutor_phone_number: ['', Validators.required],
      tutor_id: ['', Validators.required],
      
    
    });
  }
  //event onkey
  searchForm(){

    console.log(this.tutors);
    this.tutors_search=[];
   this.tab=[]; 

    for (let nb = 0; nb <this.tutors.length; nb++) {
     if(this.inpt_search!=""){
    
      if(this.tutors[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
        
        this.tab.push(this.tutors[nb]);
        this.tutors_search=this.tab;
      
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
  this.studentForm.controls['tutor_id'].setValue(this.resultat_id);
 
}

}
}
