import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-pays-add',
  templateUrl: './pays-add.component.html',
  styleUrls: ['./pays-add.component.scss']
})
export class PaysAddComponent implements OnInit {
  countryForm: FormGroup;
  loading: boolean = false;
  errors = [];
  student: any;
  school_year: any;
  currentUser: any;
  type: string = 'school';
  classes: any[];
  old_country: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roles: any;
  users: any;
  tab1: any[];
  user_search: any[];
  inpt_search: string;
  resultat_id1: string;
  resultat1: string;
  inptShow1=false;
  dataTutors1: any;
  tab_or1: any;
  get_searc: any;
  get_searc_id: any;

  schools: any;
  tab2: any[];
  school_search: any[];
  inpt_search2: string;
  resultat_id2: string;
  resultat2: string;
  inptShow2=false;
  dataTutors2: any;
  tab_or2: any;
  get_searc2: any;
  get_searc_id2: any;
  constructor(private _formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute,
              public api: ApiService, public httpClient: HttpClient, public datepipe: DatePipe) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.api.User.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.users = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.api.School.getList(
      {
        should_paginate: false,
      }).subscribe((data) => {
      this.schools = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.createForm(); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (route_params: any) => {
      if (route_params.params.id) {
        console.log(route_params.params.id);
        this.loading = true;
        this.api.Country.one(route_params.params.id)
          .get()
          .subscribe((event) => {
            console.log(event);
            this.old_country = event;
            
            this.countryForm.controls['capital'].setValue(this.old_country.capital);
            this.countryForm.controls['citizenship'].setValue(this.old_country.citizenship);
            this.countryForm.controls['country_code'].setValue(this.old_country.country_code);
            this.countryForm.controls['currency'].setValue(this.old_country.currency);
            this.countryForm.controls['currency_code'].setValue(this.old_country.currency_code);

            this.countryForm.controls['currency_sub_unit'].setValue(this.old_country.currency_sub_unit);
            this.countryForm.controls['currency_symbol'].setValue(this.old_country.currency_symbol);
            this.countryForm.controls['currency_decimals'].setValue(this.old_country.currency_decimals);
            this.countryForm.controls['full_name'].setValue(this.old_country.full_name);
            this.countryForm.controls['iso_3166_2'].setValue(this.old_country.iso_3166_2);
            this.countryForm.controls['iso_3166_3'].setValue(this.old_country.iso_3166_3);

            this.countryForm.controls['name'].setValue(this.old_country.name);
            this.countryForm.controls['region_code'].setValue(this.old_country.region_code);
            this.countryForm.controls['sub_region_code'].setValue(this.old_country.sub_region_code);
            this.countryForm.controls['eea'].setValue(this.old_country.eea);
            this.countryForm.controls['calling_code'].setValue(this.old_country.calling_code);
          //  this.countryForm.controls['flag'].setValue(this.old_country.flag);
            this.countryForm.controls['is_covered'].setValue(this.old_country.is_covered);
            this.countryForm.controls['is_activated'].setValue(this.old_country.is_activated);

            this.loading = false;
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/pages/pays-list']);
  }


  save() {
    if (!(this.countryForm.dirty && this.countryForm.valid)) {
      alert('Please fill all form fields');
    } else {
      this.loading = true;
      const params = this.countryForm.value;
      
      console.log(params);
      this.api.Country
        .post(params)
        .subscribe((result) => {
          this.loading = false;
          console.log(result);
          this.router.navigate(['/pages/pays-list']);
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
  onClose(error: any) {
    this.errors = this.errors.filter(err => err !== error);
  }

  private createForm() {
    this.countryForm = this._formBuilder.group({

            capital: [''],
            citizenship: [''],
            country_code: [''],
            currency: [''],
            currency_code: [''],
            currency_sub_unit: [''],
            currency_symbol: [''],
            currency_decimals: [''],
            full_name: [''],
            iso_3166_2: [''],
            iso_3166_3: [''],
            name: [''],
            region_code: [''],
            sub_region_code: [''],
            eea: [''],
            calling_code: [''],
            is_covered: [''],
            is_activated: [''],
           

        
    });
  }





        
    }
  
