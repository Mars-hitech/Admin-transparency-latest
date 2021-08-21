import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-assessment-type',
  templateUrl: './assessment_type.component.html',
  styleUrls: ['./assessment_type.component.scss'],
})
export class AssessmentTypeComponent implements OnInit {

  assessment_typeForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  old_assessment_type: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    this.loading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.AssessmentType.one(route_params.params.id)
          .get()
          .subscribe((assessment_type) => {
            console.log(assessment_type);
            this.old_assessment_type = assessment_type;
            this.assessment_typeForm.controls['code'].setValue(this.old_assessment_type.code);
            this.assessment_typeForm.controls['name'].setValue(this.old_assessment_type.name);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/assessment_types']);
  }

  save() {
    if (!(this.assessment_typeForm.dirty && this.assessment_typeForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.assessment_typeForm.value;
      console.log(params);
      if (this.old_assessment_type) {
        this.api.AssessmentType.one(this.old_assessment_type.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/assessment_types']);
          }, (error) => {
            this.loading = false;
            console.log(error);
            const e_array = error.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function(key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      } else {
        this.api.AssessmentType
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/assessment_types']);
          }, (error) => {
            this.loading = false;
            console.log(error);
            const e_array = error.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function(key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      }
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.assessment_typeForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
