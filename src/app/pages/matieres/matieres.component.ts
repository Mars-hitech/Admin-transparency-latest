import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.scss'],
})
export class MatieresComponent {
  data = [];
  loading: boolean = false;
  selected_item: any;
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Matiere.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
      }).subscribe( matieres => {
        this.data = matieres;
    });
  }

  get matieres(): any[] {
    return this.data
      .map((matiere, i) => ({id: i + 1, ...matiere}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createMatiere() {
    this.router.navigate(['/pages/add-matiere'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, matiere: any) {
    this.selected_item = matiere;
    this.dialog = this.dialogService.open(dialog, { context: matiere });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-matiere/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Matiere.one(this.selected_item.id + '')
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
