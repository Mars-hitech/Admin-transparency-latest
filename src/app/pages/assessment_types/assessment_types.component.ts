import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-assessment-types',
  templateUrl: './assessment_types.component.html',
  styleUrls: ['./assessment_types.component.scss'],
})
export class AssessmentTypesComponent {
  data = [];
  loading: boolean = false;
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  dialog: NbDialogRef<any>;
  selected_item: any; 

  constructor(private router: Router, private dialogService: NbDialogService, public api: ApiService) {
    this.api.AssessmentType.getList(
      {
        should_paginate: false,
        _sortDir: 'desc',
      }).subscribe( assessment_types => {
        this.data = assessment_types;
    });
  }

  get assessment_types(): any[] {
    return this.data
      .map((assessment_type, i) => ({id: i + 1, ...assessment_type}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  createAssessmentType() {
    this.router.navigate(['/pages/add-assessment_type'], {
      replaceUrl: true,
    });
  }

  open(dialog: TemplateRef<any>, assessmentType: any) {
    this.selected_item = assessmentType;
    this.dialog = this.dialogService.open(dialog, { context: status });
  }

  edit(id_: string) {
    this.router.navigate(['/pages/add-assessment_type/' + id_], {
      replaceUrl: true,
    });
  }

  delete() {
    this.loading = true;
    this.api.AssessmentType.one(this.selected_item.id + '')
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
