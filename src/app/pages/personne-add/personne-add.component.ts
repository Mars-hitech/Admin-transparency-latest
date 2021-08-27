import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-personne-add',
  templateUrl: './personne-add.component.html',
  styleUrls: ['./personne-add.component.scss']
})
export class PersonneAddComponent implements OnInit {
  personForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_person: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.Person.getList(
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
        this.api.Person.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_person = event;
            this.personForm.controls['user_id'].setValue(this.old_person.user_id);
            this.personForm.controls['first_name'].setValue(this.old_person.first_name);
            this.personForm.controls['last_name'].setValue(this.old_person.last_name);
            this.personForm.controls['birth_date'].setValue(this.old_person.birth_date);
         
           
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/roles-list']);
  }

  save() {
    if (!(this.personForm.dirty && this.personForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.personForm.value;
      console.log(params);
      if (this.old_person) {
        this.api.Person.one(this.old_person.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/roles-list']);
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
        this.api.Person
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/roles-list']);
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
    this.personForm = this._formBuilder.group({


      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_id: ['', Validators.required],
     
 

        
    });
  }


        
    }
  