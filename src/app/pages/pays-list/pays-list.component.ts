import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-pays-list',
  templateUrl: './pays-list.component.html',
  styleUrls: ['./pays-list.component.scss']
})
export class PaysListComponent{
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  countriess: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.Country.getList(
      {
        should_paginate: false,
        
      }).subscribe( contries => {
        this.data = contries;
    });
  }

  get countries(): any[] {
    return this.data
      .map((countries, i) => ({id: i + 1, ...countries}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createCountry() {
    this.router.navigate(['/pages/pays-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, countries: any) {
    this.countriess = countries;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/pays-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/pays-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this.countries);
    this.api.Country.one(this.countriess.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.countriess.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }
 
  
}
