import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-tuteurs-list',
  templateUrl: './tuteurs-list.component.html',
  styleUrls: ['./tuteurs-list.component.scss']
})
export class TuteursListComponent  {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  _tutor: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Tutor.getList(
      {
        should_paginate: false,
        _includes:'user'
      }).subscribe( tutors => {
        this.data = tutors;
    });
  }

  get tutors(): any[] {
    return this.data
      .map((tutors, i) => ({id: i + 1, ...tutors}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createTutor() {
    this.router.navigate(['/pages/tuteurs-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, tutor: any) {
    this._tutor = tutor;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/tuteurs-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/tuteurs-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this._tutor);
    this.api.Tutor.one(this._tutor.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this._tutor.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}

