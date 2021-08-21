import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-moyenne-trimestrielles',
  templateUrl: './moyenne_trimestrielles.component.html',
  styleUrls: ['./moyenne_trimestrielles.component.scss'],
})
export class MoyenneTrimestriellesComponent implements OnInit {

  moyenneForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  matieres: any[];
  trimestres: any[];
  students: any[];
  moyenne_trimestrielles: any[];
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
        // get trimestres
        this.api.Trimestre.getList(
          {
            should_paginate: false,
          }).subscribe((trimestres) => {
          this.trimestres = trimestres;
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
    this.router.navigate(['/pages/moyenne_trimestrielles']);
  }

  findStudents() {
    if (!(this.moyenneForm.dirty && this.moyenneForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.moyenneForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('matiere_id', data.matiere_id)
        .set('classe_id', data.classe_id)
        .set('trimestre_id', data.trimestre_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/calcul_moyenne_trim',
        {headers: headers, params: params}).subscribe(
        (moyenne_trimestrielles) => {
          console.log(moyenne_trimestrielles);
          this.moyenne_trimestrielles = moyenne_trimestrielles;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        },
      );
    }
  }

  orderMoyenne() {
    if (!(this.moyenneForm.dirty && this.moyenneForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.moyenneForm.value;
      const params = new HttpParams().set('school_year_id', this.school_year.id)
        .set('matiere_id', data.matiere_id)
        .set('classe_id', data.classe_id)
        .set('trimestre_id', data.trimestre_id);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.get<any>(AppComponent.BASE_URL.apiEndpoint + '/order_moyenne_trim',
        {headers: headers, params: params}).subscribe(
        (moyenne_trimestrielles) => {
          console.log(moyenne_trimestrielles);
          this.moyenne_trimestrielles = moyenne_trimestrielles;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        },
      );
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.moyenneForm = this._formBuilder.group({
      classe_id: ['', Validators.required],
      trimestre_id: ['', Validators.required],
      matiere_id: ['', Validators.required],
    });
  }

}
