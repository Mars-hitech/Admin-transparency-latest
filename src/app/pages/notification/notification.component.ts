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

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  inptShow=false;
  notificationForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_message: any;
  user_search: any[];
  tab: any[];
  users: any;
  inpt_search: string;
  resultat: any;

  dataTutors: any;
  tab_or: any;
  resultat_id: string;
  get_searc: any;
  get_searc_id: any;
  old_event: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.createForm();
    this.loading = false;
    
    
  }

  ngOnInit() {
  
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Event.one(route_params.params.id)
          .get()
          .subscribe((users) => {
            this.old_event = users;
            this.notificationForm.controls['type'].setValue(this.old_event.type);
            this.notificationForm.controls['subject'].setValue(this.old_event.subject);
            this.notificationForm.controls['description'].setValue(this.old_event.description);
            this.notificationForm.controls['event_date'].setValue(this.old_event.event_date);
            this.notificationForm.controls['status'].setValue(this.old_event.status);
            this.notificationForm.controls['concern_id'].setValue(this.old_event.concern_id);
            this.notificationForm.controls['concern_type'].setValue(this.old_event.concern_type);
            
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
    const d = new Date(Date.parse(this.notificationForm.get('event_date').value)).toISOString().split('T')[0];
    if (!(this.notificationForm.dirty && this.notificationForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.notificationForm.value;
      params.event_date = d;
      console.log(params);
      console.log(this.old_event);
      if (this.old_event) {
        console.log("good");
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
      } else {
        console.log(params);
        this.api.Event
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log('good save');
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
    }
  }

  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.notificationForm = this._formBuilder.group({
      subject: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      event_date: ['', Validators.required],
      concern_id: ['', Validators.required],
      concern_type: ['', Validators.required],
      status: [''],
     
    });
  }


        
    }
  
    
  



