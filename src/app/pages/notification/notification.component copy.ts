import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notificationForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_event: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    this.api.Classe.getList(
      {
        should_paginate: false,
        school_id: this.currentUser.teacher.school.id,
      }).subscribe((data) => {
      this.classes = data;
      this.loading = false;
      console.log(data);
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
        this.api.Event.one(route_params.params.id)
          .get({})
          .subscribe((event) => {
            console.log(event);
            this.old_event = event;
            this.notificationForm.controls['type'].setValue(this.old_event.type);
            this.notificationForm.controls['subject'].setValue(this.old_event.subject);
            this.notificationForm.controls['description'].setValue(this.old_event.description);
            this.notificationForm.controls['event_date'].setValue(this.old_event.event_date);
            this.notificationForm.controls['status'].setValue(this.old_event.status);
            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/notifications']);
  }

  save() {
    if (!(this.notificationForm.dirty && this.notificationForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.notificationForm.value;
      params.event_date = this.datepipe.transform(params.event_date, 'yyyy-MM-dd');
      console.log(params.event_date);

      if (this.old_event) {
        switch (this.type) {
          case 'school': {
            params.concern_id = this.currentUser.teacher.school.id;
            params.concern_type = 'App\\School';
            // record the notification
            delete params.classe_id;
            delete params.matricule;
            console.log(params);
            this.api.Event.one(this.old_event.id + '')
              .put(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/notifications']);
              }, (error) => {
                this.loading = false;
                console.log(error);
                const e_array = error.data.error.errors;
                const self = this;
                Object.keys(e_array).forEach(function(key, index) {
                  self.errors.push(this[key][0]);
                }, e_array);
              });
            break;
          }
          case 'classe': {
            params.concern_id = params.classe_id;
            params.concern_type = 'App\\Classe';
            // register the notification
            delete params.classe_id;
            delete params.matricule;
            console.log(params);
            this.api.Event.one(this.old_event.id + '')
              .put(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/notifications']);
              }, (error) => {
                this.loading = false;
                console.log(error);
                const e_array = error.data.error.errors;
                const self = this;
                Object.keys(e_array).forEach(function(key, index) {
                  self.errors.push(this[key][0]);
                }, e_array);
              });
            break;
          }
          case 'student': {
            this.api.Student.getList(
              {
                should_paginate: false,
                registration_number: params.matricule,
              }).subscribe((data) => {
              this.loading = false;
              console.log(data);
              if (data.length === 0) {
                this.errors.push('Impossible de trouver un eleve avec ce matricule');
              } else {
                params.concern_id = data[0].id;
                params.concern_type = 'App\\Student';
                // register the notification
                delete params.classe_id;
                delete params.matricule;
                console.log(params);
                this.api.Event.one(this.old_event.id + '')
                  .put(params)
                  .subscribe((result) => {
                    this.loading = false;
                    console.log(result);
                    this.router.navigate(['/pages/notifications']);
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
            }, (error) => {
              this.loading = false;
              console.log(error);
              const e_array = error.data.error.errors;
              const self = this;
              Object.keys(e_array).forEach(function(key, index) {
                self.errors.push(this[key][0]);
              }, e_array);
            });
            break;
          }
        }
      } else {
        switch (this.type) {
          case 'school': {
            params.concern_id = this.currentUser.teacher.school.id;
            params.concern_type = 'App\\School';
            // record the notification
            delete params.classe_id;
            delete params.matricule;
            console.log(params);
            this.api.Event
              .post(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/notifications']);
              }, (error) => {
                this.loading = false;
                console.log(error);
                const e_array = error.data.error.errors;
                const self = this;
                Object.keys(e_array).forEach(function(key, index) {
                  self.errors.push(this[key][0]);
                }, e_array);
              });
            break;
          }
          case 'classe': {
            params.concern_id = params.classe_id;
            params.concern_type = 'App\\Classe';
            // register the notification
            delete params.classe_id;
            delete params.matricule;
            console.log(params);
            this.api.Event
              .post(params)
              .subscribe((result) => {
                this.loading = false;
                console.log(result);
                this.router.navigate(['/pages/notifications']);
              }, (error) => {
                this.loading = false;
                console.log(error);
                const e_array = error.data.error.errors;
                const self = this;
                Object.keys(e_array).forEach(function(key, index) {
                  self.errors.push(this[key][0]);
                }, e_array);
              });
            break;
          }
          case 'student': {
            this.api.Student.getList(
              {
                should_paginate: false,
                registration_number: params.matricule,
              }).subscribe((data) => {
              this.loading = false;
              console.log(data);
              if (data.length === 0) {
                this.errors.push('Impossible de trouver un eleve avec ce matricule');
              } else {
                params.concern_id = data[0].id;
                params.concern_type = 'App\\Student';
                // register the notification
                delete params.classe_id;
                delete params.matricule;
                console.log(params);
                this.api.Event
                  .post(params)
                  .subscribe((result) => {
                    this.loading = false;
                    console.log(result);
                    this.router.navigate(['/pages/notifications']);
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
            }, (error) => {
              this.loading = false;
              console.log(error);
              const e_array = error.data.error.errors;
              const self = this;
              Object.keys(e_array).forEach(function(key, index) {
                self.errors.push(this[key][0]);
              }, e_array);
            });
            break;
          }
        }
      }

      this.loading = false;
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  onTypeChange(value: string) {
    console.log(value);
    this.type = value;
  }

  private createForm() {
    this.notificationForm = this._formBuilder.group({
      subject: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      event_date: ['', Validators.required],
      status: [''],
      classe_id: [''],
      matricule: [''],
    });
  }

}
