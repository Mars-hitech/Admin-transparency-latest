import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-school-year-list',
  templateUrl: './school-year-list.component.html',
  styleUrls: ['./school-year-list.component.scss']
})
export class SchoolYearListComponent  {
  data = [];
  loading: boolean = false;
  page = 1;
  selected_item: any;
  pageSize = 10;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
      }).subscribe( school_years => {
        this.data = school_years;
    });
  }

  get school_years(): any[] {
    return this.data
      .map((school_years, i) => ({id: i + 1, ...school_years}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createSchoolYear() {
    this.router.navigate(['/pages/school-year-add'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, school_year: any) {
    this.selected_item = school_year;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_school_year: string) {
    this.router.navigate(['/pages/school-year-add/' + id_school_year], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/school-year-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.SchoolYear.one(this.selected_item.id + '')
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
