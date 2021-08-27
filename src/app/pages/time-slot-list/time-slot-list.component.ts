import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-time-slot-list',
  templateUrl: './time-slot-list.component.html',
  styleUrls: ['./time-slot-list.component.scss']
})
export class TimeSlotListComponent{
  data = [];
  loading: boolean = false;
  page = 1;
  selected_item: any;
  pageSize = 10;
  collectionSize = 0;
  dialog: NbDialogRef<any>;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.TimeSlot.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
      }
     ).subscribe( time_slots => {
        this.data = time_slots;
    });
  }

  get time_slots(): any[] {
    return this.data
      .map((time_slots, i) => ({id: i + 1, ...time_slots}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createTimeSlot() {
    this.router.navigate(['/pages/time-slot-add'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, time_slot: any) {
    this.selected_item = time_slot;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_time_slot: string) {
    this.router.navigate(['/pages/time-slot-add/' + id_time_slot], {
      replaceUrl: true,
    });
  }

  show(id_: string) {
    this.router.navigate(['/pages/time-slot-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.dialog.close();
    this.loading = true;
    this.api.TimeSlot.one(this.selected_item.id + '')
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
