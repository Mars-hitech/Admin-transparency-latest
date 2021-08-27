import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'ngx-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.scss']
})
export class NoteShowComponent implements OnInit {

  resultat:any;
  resultat_id:any;
  search:any;
  get_searc:any;
  get_searc_id:any;
  dataTutors: any=[];
  tab_or: any=[];
  inpt_search: any;
  inptShow=false;

  studentForm: FormGroup;
  loading: boolean = false;
  currentUser: any;
  school_year: any;
  user: any;
  errors = [];
  classes: any[];
  tutors:any[];
  old_student: any;
  tab: any[];
  tutors_search: any[];
  old_note: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    this.api.SchoolYear.getList(
      {
        should_paginate: false,
        status: 1,
      }).subscribe((data) => {
      this.school_year = data[0];
      this.api.Tutor.getList(
        {
          should_paginate: false,
         
        }).subscribe((tutors) => {
        this.tutors = tutors;
        this.loading = false;
        console.log(tutors);
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Note.one(route_params.params.id)
          .get(
            {
              
              _includes: 'school_year,student,matiere,assessment_type,sequence',
            }
          )
          .subscribe((note) => {
            console.log(note);
           
            this.old_note = note;
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/note-list']);
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: 'image/jpeg' });
  }

  saveUser() {
    if (!(this.studentForm.dirty && this.studentForm.valid)) {
      const params = this.studentForm.value;
    //  console.log(params);
  //    alert('Please fill all form fields');
    } else {
      if (this.old_student) {
        // let update the user entity
        const params = this.studentForm.value;
        console.log(params);
        if (this.studentForm.get('picture').value.length > 0) {
          this.update_upload();
        } else {
          delete params.picture;
          console.log(params);
          this.api.Student.one(this.old_student.id + '')
            .put(params)
            .subscribe((result) => {
              this.loading = false;
              console.log(result);
              this.router.navigate(['/pages/students-list']);
            }, (error) => {
              this.loading = false;
              const e_array = error.data.error.errors;
              const self = this;
              Object.keys(e_array).forEach(function (key, index) {
                self.errors.push(this[key][0]);
              }, e_array);
            });
        }
      } else {
        this.loading = true;
        if (this.studentForm.get('picture').value.length > 0) {
          this.upload();
        } else {
          const params = this.studentForm.value;
          delete params.picture;
          console.log(params);
          this.api.Student
            .post(params)
            .subscribe((data) => {
              console.log(data.gender);
              this.router.navigate(['/pages/students-list']);
                }, (error) => {
                  // delete student
                  
                  this.loading = false;
                  console.log(error);
                  const e_array = error.data.error.errors;
                  const self = this;
                  Object.keys(e_array).forEach(function (key, index) {
                    self.errors.push(this[key][0]);
                  }, e_array);
                });
           
        }
      }
    }
  }

  upload() {
    this.getBase64(this.studentForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.studentForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'key_test' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('registration_number', data.registration_number);
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('gender', data.gender);
      fd.append('birth_place', data.birth_place);
      fd.append('birth_date', (new Date(this.studentForm.get('birth_date').value)).toUTCString());
      fd.append('tutor_phone_number', data.tutor_phone_number);

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/students', fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          // create student inscription
          this.api.Inscrit
            .post({
              school_year_id: this.school_year.id,
              classe_id: data.classe_id,
              student_id: res.id,
            })
            .subscribe((inscrit) => {
              this.loading = false;
              console.log(inscrit);
              this.router.navigate(['/pages/students']);
            }, (error) => {
              // delete student
              this.api.Student.one(res.id)
                .remove()
                .subscribe((student) => {
                  console.log(student);
                }, (err) => {
                  console.log(err);
                });
              this.loading = false;
              console.log(error);
              const e_array = error.data.error.errors;
              const self = this;
              Object.keys(e_array).forEach(function(key, index) {
                self.errors.push(this[key][0]);
              }, e_array);
            });
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
    });
  }

  update_upload() {
    this.getBase64(this.studentForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.studentForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'student' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('registration_number', data.registration_number);
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('gender', data.gender);
      fd.append('birth_place', data.birth_place);
      fd.append('birth_date', (new Date(this.studentForm.get('birth_date').value)).toUTCString());
      fd.append('tutor_phone_number', data.tutor_phone_number);

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.put(AppComponent.BASE_URL.apiEndpoint + '/students/' + this.old_student.id,
        fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/students-list']);
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
    });
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.studentForm = this._formBuilder.group({
      registration_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      birth_place: ['', Validators.required],
      birth_date: ['', Validators.required],
      tutor_phone_number: ['', Validators.required],
      picture: [''],
      classe_id: [''],
    });
  }

  base64toBlob(base64Data) {
    base64Data = base64Data.split(';');

    let contentType =  '';
    if (base64Data.length > 1) {
      contentType = base64Data[0].split('data:').join('') || '';
      base64Data = base64Data[1].split('base64,').join('');
    }else {
      base64Data = base64Data[0].split('base64,').join('');
    }

    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0 ; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    // blob.name = '';
    return blob;
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  //event onkey
  searchForm(){

    console.log(this.tutors);
    this.tutors_search=[];
   this.tab=[]; 

    for (let nb = 0; nb <this.tutors.length; nb++) {
     if(this.inpt_search!=""){
    
      if(this.tutors[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
        
        this.tab.push(this.tutors[nb]);
        this.tutors_search=this.tab;
      
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
  this.studentForm.addControl('tutor_id',new FormControl(this.resultat_id, Validators.required));
}

}
createAbsent() {
  this.router.navigate(['/pages/note-add'], {
    replaceUrl: true,
  });
}

edit(id_: string) {
  this.router.navigate(['/pages/note-add/' + id_], {
    replaceUrl: true,
  });
}
}