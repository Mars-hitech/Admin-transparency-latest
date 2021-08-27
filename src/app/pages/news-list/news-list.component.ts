import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent  {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  newsd: any;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.News.getList(
      {
        should_paginate: false,
        
      }).subscribe( news => {
        this.data = news;
    });
  }

  get news(): any[] {
    return this.data
      .map((news, i) => ({id: i + 1, ...news}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createNews() {
    this.router.navigate(['/pages/news-add'], {
      replaceUrl: true,
    });
  }



  open(dialog: TemplateRef<any>, news: any) {
    this.newsd = news;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }
  edit(id_: string) {
    this.router.navigate(['/pages/news-add/' + id_], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/news-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    console.log(this.newsd);
    this.api.News.one(this.newsd.id + '')
      .remove()
      .subscribe((data) => {
        this.data = this.data.filter(item => item.id !== this.newsd.id);
        this.loading = false;
        console.log(data);
      } , (error) => {
        console.log(error);
        this.loading = false;
      });
  }

  
}
