import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-permission-role-add',
  templateUrl: './permission-role-add.component.html',
  styleUrls: ['./permission-role-add.component.scss']
})
export class PermissionRoleAddComponent implements OnInit {
  permissionRoleForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_permission_role: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  permission_roles: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.PermissionRole.getList(
      {
        should_paginate: false,
       
      }).subscribe((data) => {
      this.permission_roles = data;
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
        this.api.PermissionRole.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_permission_role = event;
            this.permissionRoleForm.controls['role_id'].setValue(this.old_permission_role.role_id);
            this.permissionRoleForm.controls['permission_id'].setValue(this.old_permission_role.permission_id);
        
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/permission-role-list']);
  }

  save() {
    if (!(this.permissionRoleForm.dirty && this.permissionRoleForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
      this.loading = true;
      const params = this.permissionRoleForm.value;
      console.log(params);
      if (this.old_permission_role) {
        this.api.PermissionRole.one(this.old_permission_role.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/permission-role-list']);
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
        this.api.PermissionRole
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/permission-role-list']);
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
    this.permissionRoleForm = this._formBuilder.group({


      permission_id: ['', Validators.required],
      role_id: ['', Validators.required],
    
    });
  }


        
    }
  