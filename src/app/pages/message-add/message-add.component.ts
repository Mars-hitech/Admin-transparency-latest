import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {

  messageForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_message: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Message.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_message = event;
            this.messageForm.controls['body'].setValue(this.old_message.body);
            this.messageForm.controls['status'].setValue(this.old_message.status);
            this.messageForm.controls['type'].setValue(this.old_message.type);
            this.messageForm.controls['char_user_id'].setValue(this.old_message.char_user_id);
            this.messageForm.controls['subject'].setValue(this.old_message.subject);

            
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/news-list']);
  }

  save() {
    if (!(this.messageForm.dirty && this.messageForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.messageForm.value;
      console.log(params);
      if (this.old_message) {
        this.api.Message.one(this.old_message.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/message-list']);
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
        this.api.Message
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/message-list']);
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
    this.messageForm = this._formBuilder.group({
      status: ['', Validators.required],
      type: ['', Validators.required],
      char_user_id: ['', Validators.required],
      body: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }


        
    }
  
    
  



