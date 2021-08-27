import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss'],
})
export class ClasseComponent implements OnInit {

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
 school_search: any[];
  students: any[];


  classeForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  old_classe: any;
  schools: any;

  tab: any[];

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.School
    .getList(
      {
        should_paginate: false,
      
      }
    )
    .subscribe((data) => {
      this.schools = data;
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
        this.api.Classe.one(route_params.params.id)
          .get()
          .subscribe((classe) => {
            console.log(classe);
            this.old_classe = classe;
            this.classeForm.controls['code'].setValue(this.old_classe.code);
            this.classeForm.controls['name'].setValue(this.old_classe.name);
            this.classeForm.controls['school_id'].setValue(this.old_classe.school_id);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/classes']);
  }

  save() {
    if (!(this.classeForm.dirty && this.classeForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.classeForm.value;
      params.school_id = this.currentUser.teacher.school.id;
      console.log(params);
      if (this.old_classe) {
        this.api.Classe.one(this.old_classe.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/classes']);
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
        this.api.Classe
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/classes']);
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
    this.classeForm = this._formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      school_id: ['', Validators.required],
    });
  }


      //event onkey
      searchForm(){

        // console.log(this.students);
         this.school_search=[];
        this.tab=[]; 
     
         for (let nb = 0; nb <this.schools.length; nb++) {
          if(this.inpt_search!=""){
         
           if(this.schools[nb].name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
             
             this.tab.push(this.schools[nb]);
             this.school_search=this.tab;
           
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
       this.classeForm.controls['school_id'].setValue(this.resultat_id);
     }
     
     }
}
