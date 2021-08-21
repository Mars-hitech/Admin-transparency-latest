import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss'],
})
export class MatiereComponent implements OnInit {

  matiereForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  old_matiere: any;

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
        this.api.Matiere.one(route_params.params.id)
          .get()
          .subscribe((sequence) => {
            console.log(sequence);
            this.old_matiere = sequence;
            this.matiereForm.controls['code'].setValue(this.old_matiere.code);
            this.matiereForm.controls['name'].setValue(this.old_matiere.name);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/matieres']);
  }

  save() {
    if (!(this.matiereForm.dirty && this.matiereForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.matiereForm.value;
      console.log(params);
      if (this.old_matiere) {
        this.api.Matiere.one(this.old_matiere.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/matieres']);
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
        this.api.Matiere
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/matieres']);
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
    this.matiereForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
