import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-time-slot-add',
  templateUrl: './time-slot-add.component.html',
  styleUrls: ['./time-slot-add.component.scss']
})
export class TimeSlotAddComponent implements OnInit {
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


  TimeSlotForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  time_slot: any;
  currentUser: any;
  old_time_slot: any;
  schools: any;

  tab: any[];

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   
    this.createForm();
    this.loading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.TimeSlot.one(route_params.params.id)
          .get()
          .subscribe((time_slot) => {
            console.log(time_slot);
            this.old_time_slot = time_slot;
            this.TimeSlotForm.controls['day'].setValue(this.old_time_slot.day);
            this.TimeSlotForm.controls['from_hour'].setValue(this.old_time_slot.from_hour);
            this.TimeSlotForm.controls['to_hour'].setValue(this.old_time_slot.to_hour);
            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/time-slot-list']);
  }

  save() {
    if (!(this.TimeSlotForm.dirty && this.TimeSlotForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.TimeSlotForm.value;
    
      console.log(params);
      if (this.old_time_slot) {
        this.api.TimeSlot.one(this.old_time_slot.id + '')
          .put(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/time-slot-list']);
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
        this.api.TimeSlot
          .post(params)
          .subscribe((result) => {
            this.loading = false;
            console.log(result);
            this.router.navigate(['/pages/time-slot-list']);
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
    this.TimeSlotForm = this._formBuilder.group({
      day: ['', Validators.required],
      from_hour: ['', Validators.required],
      to_hour: ['', Validators.required],
    });
  }


}
