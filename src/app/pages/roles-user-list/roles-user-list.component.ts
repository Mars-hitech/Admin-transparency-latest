import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-roles-user-list',
  templateUrl: './roles-user-list.component.html',
  styleUrls: ['./roles-user-list.component.scss']
})
export class RolesUserListComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  _role_user: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.RoleUser.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
        _includes:'user,role'
      }).subscribe( teachers => {
        this.data = teachers;
    });
  }

  get role_users(): any[] {
    return this.data
      .map((role_user, i) => ({id: i + 1, ...role_user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createRoles() {
    this.router.navigate(['pages/roles-user-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, role: any) {
    this._role_user = role;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['pages/roles-user-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['pages/roles-user-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this._role_user);
    this.api.RoleUser.one(this._role_user.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this._role_user.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}