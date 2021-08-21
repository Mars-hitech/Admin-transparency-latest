/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RestangularModule } from 'ngx-restangular';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import {InputFileConfig, InputFileModule} from 'ngx-input-file';
import { AccueilComponent } from './accueil/accueil.component';
import {ToastService} from './services/toast.service';
import {LoaderService} from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpTokenInterceptorService} from './auth/http-token-interceptor.service';
import { NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 4,
};

export function RestangularConfigFactory (RestangularProvider, toastProvider: ToastService, loader: LoaderService) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/x.laravel.v1+json',
    'show_loading': true,
  };

  RestangularProvider
    .setBaseUrl(AppComponent.BASE_URL.apiEndpoint)
    .setDefaultHeaders(headers)
    .addFullRequestInterceptor(function (element, operation, what, url, _headers) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        _headers.Authorization = 'Bearer ' + token;
        _headers['Access-Token'] = token;
      }
    })
    .addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      if (response.headers) {
        if (response.headers.hasOwnProperty('X-Page-Total')) {
          data.metadata = {
            total: response.headers.get('X-Page-Total'),
            per_page: response.headers.get('X-Per-Page'),
          };
          return data;
        }
      }
      return data;
    });
    // .addErrorInterceptor((response, subject, responseHandler) => {
    //   setTimeout(() => {
    //     loader.hide();
    //   }, 500);
    //   if (response.status === 403) {
    //     return false; // error handled
    //   } else if (response.status === 422) {
    //     if (response.data.error || response.data.errors) {
    //       if (response.data.error) {
    //         toastProvider.api_errors(response.data.error.errors);
    //         return false;
    //       }
    //       toastProvider.api_errors(response.data.errors);
    //       return false; // error handled
    //     } else {
    //       console.log(response.data.email);
    //       const json = response.data;
    //       let retour: string = '';
    //       Object.keys(json).forEach(function (k) {
    //         retour = k + ' - ' + json[k];
    //       });
    //       toastProvider.error(retour);
    //       return false;
    //     }
    //   } else if (response.status === 401) {
    //     localStorage.clear();
    //     toastProvider.logout();
    //     return false; // error handled
    //   } else if (response.status === 404) {
    //     console.log(response.data);
    //     toastProvider.error('We are unable to join the server, please report this issue');
    //     return false;
    //   } else if (response.status === 500) {
    //     console.log(response.data);
    //     toastProvider.error('Problem happens when processing your request, please report this issue');
    //     return false;
    //   }
    //   return true;
    // });
}

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),
    InputFileModule.forRoot(config),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbDatepickerModule.forRoot(),
    RestangularModule.forRoot([ToastService, LoaderService], RestangularConfigFactory),
    HttpClientModule,
    NgbTimepickerModule,
    DataTablesModule

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
