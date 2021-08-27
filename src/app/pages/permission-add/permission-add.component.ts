import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {
  permissionForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_permission: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
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
        this.api.Permission.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_permission = event;
            this.permissionForm.controls['name'].setValue(this.old_permission.name);
            this.permissionForm.controls['display_name'].setValue(this.old_permission.display_name);
            this.permissionForm.controls['description'].setValue(this.old_permission.description);

            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/permission-list']);
  }

  save() {
    if (!(this.permissionForm.dirty && this.permissionForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.permissionForm.value;
      console.log(params);
      if (this.old_permission) {
        this.api.Permission.one(this.old_permission.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/permission-list']);
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
        this.api.Permission
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/permission-list']);
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
    this.permissionForm = this._formBuilder.group({


      name: ['', Validators.required],
      display_name: ['', Validators.required],
      description: ['', Validators.required],
     
 

        
    });
  }


        
    }
  