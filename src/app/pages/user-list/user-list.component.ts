import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  _users: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.User.getList(
      {
        should_paginate: false,
        
      }).subscribe( users => {
        this.data = users;
    });
  }

  get users(): any[] {
    return this.data
      .map((users, i) => ({id: i + 1, ...users}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createUser() {
    this.router.navigate(['/pages/user-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, user: any) {
    this._users = user;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/user-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/user-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this._users);
    this.api.User.one(this._users.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this._users.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}
