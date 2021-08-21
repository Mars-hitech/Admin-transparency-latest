import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-resultat-trimestrielles',
  templateUrl: './resultat_trimestrielles.component.html',
  styleUrls: ['./resultat_trimestrielles.component.scss'],
})
export class ResultatTrimestriellesComponent implements OnInit {

  resultatForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  trimestres: any[];
  students: any[];
  resultat_trimestrielles: any[];
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
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    this.createForm();
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/pages/resultat_trimestrielles']);
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
          // find if there was already resultat_trimestrielles registered for this parameters
          this.api.ResultatTrimestrielle.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              trimestre_id: data.trimestre_id,
              'student_id-in': ids.toString(),
              _includes: 'student',
            }).subscribe( resultat_trimestrielles => {
            this.resultat_trimestrielles = resultat_trimestrielles;
            this.associate_resultat = {};
            for (let i = 0; i < this.resultat_trimestrielles.length; i++) {
              this.associate_resultat[this.resultat_trimestrielles[i].student.registration_number]
                = this.resultat_trimestrielles[i];
            }
            console.log(this.associate_resultat);
            this.loading = false;
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
        .set('trimestre_id', data.trimestre_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/calcul_resultat_trim',
        {headers: headers, params: params}).subscribe(
        (resultat_trimestrielles) => {
          console.log(resultat_trimestrielles);
          this.resultat_trimestrielles = resultat_trimestrielles;
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
        .set('trimestre_id', data.trimestre_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/order_resultat_trim',
        {headers: headers, params: params}).subscribe(
        (resultat_trimestrielles) => {
          console.log(resultat_trimestrielles);
          this.resultat_trimestrielles = resultat_trimestrielles;
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
    fd.append('trimestre_id', data.trimestre_id);
    fd.append('student_id', student_id);
    fd.append('point', (<HTMLInputElement>document.getElementById('point_' + (indice))).value);
    fd.append('coef', (<HTMLInputElement>document.getElementById('coef_' + (indice))).value);
    fd.append('moyenne', moyenne);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/save_resultat_trim', fd, {headers: headers})
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
      trimestre_id: ['', Validators.required],
    });
  }

}
