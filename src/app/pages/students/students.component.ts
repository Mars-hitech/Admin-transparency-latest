import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
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
        this.api.Inscrit.getList(
          {
            should_paginate: false,
            school_year_id: this.school_year.id,
            'classe_id-in': ids.toString(),
            _includes: 'classe,student,school_year',
          }).subscribe( inscrits => {
           
          this.data = [];
          let i;
          for (i = 0; i < inscrits.length; i++) {
            if (inscrits[i])
           
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

  get students(): any[] {
    return this.data
      .map((student, i) => ({id: i + 1, ...student}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createStudent() {
    this.router.navigate(['/pages/add-student'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, inscrit: any) {
    this.selected_item = inscrit;
    console.log(this.selected_item);
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-student/' + id_], {
      replaceUrl: true,
    });
  }

   delete() {
    this.loading = true;
    console.log(this.selected_item.id);
    this.api.Student.one(this.selected_item.id + '')
      .remove()
      .subscribe((data) => {
        console.log(this.selected_item);
        this.data = this.data.filter(item => item.id !== this.selected_item.id);
        this.dialog.close();
        window.location.reload();
        this.loading = false;
      
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
  }
  show(id_: string) {
    this.router.navigate(['/pages/inscrit-show/' + id_], {
      replaceUrl: true,
    });
  }
}
