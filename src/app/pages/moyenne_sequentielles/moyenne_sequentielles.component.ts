import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-moyenne-sequentielles',
  templateUrl: './moyenne_sequentielles.component.html',
  styleUrls: ['./moyenne_sequentielles.component.scss'],
})
export class MoyenneSequentiellesComponent implements OnInit {

  moyenneForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  matieres: any[];
  sequences: any[];
  students: any[];
  moyenne_sequentielles: any[];
  associate_moyenne = {};

  constructor(private _formBuilder: FormBuilder, public router: Router,
              public api: ApiService, public httpClient: HttpClient, public renderer: Renderer) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
        this.school_year = data[0];
        console.log(data);
        // get classes
        this.api.Classe.getList(
          {
            should_paginate: false,
            school_id: this.currentUser.teacher.school.id,
          }).subscribe((classes) => {
          this.classes = classes;
          // get sequences
          this.api.Sequence.getList(
            {
              should_paginate: false,
              _sort: 'code',
            }).subscribe((sequences) => {
            this.sequences = sequences;
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
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/pages/moyenne_sequentielles']);
  }

  findStudents() {
    if (!(this.moyenneForm.dirty && this.moyenneForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      this.moyenne_sequentielles = [];
      this.associate_moyenne = {};
      const data = this.moyenneForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('classe_id', data.classe_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/enrolled_students',
        {headers: headers, params: params}).subscribe(
        (res) => {
          console.log(res);
          this.students = res;
          const ids = this.students.map(s => s.id);
          // find if there was already moyenne_sequentielles registered for this parameters
          this.api.MoyenneSequentielle.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              sequence_id: data.sequence_id,
              matiere_id: data.matiere_id,
              'student_id-in': ids.toString(),
              _includes: 'student',
            }).subscribe( moyenne_sequentielles => {
            this.moyenne_sequentielles = moyenne_sequentielles;
            for (let i = 0; i < this.moyenne_sequentielles.length; i++) {
              this.associate_moyenne[this.moyenne_sequentielles[i].student.registration_number]
                = this.moyenne_sequentielles[i].moyenne;
            }
            console.log(this.associate_moyenne);
            this.loading = false;
          });
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  saveNote(moyenne, student_id, indice) {
    console.log(moyenne);
    this.loading = true;
    const data = this.moyenneForm.value;
    // save moyenne
    console.log(data);
    const fd = new FormData();
    fd.append('school_year_id', this.school_year.id);
    fd.append('sequence_id', data.sequence_id);
    fd.append('matiere_id', data.matiere_id);
    fd.append('student_id', student_id);
    fd.append('moyenne', moyenne);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/save_moyenne_seq', fd, {headers: headers})
      .subscribe((res) => {
        console.log(res);
        this.loading = false;
        console.log(res);
        if (indice < this.students.length) {
          const element = this.renderer.selectRootElement('#moyenne_' + (indice + 1));
          setTimeout(() => element.focus(), 0);
        } else {
          const element = this.renderer.selectRootElement('#moyenne_1');
          setTimeout(() => element.focus(), 0);
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        const e_array = err.data.error.errors;
        const self = this;
        Object.keys(e_array).forEach(function(key, index) {
          self.errors.push(this[key][0]);
        }, e_array);
      },
    );
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.moyenneForm = this._formBuilder.group({
      classe_id: ['', Validators.required],
      sequence_id: ['', Validators.required],
      matiere_id: ['', Validators.required],
    });
  }

}
