import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss'],
})
export class ClasseComponent implements OnInit {

  classeForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  old_classe: any;

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
        this.api.Classe.one(route_params.params.id)
          .get()
          .subscribe((classe) => {
            console.log(classe);
            this.old_classe = classe;
            this.classeForm.controls['code'].setValue(this.old_classe.code);
            this.classeForm.controls['name'].setValue(this.old_classe.name);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/classes']);
  }

  save() {
    if (!(this.classeForm.dirty && this.classeForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.classeForm.value;
      params.school_id = this.currentUser.teacher.school.id;
      console.log(params);
      if (this.old_classe) {
        this.api.Classe.one(this.old_classe.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/classes']);
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
        this.api.Classe
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/classes']);
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
    this.classeForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
