import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'ngx-time-slot-show',
  templateUrl: './time-slot-show.component.html',
  styleUrls: ['./time-slot-show.component.scss']
})
export class TimeSlotShowComponent implements OnInit {

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
  old_event: any;
  old_news: any;
  old_message: any;
  old_chat_user: any;
  old_time_slot: any;

  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient) {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    

  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.TimeSlot.one(route_params.params.id)
          .get(
         
          )
          .subscribe((data) => {
            console.log(data);
           
            this.old_time_slot = data;
            
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



  createTimeSlot() {
  this.router.navigate(['/pages/time-slot-add'], {
    replaceUrl: true,
  });
}
}
