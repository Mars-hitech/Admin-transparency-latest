import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss'],
})
export class SequenceComponent implements OnInit {

  sequenceForm: FormGroup;
  loading: boolean = false;
  errors = [];
  trimestres: any[];
  student: any;
  school_year: any;
  currentUser: any;
  old_sequence: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // get trimestres
    this.api.Trimestre.getList(
      {
        should_paginate: false,
      }).subscribe((trimestres) => {
      this.loading = false;
      this.trimestres = trimestres;
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    this.createForm();
    this.loading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Sequence.one(route_params.params.id)
          .get()
          .subscribe((sequence) => {
            console.log(sequence);
            this.old_sequence = sequence;
            this.sequenceForm.controls['code'].setValue(this.old_sequence.code);
            this.sequenceForm.controls['name'].setValue(this.old_sequence.name);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/sequences']);
  }

  save() {
    if (!(this.sequenceForm.dirty && this.sequenceForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.sequenceForm.value;
      console.log(params);
      if (this.old_sequence) {
        this.api.Sequence.one(this.old_sequence.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/sequences']);
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
        this.api.Sequence
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/sequences']);
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
    this.sequenceForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      trimestre_id: ['', Validators.required],
    });
  }

}
