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
  resultat1:any;
  resultat_id1:any;
  search1:any;
  get_searc1:any;
  get_searc_id1:any;
  dataTutors1: any=[];
  tab_or1: any=[];
  inpt_search1: any;
  inptShow1=false;
  tutors1:any[];
  student_search1: any[];
  students: any[];
  tab1: any[];


  resultat2:any;
  resultat_id2:any;
  search2:any;
  get_searc2:any;
  get_searc_id2:any;
  dataTutors2: any=[];
  tab_or2: any=[];
  inpt_search2: any;
  inptShow2=false;
  tutors2:any[];
  student_search2: any[];
  school_years: any[];
  tab2: any[];


  resultat3:any;
  resultat_id3:any;
  search3:any;
  get_searc3:any;
  get_searc_id3:any;
  dataTutors3: any=[];
  tab_or3: any=[];
  inpt_search3: any;
  inptShow3=false;
  tutors3:any[];
  student_search3: any[];
  tab3: any[];


  resultat4:any;
  resultat_id4:any;
  search4:any;
  get_searc4:any;
  get_searc_id4:any;
  dataTutors4: any=[];
  tab_or4: any=[];
  inpt_search4: any;
  inptShow4=false;
  tutors4:any[];
  student_search4: any[];
  tab4: any[];


  resultat5:any;
  resultat_id5:any;
  search5:any;
  get_searc5:any;
  get_searc_id5:any;
  dataTutors5: any=[];
  tab_or5: any=[];
  inpt_search5: any;
  inptShow5=false;
  tutors5:any[];
  student_search5: any[];
  tab5: any[];

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
  matieres: any;
  sequences: any;
  assessment_types: any;
  school_year_search2: any[];
  matieres_search: any[];
  sequence_search: any[];
  assessment_search: any[];

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
        this.school_years = data;
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

    this.api.Matiere.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.matieres = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.api.Sequence.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.sequences = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.api.AssessmentType.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.assessment_types = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.createForm();
    this.loading = false;
  }

  

  ngOnInit() {
    console.log(this.old_note);
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Note.one(route_params.params.id)
          .get({
            _includes: 'school_year,student,matiere,assessment_type,sequence',
        })
          .subscribe((notes) => {
            this.old_note = notes;
            console.log( this.old_note.created_at);
            this.noteForm.controls['school_year_id'].setValue(this.old_note.school_year_id);
            this.noteForm.controls['student_id'].setValue(this.old_note.student_id);
            this.noteForm.controls['matiere_id'].setValue(this.old_note.matiere_id);
            this.noteForm.controls['sequence_id'].setValue(this.old_note.sequence_id);
            this.noteForm.controls['assessment_type_id'].setValue(this.old_note.assessment_type_id);
            this.noteForm.controls['note'].setValue(this.old_note.note);
        
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
    if (!(this.noteForm.dirty && this.noteForm.valid)) {
    //  alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.noteForm.value;
      console.log('pr',params);
      if (this.old_note) {
        this.api.Note.one(this.old_note.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log('res',result);
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

    //event onkey
    searchForm1(){
     // console.log(this.students);
      this.student_search1=[];
     this.tab1=[]; 
      for (let nb = 0; nb <this.students.length; nb++) {
       if(this.inpt_search1!=""){
        if(this.students[nb].full_name.toUpperCase().includes(this.inpt_search1.toUpperCase())===true){
          this.tab1.push(this.students[nb]);
          this.student_search1=this.tab1;
        }
       } 
    }
    } 
    values1 = '';
  
  onKey1(event: any) { // without type info
    this.values1 = event.target.value ;
    if(this.values1!=""){
      this.resultat1=event.target.value;
      this.inptShow1=true;
      this.inpt_search1=this.values1
      this.searchForm1();
    }else{
     this.dataTutors1=this.tab_or1;
      this.inptShow1=false;
      this.resultat1="";
      this.resultat_id1="";
    }
   
  }

  click_Show1(searc,searc_id){
    this.get_searc1=searc;
    this.get_searc_id1=searc_id;
  this.resultat1=this.get_searc1;
  this.resultat_id1=this.get_searc_id1;
  this.inptShow1=false;
  if(this.resultat_id1){
    this.noteForm.controls['student_id'].setValue(this.resultat_id1);
  }
  
  }
      //event onkey
      searchForm2(){

        // console.log(this.students);
         this.school_year_search2=[];
        this.tab2=[]; 
         
         for (let nb = 0; nb <this.school_years.length; nb++) {
          if(this.inpt_search2!=""){
            
           if(this.school_years[nb].from_year.toString().includes(this.inpt_search2.toString())===true){
            console.log(this.school_years[nb].from_year);
             this.tab2.push(this.school_years[nb]);
             this.school_year_search2=this.tab2;
           
           }
          }
           
       }
       }
       
       values2 = '';
  onKey2(event: any) { // without type info
    this.values2 = event.target.value ;
   
      
    if(this.values2!=""){
      this.resultat2=event.target.value;
      this.inptShow2=true;
      this.inpt_search2=this.values2;
      
      console.log(this.inpt_search2);
      this.searchForm2();
      
    
    }else{
      
     this.dataTutors2=this.tab_or2;
      this.inptShow2=false;
      this.resultat2="";
      this.resultat_id2="";
    }
   
  }

  click_Show2(searc,searc_id){
    this.get_searc2=searc;
    this.get_searc_id2=searc_id;
  this.resultat2=this.get_searc2;
  this.resultat_id2=this.get_searc_id2;
  this.inptShow2=false;
  if(this.resultat_id2){
    this.noteForm.controls['school_year_id'].setValue(this.resultat_id2);
  }
  
  }



  searchForm3(){

    // console.log(this.students);
     this.matieres_search=[];
    this.tab3=[]; 
     console.log(this.matieres.length);
     for (let nb = 0; nb <this.matieres.length; nb++) {
      if(this.inpt_search3!=""){
          console.log(this.inpt_search3);
       if(this.matieres[nb].name.toUpperCase().includes(this.inpt_search3.toUpperCase())===true){
        console.log(this.matieres[nb].name);
         this.tab3.push(this.matieres[nb]);
         this.matieres_search=this.tab3;
       
       }
      }
       
   }
   }

  values3 = '';

  onKey3(event: any) { // without type info
    this.values3 = event.target.value ;
   
      
    if(this.values3!=""){
      this.resultat3=event.target.value;
      this.inptShow3=true;
      this.inpt_search3=this.values3;
      
      console.log(this.inpt_search3);
      this.searchForm3();
      
    
    }else{
      
     this.dataTutors3=this.tab_or3;
      this.inptShow3=false;
      this.resultat3="";
      this.resultat_id3="";
    }
   
  }

  click_Show3(searc,searc_id){
    this.get_searc3=searc;
    this.get_searc_id3=searc_id;
  this.resultat3=this.get_searc3;
  this.resultat_id3=this.get_searc_id3;
  this.inptShow3=false;
  if(this.resultat_id3){
    this.noteForm.controls['matiere_id'].setValue(this.resultat_id3);
  }
  }






  searchForm4(){

    // console.log(this.students);
     this.sequence_search=[];
    this.tab4=[]; 
     console.log(this.sequences.length);
     for (let nb = 0; nb <this.sequences.length; nb++) {
      if(this.inpt_search4!=""){
          console.log(this.inpt_search4);
       if(this.sequences[nb].name.toUpperCase().includes(this.inpt_search4.toUpperCase())===true){
        console.log(this.sequences[nb].name);
         this.tab4.push(this.sequences[nb]);
         this.sequence_search=this.tab4;
       
       }
      }
       
   }
   }

  values4 = '';

  onKey4(event: any) { // without type info
    this.values4 = event.target.value ;
   
      
    if(this.values4!=""){
      this.resultat4=event.target.value;
      this.inptShow4=true;
      this.inpt_search4=this.values4;
      
      console.log(this.inpt_search4);
      this.searchForm4();
      
    
    }else{
      
     this.dataTutors4=this.tab_or4;
      this.inptShow4=false;
      this.resultat4="";
      this.resultat_id4="";
    }
   
  }

  click_Show4(searc,searc_id){
 
    this.get_searc4=searc;
    this.get_searc_id4=searc_id;
  this.resultat4=this.get_searc4;
  this.resultat_id4=this.get_searc_id4;
  
  this.inptShow4=false;
  if(this.resultat_id4){
    this.noteForm.controls['sequence_id'].setValue(this.resultat_id4);
  }
  }




  searchForm5(){

    // console.log(this.students);
     this.assessment_search=[];
    this.tab5=[]; 

     for (let nb = 0; nb <this.assessment_types.length; nb++) {
      if(this.inpt_search5!=""){
          console.log(this.inpt_search5);
       if(this.assessment_types[nb].name.toUpperCase().includes(this.inpt_search5.toUpperCase())===true){
    
         this.tab5.push(this.assessment_types[nb]);
         this.assessment_search=this.tab5;
       
       }
      }
       
   }
   }

  values5 = '';
  onKey5(event: any) { // without type info
    this.values5 = event.target.value ;
   
      
    if(this.values5!=""){
      this.resultat5=event.target.value;
      this.inptShow5=true;
      this.inpt_search5=this.values5;
      
      console.log(this.inpt_search5);
      this.searchForm5();
      
    
    }else{
      
     this.dataTutors5=this.tab_or5;
      this.inptShow5=false;
      this.resultat5="";
      this.resultat_id5="";
    }
   
  }
  
  







  click_Show5(searc,searc_id){
    this.get_searc5=searc;
    this.get_searc_id5=searc_id;
  this.resultat5=this.get_searc5;
  this.resultat_id5=this.get_searc_id5;
  this.inptShow5=false;
  if(this.resultat_id5){
    this.noteForm.controls['assessment_type_id'].setValue(this.resultat_id5);
  }
  }




}
