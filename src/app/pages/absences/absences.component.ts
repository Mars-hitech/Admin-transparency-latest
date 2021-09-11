import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  selected_item: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.loading = true;
    this.api.Absent.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
        _includes: 'student,time_slot,school_year',
      }).subscribe( absents => {
      this.data = [];
      let i;
     
      for (i = 0; i < absents.length; i++) {
       
        if (absents[i].time_slot)
          this.data.push(absents[i]);

      }
      this.loading = false;
      console.log(this.data);
    });
  }

  get absents(): any[] {
    return this.data
      .map((school_year, i) => ({id: i + 1, ...school_year}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createAbsent() {
    this.router.navigate(['/pages/add-absent'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, absent: any) {
    this.selected_item = absent;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  show(id_: string) {
    this.router.navigate(['/pages/absent-show/' + id_], {
      replaceUrl: true,
    });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-absent/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.loading = true;
    this.api.Absent.one(this.selected_item.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.selected_item.id);
        this.dialog.close();
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
  }

  
}
