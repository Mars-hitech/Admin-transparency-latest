import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  selected_item: any;
  pageSize = 20;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Program.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
        _includes: 'classe,matiere,teacher,time_slot,school_year',
      }).subscribe( programs => {
        this.data = programs;
    });
  }

  get programs(): any[] {
    return this.data
      .map((program, i) => ({id: i + 1, ...program}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createProgram() {
    this.router.navigate(['/pages/add-program'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, program: any) {
    this.selected_item = program;
    this.dialog = this.dialogService.open(dialog, { context: program });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Program.one(this.selected_item.id + '')
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
