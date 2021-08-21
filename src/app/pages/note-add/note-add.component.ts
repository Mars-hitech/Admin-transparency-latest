import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss']
})
export class NoteAddComponent implements OnInit {
  resultat:any;
  resultat_id:any;
  search:any;
  get_searc:any;
  get_searc_id:any;
  dataTutors: any=[];
  tab_or: any=[];
  inpt_search: any;
  inptShow=false;
  tutors:any[];
  student_search: any[];
  students: any[];



 noteForm: FormGroup;
  loading: boolean = false;
  user: any;
  errors = [];
  student: any;
  school_year: any;
  time_slots: any[];
  old_absent: any;
  tab: any[];
  tutors_search: any[];
  old_note: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
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
    }, (error) => {
      console.log(error);
    });
    this.api.Student.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.students = data;
      console.log(data);
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
        this.api.Note.one(route_params.params.id)
          .get({
            _includes: 'school_year,student,matiere,assessment_type,sequence',
        })
          .subscribe((notes) => {
            console.log(notes);
            this.old_note = notes;
            this.noteForm.controls['school_id'].setValue(this.old_note.student.school_id);
            this.noteForm.controls['student_id'].setValue(this.old_note.student.id);
            this.noteForm.controls['matiere_id'].setValue(this.old_note.matiere.id);
            this.noteForm.controls['sequence_id'].setValue(this.old_note.sequence.id);
            this.noteForm.controls['assessment_type_id'].setValue(this.old_note.assessment_type.id);
            this.noteForm.controls['note'].setValue(this.old_note.note.note);
            this.noteForm.controls['created_at'].setValue(this.old_note.created_at);
            this.noteForm.controls['updated_at'].setValue(this.old_note.updated_at);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/absences']);
  }

  save() {
   // const d = new Date(Date.parse(this.noteForm.get('day').value)).toISOString().split('T')[0];
    if (!(this.noteForm.dirty && this.noteForm.valid)) {
      const params = this.noteForm.value;
      console.log(params);
     // alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.noteForm.value;
      //params.day = d;
      // find student
      this.api.Student.getList(
        {
          should_paginate: false,
          registration_number: params.registration_number,
        }).subscribe((data) => {
        console.log(data);
        if (data.length > 0) {
          delete params.registration_number;
          this.student = data[0];
          params.student_id = this.student.id;
          params.school_year_id = this.school_year.id;
          console.log(params);
          if (this.old_note) {
            this.api.Note.one(this.old_note.id + '')
              .put(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/note-list']);
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
            this.api.Note
              .post(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/note-list']);
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
        } else {
          this.loading = false;
          console.log('we was not able to find student with this registration number');
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.noteForm = this._formBuilder.group({
      note: ['', Validators.required],
      school_year_id: ['', Validators.required],
      student_id: ['', Validators.required],
      matiere_id: ['', Validators.required],
      sequence_id: ['', Validators.required],
      assessment_type_id: ['', Validators.required],
    });
  }
/*
    //event onkey
    searchForm(){

     // console.log(this.students);
      this.student_search=[];
     this.tab=[]; 
  
      for (let nb = 0; nb <this.students.length; nb++) {
       if(this.inpt_search!=""){
      
        if(this.students[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
          
          this.tab.push(this.students[nb]);
          this.student_search=this.tab;
        
        }
       }
        
    }
  
    
  
  
    
    }
    
    values = '';
  
  onKey(event: any) { // without type info
    this.values = event.target.value ;
   
      
    if(this.values!=""){
      this.resultat=event.target.value;
      this.inptShow=true;
      this.inpt_search=this.values;
      
      console.log(this.inpt_search);
      this.searchForm();
      
    
    }else{
      
     this.dataTutors=this.tab_or;
      this.inptShow=false;
      this.resultat="";
      this.resultat_id="";
    }
   
  }
  
  click_Show(searc,searc_id){
    this.get_searc=searc;
    this.get_searc_id=searc_id;
  this.resultat=this.get_searc;
  this.resultat_id=this.get_searc_id;
  this.inptShow=false;
  if(this.resultat_id){
    this.noteForm.controls['registration_number'].setValue(this.resultat_id);
  }
  
  }*/
}
