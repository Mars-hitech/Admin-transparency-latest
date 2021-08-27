import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-tuteurs-add',
  templateUrl: './tuteurs-add.component.html',
  styleUrls: ['./tuteurs-add.component.scss']
})
export class TuteursAddComponent implements OnInit {
  tutorForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_tutor: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
    this.createForm();
    
    
  }

  ngOnInit() {

    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Tutor.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_tutor = event;
            this.tutorForm.controls['user_id'].setValue(this.old_tutor.user_id);
            this.tutorForm.controls['first_name'].setValue(this.old_tutor.first_name);
            this.tutorForm.controls['last_name'].setValue(this.old_tutor.last_name);
            this.tutorForm.controls['address'].setValue(this.old_tutor.address);
         
           
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/tuteurs-list']);
  }

  save() {
    if (!(this.tutorForm.dirty && this.tutorForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.tutorForm.value;
      console.log(params);
      if (this.old_tutor) {
        console.log(this.old_tutor.id)
        this.api.Tutor.one(this.old_tutor.id + '')
          .put(params)
          .subscribe((result) => {
            console.log(result);
            this.loading = false;
            
            this.router.navigate(['/pages/tuteurs-list']);
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
        console.log('sav')
        this.api.Tutor
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/tuteurs-list']);
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
    this.tutorForm = this._formBuilder.group({


      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_id: [''],
      address: ['', Validators.required],
     
 

        
    });
  }


        
    }
  