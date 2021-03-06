import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {

  programForm: FormGroup;
  loading: boolean = false;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  time_slots: any[];
  classes: any[];
  matieres: any[];
  teachers: any[];
  old_program: any;

  constructor(private _formBuilder: FormBuilder, public router: Router,private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
        this.school_year = data[0];
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    this.api.TimeSlot.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.time_slots = data;
      console.log(data);
      // get classes
      this.api.Classe.getList(
        {
          should_paginate: false,
        }).subscribe((classes) => {
        this.classes = classes;

        // get teachers
        this.api.Teacher.getList(
          {
            should_paginate: false,
          }).subscribe((teachers) => {
          this.teachers = teachers;

          // get matieres
          this.api.Matiere.getList(
            {
              should_paginate: false,
            }).subscribe((matieres) => {
            this.loading = false;
            this.matieres = matieres;
          }, (error) => {
            console.log(error);
          });
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
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
        this.api.Program.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_program = event;
           
            this.programForm.controls['classe_id'].setValue(this.old_program.classe_id);
            this.programForm.controls['matiere_id'].setValue(this.old_program.matiere_id);
            this.programForm.controls['teacher_id'].setValue(this.old_program.teacher_id);
            this.programForm.controls['time_slot_id'].setValue(this.old_program.time_slot_id);
            this.programForm.controls['coef'].setValue(this.old_program.coef);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/programs']);
  }

  save() {
    if (!(this.programForm.dirty && this.programForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.programForm.value;
      params.school_year_id = this.school_year.id;
      console.log(params);
      this.api.Program
        .post(params)
        .subscribe((result) => {
          this.loading = false;
          console.log(result);
          this.router.navigate(['/pages/programs']);
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

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.programForm = this._formBuilder.group({
      classe_id: ['', Validators.required],
      matiere_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      time_slot_id: ['', Validators.required],
      coef: ['', Validators.required],
    });
  }

}
