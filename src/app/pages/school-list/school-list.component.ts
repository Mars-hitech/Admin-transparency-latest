import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  schoolss: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.School.getList(
      {
        should_paginate: false,
        
      }).subscribe( schools => {
        this.data = schools;
    });
  }

  get schools(): any[] {
    return this.data
      .map((schools, i) => ({id: i + 1, ...schools}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createSchool() {
    this.router.navigate(['/pages/school-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, school: any) {
    this.schoolss = school;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/school-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/school-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this.schoolss);
    this.api.School.one(this.schoolss.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.schoolss.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}
