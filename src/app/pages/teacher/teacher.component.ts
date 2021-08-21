import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'ngx-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {

  teacherForm: FormGroup;
  loading: boolean = false;
  user: any;
  currentUser: any;
  errors = [];
  old_teacher: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.createForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Teacher.one(route_params.params.id)
          .get({_includes: 'user'})
          .subscribe((teacher) => {
            console.log(teacher);
            this.old_teacher = teacher;
            this.teacherForm.controls['registration_number'].setValue(this.old_teacher.registration_number);
            this.teacherForm.controls['first_name'].setValue(this.old_teacher.first_name);
            this.teacherForm.controls['last_name'].setValue(this.old_teacher.last_name);
            this.teacherForm.controls['title'].setValue(this.old_teacher.title);
            this.teacherForm.controls['pin_code'].setValue(this.old_teacher.user.pin_code);
            this.teacherForm.controls['phone_number'].setValue(this.old_teacher.user.phone_number);
            this.teacherForm.controls['birth_date'].setValue(this.old_teacher.birth_date);
            if (this.old_teacher.picture) {
              this.getBase64ImageFromURL(this.old_teacher.picture).subscribe((base64data: any) => {
                const base64Image = 'data:image/jpg;base64,' + base64data;
                const imageBlob = this.dataURItoBlob(base64Image);
                const imageFile = new File([imageBlob], 'picture' + new Date().valueOf() +
                  '.jpg', {type: 'image/jpeg'});
                this.teacherForm.controls['picture'].setValue([{file: imageFile}]);
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
    this.router.navigate(['/pages/teachers']);
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
    if (!(this.teacherForm.dirty && this.teacherForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.teacherForm.value;
      if (this.old_teacher) {
        // let update the user entity
        this.api.User.one(this.old_teacher.user_id + '')
          .put({
            email: params.first_name + params.last_name + '@mailinator.com',
            phone_number: params.phone_number,
            pin_code: params.pin_code,
            password: params.pin_code,
          })
          .subscribe((user) => {
            this.user = user;
            params.user_id = user.id;
            params.school_id = this.currentUser.teacher.school.id;
            console.log(params);
            if (this.teacherForm.get('picture').value.length > 0) {
              this.update_upload();
            } else {
              delete params.phone_number;
              delete params.picture;
              params.user_id = this.user.id;
              params.school_id = this.currentUser.teacher.school.id;
              console.log(params);
              this.api.Teacher.one(this.old_teacher.id + '')
                .put(params)
                .subscribe((result) => {
                  this.loading = false;
                  console.log(result);
                  this.router.navigate(['/pages/teachers']);
                }, (error) => {
                  this.loading = false;
                  const e_array = error.data.error.errors;
                  const self = this;
                  Object.keys(e_array).forEach(function (key, index) {
                    self.errors.push(this[key][0]);
                  }, e_array);
                });
            }
          }, (err) => {
            this.loading = false;
            const e_array = err.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function (key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      } else {
        // let save the user entity
        this.api.User
          .post({
            email: params.first_name + params.last_name + '@mailinator.com',
            phone_number: params.phone_number,
            pin_code: params.pin_code,
            password: params.pin_code,
          })
          .subscribe((user) => {
            this.user = user;
            params.user_id = user.id;
            params.school_id = this.currentUser.teacher.school.id;
            console.log(params);
            if (this.teacherForm.get('picture').value.length > 0) {
              this.upload();
            } else {
              delete params.phone_number;
              delete params.picture;
              params.user_id = this.user.id;
              params.school_id = this.currentUser.teacher.school.id;
              console.log(params);
              this.api.Teacher
                .post(params)
                .subscribe((result) => {
                  this.loading = false;
                  console.log(result);
                  this.router.navigate(['/pages/teachers']);
                }, (error) => {
                  // delete user
                  this.api.User.one(this.user.id)
                    .remove()
                    .subscribe((data) => {
                      console.log(data);
                    }, (err) => {
                      console.log(err);
                    });

                  this.loading = false;
                  const e_array = error.data.error.errors;
                  const self = this;
                  Object.keys(e_array).forEach(function (key, index) {
                    self.errors.push(this[key][0]);
                  }, e_array);
                });
            }
          }, (err) => {
            this.loading = false;
            const e_array = err.data.error.errors;
            const self = this;
            Object.keys(e_array).forEach(function (key, index) {
              self.errors.push(this[key][0]);
            }, e_array);
          });
      }
    }
  }

  upload() {
    this.getBase64(this.teacherForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.teacherForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'key_test' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('registration_number', data.registration_number);
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('title', data.title);
      fd.append('user_id', this.user.id);
      fd.append('school_id', this.currentUser.teacher.school.id);
      fd.append('birth_date', (new Date(this.teacherForm.get('birth_date').value)).toUTCString());

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.post<any>(AppComponent.BASE_URL.apiEndpoint + '/teachers', fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/pages/teachers']);
        },
        (err) => {
          // delete user
          this.api.User.one(this.user.id)
            .remove()
            .subscribe((resp) => {
              console.log(resp);
            }, (error) => {
              console.log(error);
            });
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
    this.getBase64(this.teacherForm.get('picture').value[0].file).then(someValue => {
      const base64 = someValue;
      const data = this.teacherForm.value;
      console.log(data);
      const fd = new FormData();
      fd.append('picture', this.base64toBlob(base64), 'key_test' + '.png');
      fd.append('mime_type', 'image/jpeg');
      fd.append('registration_number', data.registration_number);
      fd.append('first_name', data.first_name);
      fd.append('last_name', data.last_name);
      fd.append('title', data.title);
      fd.append('user_id', this.user.id);
      fd.append('school_id', this.currentUser.teacher.school.id);
      fd.append('birth_date', (new Date(this.teacherForm.get('birth_date').value)).toUTCString());

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

      this.httpClient.put<any>(AppComponent.BASE_URL.apiEndpoint + '/teachers/' + this.old_teacher.id,
        fd, {headers: headers}).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/pages/teachers']);
        },
        (err) => {
          // delete user
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
    this.teacherForm = this._formBuilder.group({
      registration_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      title: ['', Validators.required],
      birth_date: ['', Validators.required],
      phone_number: ['', Validators.required],
      pin_code: ['', Validators.required],
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
}
