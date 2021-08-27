import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent {
  data = [];
  loading: boolean = false;
  selected_item: any;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Teacher.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
        _includes:'user,school'
      }).subscribe( teachers => {
        this.data = teachers;
    });
  }

  get teachers(): any[] {
    return this.data
      .map((teacher, i) => ({id: i + 1, ...teacher}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createTeacher() {
    this.router.navigate(['/pages/add-teacher'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, teacher: any) {
    this.selected_item = teacher;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-teacher/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Teacher.one(this.selected_item.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.selected_item.id);
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
  }
}
