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
        this.school_year = data[0];
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
          .get({
            _includes: 'students',
          })
          .subscribe((retard) => {
            console.log(retard);
            this.old_retard = retard;
            this.retardForm.controls['registration_number'].setValue(this.old_retard.student.registration_number);
            this.retardForm.controls['arrived_at'].setValue(this.old_retard.arrived_at);
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
    if (!(this.retardForm.dirty && this.retardForm.valid)) {
      //alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.retardForm.value;
      params.day = this.datepipe.transform(params.day, 'yyyy-MM-dd');
      params.arrived_at = this.datepipe.transform(params.day, 'yyyy-MM-dd') + ' '
        + params.arrived_at.hour + ':' + params.arrived_at.minute + ':00';
      console.log(params);
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
          params.school_year_id = this.school_year.id;
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
    this.retardForm = this._formBuilder.group({
      registration_number: [''],
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
         this.retardForm.controls['registration_number'].setValue(this.resultat_id);
       }
       
       }

}
