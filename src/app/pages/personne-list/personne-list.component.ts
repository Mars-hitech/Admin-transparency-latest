import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.scss']
})
export class PersonneListComponent{
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  _person: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Person.getList(
      {
        should_paginate: false,
        _includes:'user'
      }).subscribe( persons => {
        this.data = persons;
    });
  }

  get persons(): any[] {
    return this.data
      .map((persons, i) => ({id: i + 1, ...persons}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createPerson() {
    this.router.navigate(['/pages/personne-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, person: any) {
    this._person = person;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/personne-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/personne-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this._person);
    this.api.Person.one(this._person.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this._person.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}
