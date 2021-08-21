/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils';
import { SeoService } from './@core/utils';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  static currentToken = null;
  static currentPersonId = null;

  static BASE_URL = {
   // url: 'http://localhost:3000',
    // apiEndpoint: 'http://transparency.local/api',
    apiEndpoint: 'http://backend-env.eba-7mbe3mzm.us-east-1.elasticbeanstalk.com/api',
    //apiEndpoint: 'http://localhost/transparency-backend/public/api',
  };

  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
