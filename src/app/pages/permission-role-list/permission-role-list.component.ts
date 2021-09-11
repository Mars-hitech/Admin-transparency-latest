import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-permission-role-list',
  templateUrl: './permission-role-list.component.html',
  styleUrls: ['./permission-role-list.component.scss']
})
export class PermissionRoleListComponent {

    data = [];
    loading: boolean = false;
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    _permission: any;
    dialog: NbDialogRef<any>;
  
    constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
      this.api.PermissionRole.getList(
        {
          should_paginate: false,
          _includes:'permission,role'
      
        }).subscribe( permission_role => {
          this.data = permission_role;
      });
    }
  
    get permission_roles(): any[] {
      return this.data
        .map((permission_role, i) => ({id: i + 1, ...permission_role}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  
    openInNewTab(url) {
      const win = window.open(url, '_blank');
      win.focus();
    }
  
    createPermissionRole() {
      this.router.navigate(['pages/permission-role-add'], {
        replaceUrl: true,
      });
    }
  
  
  
    open(dialog: TemplateRef<any>, permission_role: any) {
     
      this._permission = permission_role;
      this.dialog = this.dialogService.open(dialog, { context: status });
    }
    edit(id_: string) {
      this.router.navigate(['pages/permission-role-add/' + id_], {
        replaceUrl: true,
      });
    }
  
    show(id_: string) {
      this.router.navigate(['pages/permission-role-show/' + id_], {
        replaceUrl: true,
      });
    }
  
    delete() {
      this.dialog.close();
      this.loading = true;
      console.log(this._permission);
      this.api.PermissionRole.one(this._permission.id + '')
        .remove()
        .subscribe((data) => {
          this.data = this.data.filter(item => item.id !== this._permission.id);
          this.loading = false;
          console.log(data);
        } , (error) => {
          console.log(error);
          this.loading = false;
        });
    }
   
    
  }