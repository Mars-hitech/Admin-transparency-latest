import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'ngx-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  data = [];
  selected_item: any;
  loading: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  dialog: NbDialogRef<any>;
  currentUser: any;
  classes: any[];
  school_year: any;

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
      this.school_year = data[0];
      // get classes
      this.api.Classe.getList(
        {
          should_paginate: false,
          school_id: this.currentUser.teacher.school.id,
        }).subscribe((classes) => {
        this.classes = classes;
        const ids = this.classes.map(c => c.id);
        this.api.Note.getList(
          {
            should_paginate: false,
            _includes: 'school_year,student,matiere,assessment_type,sequence',
          }).subscribe( inscrits => {
            this.data = [];
            console.log(inscrits.length)
            let i;
            for (i = 0; i < inscrits.length; i++) {
              if (inscrits[i].school_year != null)
                this.data.push(inscrits[i]);
            }
          this.loading = false;
        });
        }, (error) => {
          this.loading = false;
          console.log(error);
        });
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

  get notes(): any[] {
    return this.data
      .map((note, i) => ({id: i + 1, ...note}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createStudent() {
    this.router.navigate(['/pages/note-add'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, note: any) {
    this.selected_item = note;
    console.log(  this.selected_item);
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/note-add/' + id_], {
      replaceUrl: true,
    });
  }
  show(id_: string) {
    this.router.navigate(['/pages/note-show/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.loading = true;
    console.log(this.selected_item);
    this.api.Note.one(this.selected_item.id + '')
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