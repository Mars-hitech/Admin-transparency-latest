import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.scss'],
})
export class SequencesComponent {
  data = [];
  loading: boolean = false;
  selected_item: any;
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Sequence.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
   
      }).subscribe( sequences => {
        this.data = sequences;
    });
  }

  get sequences(): any[] {
    return this.data
      .map((sequence, i) => ({id: i + 1, ...sequence}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createSequence() {
    this.router.navigate(['/pages/add-sequence'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, sequence: any) {
    this.selected_item = sequence;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-sequence/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Sequence.one(this.selected_item.id + '')
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
