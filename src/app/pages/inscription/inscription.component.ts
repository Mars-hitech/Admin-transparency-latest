import {Component, OnInit, Renderer} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'ngx-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
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

  
  inscriptionForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  user: any;
  inscrit: any;
  errors = [];
  student: any = null;
  school_year: any;
  classes: any[];
  tab: any[];

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
        this.loading = false;
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, (error) => {
      this.loading = false;
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
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/pages/students']);
  }

  findStudent() {
    if (!(this.inscriptionForm.dirty && this.inscriptionForm.valid)) {
     // alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.inscriptionForm.value;
      this.loading = true;
      this.api.Student.getList(
        {
          should_paginate: false,
          registration_number: data.registration_number,
        }).subscribe( students => {
        if (students.length > 0) {
          this.student = students[0];
          this.api.Inscrit.getList(
            {
              should_paginate: false,
              school_year_id: this.school_year.id,
              student_id: this.student.id,
              _includes: 'classe',
            }).subscribe( inscrits => {
            if (inscrits.length > 0) this.inscrit = inscrits[0];
            this.loading = false;
          });
        }
        this.loading = false;
      });
    }
  }

  enregistrer() {
    if (!(this.inscriptionForm.dirty && this.inscriptionForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const data = this.inscriptionForm.value;
      this.api.Inscrit.one(this.inscrit.id + '')
        .put({
          school_year_id: this.school_year.id,
          classe_id: data.classe_id,
          student_id: this.student.id,
        })
        .subscribe((inscrit) => {
          this.loading = false;
          console.log(inscrit);
          this.router.navigate(['/pages/students']);
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.inscriptionForm = this._formBuilder.group({
      classe_id: [''],
      registration_number: ['', Validators.required],
    });
  }

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
           console.log(this.values);
             
           if(this.values!=""){
             this.resultat=event.target.value;
             this.inptShow=true;
             this.inpt_search=this.values;
             
             
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
           this.inscriptionForm.controls['registration_number'].setValue(this.resultat_id);
           
         }
         
         }

}
