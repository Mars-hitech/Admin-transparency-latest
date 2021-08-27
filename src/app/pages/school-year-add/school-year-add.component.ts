import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-school-year-add',
  templateUrl: './school-year-add.component.html',
  styleUrls: ['./school-year-add.component.scss']
})
export class SchoolYearAddComponent implements OnInit {

  resultat:any;
  resultat_id:any;
  search:any;
  get_searc:any;
  get_searc_id:any;
  dataTutors: any=[];
  tab_or: any=[];
  inpt_search: any;
  inptShow=false;
  tutors:any[];
 school_search: any[];
  students: any[];


  SchoolYearForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  old_school_year: any;
  schools: any;

  tab: any[];

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
        this.api.SchoolYear.one(route_params.params.id)
          .get()
          .subscribe((school_year) => {
            console.log(school_year);
            this.old_school_year = school_year;
            this.SchoolYearForm.controls['from_year'].setValue(this.old_school_year.from_year);
            this.SchoolYearForm.controls['to_year'].setValue(this.old_school_year.to_year);
            this.SchoolYearForm.controls['status'].setValue(this.old_school_year.status);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/school-year-list']);
  }

  save() {
    if (!(this.SchoolYearForm.dirty && this.SchoolYearForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.SchoolYearForm.value;
    
      console.log(params);
      if (this.old_school_year) {
        this.api.SchoolYear.one(this.old_school_year.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/school-year-list']);
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
        this.api.SchoolYear
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/school-year-list']);
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
    this.SchoolYearForm = this._formBuilder.group({
      from_year: ['', Validators.required],
      to_year: ['', Validators.required],
      status: ['', Validators.required],
    });
  }


}
