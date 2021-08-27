import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss']
})
export class SchoolAddComponent implements OnInit {
  schoolForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_school: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.School.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_school = event;
            this.schoolForm.controls['name'].setValue(this.old_school.name);
            this.schoolForm.controls['address'].setValue(this.old_school.address);
            this.schoolForm.controls['postal_code'].setValue(this.old_school.postal_code);
            this.schoolForm.controls['phone_number'].setValue(this.old_school.phone_number);
            this.schoolForm.controls['principal'].setValue(this.old_school.principal);

           
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/school-list']);
  }

  save() {
    if (!(this.schoolForm.dirty && this.schoolForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.schoolForm.value;
      console.log(params);
      if (this.old_school) {
        this.api.School.one(this.old_school.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/school-list']);
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
        this.api.School
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/school-list']);
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
    this.schoolForm = this._formBuilder.group({


      name: ['', Validators.required],
      address: ['', Validators.required],
      postal_code: ['', Validators.required],
      phone_number: ['', Validators.required],
      principal: ['', Validators.required],

        
    });
  }


        
    }
  