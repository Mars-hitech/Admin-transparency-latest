import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  notification: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Event.getList(
      {
        should_paginate: false,
        _includes: 'concern',
        _sortDir: 'desc',
      }).subscribe( notifications => {
        this.data = notifications;
    });
  }

  get notifications(): any[] {
    return this.data
      .map((notification, i) => ({id: i + 1, ...notification}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createNotification() {
    this.router.navigate(['/pages/add-notification'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, evenement: any) {
    this.notification = evenement;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/add-notification/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/notification-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this.notification);
    this.api.Event.one(this.notification.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.notification.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }

  
}
