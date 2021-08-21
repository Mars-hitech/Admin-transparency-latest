import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  selected_item: any;
  pageSize = 20;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Classe.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
      }).subscribe( classes => {
        this.data = classes;
    });
  }

  get classes(): any[] {
    return this.data
      .map((classe, i) => ({id: i + 1, ...classe}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createClasse() {
    this.router.navigate(['/pages/add-classe'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, classe: any) {
    this.selected_item = classe;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_classe: string) {
    this.router.navigate(['/pages/add-classe/' + id_classe], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.Classe.one(this.selected_item.id + '')
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
