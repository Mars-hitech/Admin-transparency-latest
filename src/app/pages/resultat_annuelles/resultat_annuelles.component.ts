import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-resultat-annuelles',
  templateUrl: './resultat_annuelles.component.html',
  styleUrls: ['./resultat_annuelles.component.scss'],
})
export class ResultatAnnuellesComponent implements OnInit {

  resultatForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  students: any[];
  resultat_annuelles: any[];
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
        this.loading = false;
        this.classes = classes;
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
    this.router.navigate(['/pages/resultat_annuelles']);
  }

  calculResultat() {
    if (!(this.resultatForm.dirty && this.resultatForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.resultatForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('classe_id', data.classe_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/calcul_resultat_ann',
        {headers: headers, params: params}).subscribe(
        (resultat_annuelles) => {
          console.log(resultat_annuelles);
          this.resultat_annuelles = resultat_annuelles;
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
        .set('classe_id', data.classe_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/order_resultat_ann',
        {headers: headers, params: params}).subscribe(
        (resultat_annuelles) => {
          console.log(resultat_annuelles);
          this.resultat_annuelles = resultat_annuelles;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        },
      );
    }
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
          // find if there was already resultat_annuelles registered for this parameters
          this.api.ResultatAnnuelle.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              'student_id-in': ids.toString(),
              _includes: 'student',
            }).subscribe( resultat_annuelles => {
            this.resultat_annuelles = resultat_annuelles;
            this.associate_resultat = {};
            for (let i = 0; i < this.resultat_annuelles.length; i++) {
              this.associate_resultat[this.resultat_annuelles[i].student.registration_number]
                = this.resultat_annuelles[i];
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
    fd.append('student_id', student_id);
    fd.append('point', (<HTMLInputElement>document.getElementById('point_' + (indice))).value);
    fd.append('coef', (<HTMLInputElement>document.getElementById('coef_' + (indice))).value);
    fd.append('moyenne', moyenne);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/save_resultat_ann', fd, {headers: headers})
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
    });
  }

}
