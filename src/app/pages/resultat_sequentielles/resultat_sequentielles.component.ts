import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-resultat-sequentielles',
  templateUrl: './resultat_sequentielles.component.html',
  styleUrls: ['./resultat_sequentielles.component.scss'],
})
export class ResultatSequentiellesComponent implements OnInit {

  resultatForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  sequences: any[];
  students: any[];
  resultat_sequentielles: any[];
  associate_resultat = {};

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
          }).subscribe((sequences) => {
          this.sequences = sequences;
          this.loading = false;
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.createForm();
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/pages/resultat_sequentielles']);
  }

  findStudents() {
    if (!(this.resultatForm.dirty && this.resultatForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.resultatForm.value;
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
          // find if there was already resultat_sequentielles registered for this parameters
          this.api.ResultatSequentielle.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              sequence_id: data.sequence_id,
              'student_id-in': ids.toString(),
              _includes: 'student',
            }).subscribe( resultat_sequentielles => {
            this.resultat_sequentielles = resultat_sequentielles;
            this.associate_resultat = {};
            for (let i = 0; i < this.resultat_sequentielles.length; i++) {
              this.associate_resultat[this.resultat_sequentielles[i].student.registration_number]
                = this.resultat_sequentielles[i];
            }
            this.loading = false;
            console.log(this.associate_resultat);
          });
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  calculResultat() {
    if (!(this.resultatForm.dirty && this.resultatForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.resultatForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('classe_id', data.classe_id)
        .set('sequence_id', data.sequence_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/calcul_resultat_seq',
        {headers: headers, params: params}).subscribe(
        (resultat_sequentiels) => {
          console.log(resultat_sequentiels);
          this.resultat_sequentielles = resultat_sequentiels;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        },
      );
    }
  }

  orderResultat() {
    if (!(this.resultatForm.dirty && this.resultatForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.resultatForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('classe_id', data.classe_id)
        .set('sequence_id', data.sequence_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/order_resultat_seq',
        {headers: headers, params: params}).subscribe(
        (resultat_sequentiels) => {
          console.log(resultat_sequentiels);
          this.resultat_sequentielles = resultat_sequentiels;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        },
      );
    }
  }

  gotoCoef(indice) {
    console.log((<HTMLInputElement>document.getElementById('point_' + (indice))).value);
    const element = this.renderer.selectRootElement('#coef_' + (indice));
    setTimeout(() => element.focus(), 0);
  }

  gotoMoyenne(indice) {
    console.log((<HTMLInputElement>document.getElementById('coef_' + (indice))).value);
    const element = this.renderer.selectRootElement('#resultat_' + (indice));
    setTimeout(() => element.focus(), 0);
  }

  saveNote(moyenne, student_id, indice) {
    console.log(moyenne);
    this.loading = true;
    const data = this.resultatForm.value;
    // save resultat
    console.log(data);
    const fd = new FormData();
    fd.append('school_year_id', this.school_year.id);
    fd.append('sequence_id', data.sequence_id);
    fd.append('student_id', student_id);
    fd.append('point', (<HTMLInputElement>document.getElementById('point_' + (indice))).value);
    fd.append('coef', (<HTMLInputElement>document.getElementById('coef_' + (indice))).value);
    fd.append('moyenne', moyenne);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/save_resultat_seq', fd, {headers: headers})
      .subscribe((res) => {
          console.log(res);
          this.loading = false;
          console.log(res);
          if (indice < this.students.length) {
            const element = this.renderer.selectRootElement('#point_' + (indice + 1));
            setTimeout(() => element.focus(), 0);
          } else {
            const element = this.renderer.selectRootElement('#point_1');
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
    this.resultatForm = this._formBuilder.group({
      classe_id: ['', Validators.required],
      sequence_id: ['', Validators.required],
    });
  }
}
