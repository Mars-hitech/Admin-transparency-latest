import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-retards',
  templateUrl: './retards.component.html',
  styleUrls: ['./retards.component.scss'],
})
export class RetardsComponent {
  data = [];
  loading: boolean = false;
  selected_item: any;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.loading = true;
    this.api.Retard.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
        _includes: 'student,school_year',
      }).subscribe( retards => {
      this.data = [];
      console.log(retards)
      let i;
      for (i = 0; i < retards.length; i++) {
        if (retards[i].day != null)
          this.data.push(retards[i]);
      }
      this.loading = false;
    });
  }

  get retards(): any[] {
    return this.data
      .map((retard, i) => ({id: i + 1, ...retard}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createRetard() {
    this.router.navigate(['/pages/add-retard'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, retard: any) {
    this.selected_item = retard;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-retard/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Retard.one(this.selected_item.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.selected_item.id);
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
  }

  show(id_: string) {
    this.router.navigate(['/pages/retard-show/' + id_], {
      replaceUrl: true,
    });
  }


}
