import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent{
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  _permission: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Permission.getList(
      {
        should_paginate: false,
    
      }).subscribe( permission => {
        this.data = permission;
    });
  }

  get permissions(): any[] {
    return this.data
      .map((permission, i) => ({id: i + 1, ...permission}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createPermission() {
    this.router.navigate(['pages/permission-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, permission: any) {
    this._permission = permission;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['pages/permission-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['pages/permission-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this._permission);
    this.api.Permission.one(this._permission.id + '')
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
