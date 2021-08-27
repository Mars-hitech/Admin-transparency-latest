import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_user: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
        this.api.User.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_user = event;
            this.userForm.controls['email'].setValue(this.old_user.email);
            this.userForm.controls['phone_number'].setValue(this.old_user.phone_number);
            this.userForm.controls['is_active'].setValue(this.old_user.is_active);
            this.userForm.controls['password'].setValue(this.old_user.password);
            this.userForm.controls['pin_code'].setValue(this.old_user.pin_code);
            this.userForm.controls['reglage'].setValue(this.old_user.reglage);
           
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/user-list']);
  }

  save() {
    if (!(this.userForm.dirty && this.userForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.userForm.value;
      console.log(params);
      if (this.old_user) {
        this.api.User.one(this.old_user.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/user-list']);
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
        this.api.User
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/user-list']);
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
    this.userForm = this._formBuilder.group({


      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      is_active: ['', Validators.required],
      password: ['', Validators.required],
      pin_code: ['', Validators.required],
      reglage: ['', Validators.required],

        
    });
  }


        
    }
  