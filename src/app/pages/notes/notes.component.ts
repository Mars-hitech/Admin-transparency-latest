import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  noteForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  classes: any[];
  matieres: any[];
  sequences: any[];
  assessment_types: any[];
  students: any[];
  notes: any[];
  associate_note = {};

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
      }, (error) => {
        console.log(error);
      });
    this.api.AssessnentType.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.assessment_types = data;
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
    this.router.navigate(['/pages/notes']);
  }

  findStudents() {
    if (!(this.noteForm.dirty && this.noteForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.noteForm.value;
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
          // find if there was already notes registered for this parameters
          this.api.Note.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              sequence_id: data.sequence_id,
              assessment_type_id: data.assessment_type_id,
              matiere_id: data.matiere_id,
              'student_id-in': ids.toString(),
              _includes: 'student',
            }).subscribe( notes => {
            this.notes = notes;
            for (let i = 0; i < this.notes.length; i++) {
              this.associate_note[this.notes[i].student.registration_number] = this.notes[i].note;
            }
            console.log(this.associate_note);
          });
          this.loading = false;
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  saveNote(note, student_id, indice) {
    console.log(note);
    this.loading = true;
    const data = this.noteForm.value;
    // save note
    console.log(data);
    const fd = new FormData();
    fd.append('school_year_id', this.school_year.id);
    fd.append('sequence_id', data.sequence_id);
    fd.append('matiere_id', data.matiere_id);
    fd.append('student_id', student_id);
    fd.append('assessment_type_id', data.assessment_type_id);
    fd.append('note', note);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/save_note', fd, {headers: headers}).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        console.log(res);
        if ((indice + 1) < this.students.length) {
          const element = this.renderer.selectRootElement('#note_' + (indice + 1));
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
    // this.api.Note
    //   .post({
    //     school_year_id: this.school_year.id,
    //     matiere_id: data.matiere_id,
    //     sequence_id: data.sequence_id,
    //     assessment_type_id: data.assessment_type_id,
    //     student_id: student_id,
    //     note: note,
    //   })
    //   .subscribe((result) => {
    //     this.loading = false;
    //     console.log(result);
    //     if ((indice + 1) < this.students.length) {
    //       const element = this.renderer.selectRootElement('#note_' + (indice + 1));
    //       setTimeout(() => element.focus(), 0);
    //     }
    //   }, (error) => {
    //     this.loading = false;
    //     console.log(error);
    //     const e_array = error.data.error.errors;
    //     const self = this;
    //     Object.keys(e_array).forEach(function(key, index) {
    //       self.errors.push(this[key][0]);
    //     }, e_array);
    //   });
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.noteForm = this._formBuilder.group({
      classe_id: ['', Validators.required],
      sequence_id: ['', Validators.required],
      assessment_type_id: ['', Validators.required],
      matiere_id: ['', Validators.required],
    });
  }

}
