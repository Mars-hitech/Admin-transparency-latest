import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {AppComponent} from '../../app.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-personne-add',
  templateUrl: './personne-add.component.html',
  styleUrls: ['./personne-add.component.scss']
})
export class PersonneAddComponent implements OnInit {

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
 user_search: any[];
  students: any[];







  personForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_person: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  tab: any[];
  data: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.Person.getList(
      {
        should_paginate: false,
       
      }).subscribe((data) => {
      this.users = data;
      this.loading = false;
   
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
    this.api.User.getList(
      {
        should_paginate: false,
        
      }).subscribe( result => {
        this.users = result;
        console.log(this.users)
    });
    this.createForm();
    
    
  }

  ngOnInit() {





    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Person.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_person = event;
            this.personForm.controls['user_id'].setValue(this.old_person.user_id);
            this.personForm.controls['first_name'].setValue(this.old_person.first_name);
            this.personForm.controls['last_name'].setValue(this.old_person.last_name);
            this.personForm.controls['birth_date'].setValue(this.old_person.birth_date);
            if (this.old_person.picture) {
              this.getBase64ImageFromURL(this.old_person.picture).subscribe((base64data: any) => {
                const base64Image = 'data:image/jpg;base64,' + base64data;
                const imageBlob = this.dataURItoBlob(base64Image);
                const imageFile = new File([imageBlob], 'picture' + new Date().valueOf() +
                  '.jpg', {type: 'image/jpeg'});
                this.personForm.controls['picture'].setValue([{file: imageFile}]);
              });
            }
           
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/personne-list']);
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


  save() {
    //const d = (new Date(this.personForm.get('birth_date').value)).toUTCString();
    const d = new Date(Date.parse(this.personForm.get('birth_date').value));
    d.setDate(d.getDate());
    const f= new Date(d).toISOString().split('T')[0];
    if (!(this.personForm.dirty && this.personForm.valid)) {
     /*alert('Please fill all form fields');*/
    } else {
     
      if (this.old_person) {
        this.loading = true;
        const params = this.personForm.value;
        params.birth_date = f;
        console.log(params);
        if (this.personForm.get('picture').value.length > 0) {
          this.update_upload();
        } else {
          params.birth_date = f;
          delete params.picture;
          console.log(params);
        this.api.Person.one(this.old_person.id + '')
          .put({
            first_name: params.first_name,
            last_name: params.last_name,
            birth_date: params.birth_date,
            user_id: params.user_id,
           
          })
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            //this.router.navigate(['/pages/personne-list']);
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
        this.loading = true;
        if (this.personForm.get('picture').value.length > 0) {
          this.upload();
        } else {
          const params = this.personForm.value;
          params.birth_date = f;
          delete params.picture;
          console.log(params);
        this.api.Person
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
          // this.router.navigate(['/pages/personne-list']);
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
  }

  upload() {
    this.getBase64(this.personForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.personForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'key_test' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('user_id', data.user_id);
      fd.append('birth_date', (new Date(this.personForm.get('birth_date').value)).toUTCString());

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/people', fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          // create student inscription
          this.router.navigate(['/pages/personne-list']);
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
    this.getBase64(this.personForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.personForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'key_test' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('user_id', data.user_id);
      fd.append('birth_date', (new Date(this.personForm.get('birth_date').value)).toUTCString());

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.put(AppComponent.BASE_URL.apiEndpoint + '/people/' + this.old_person.id,
        fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/personne-list']);
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
    this.personForm = this._formBuilder.group({


      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_id: ['', Validators.required],
      birth_date: ['', Validators.required],
      picture: [''],
     
 

        
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

        // console.log(this.students);
         this.user_search=[];
        this.tab=[]; 
     
         for (let nb = 0; nb <this.users.length; nb++) {
          if(this.inpt_search!=""){
         
           if(this.users[nb].full_name.toUpperCase().includes(this.inpt_search.toUpperCase())===true){
             
             this.tab.push(this.users[nb]);
             this.user_search=this.tab;
           
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
       this.personForm.controls['user_id'].setValue(this.resultat_id);
     }
     
     }

        
    }
  