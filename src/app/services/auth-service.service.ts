import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  static currentUserId = null;
  userInfo = null;
  token = null;
  static apiService;

  constructor(public http: HttpClient, public apiProvide: ApiService) {
    AuthServiceService.apiService = apiProvide;
    console.log('Hello AuthServiceService Service');
    this.userInfo = localStorage.getItem('currentUser');
  }

  authorize() {
    return localStorage.getItem('accessToken');
  }

  currentUser() {
    return localStorage.getItem('currentUser');
  }

  setUserInfo(info) {
    this.userInfo = info;
  }

  destroySession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.token = null;
    this.setUserInfo(null);
  }

  saveSession(data) {
    let user;
    this.destroySession();
    localStorage.setItem('accessToken', data.token);
    AppComponent.currentToken = data.token;
    this.token = data.accessToken;
    user = data.user || {};
    if (user.person) {
      AppComponent.currentPersonId = user.person.id;
    }
    AuthServiceService.currentUserId = user.id;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.setUserInfo(user);
  }

  updateUserInfo(info) {
    const currentUser = localStorage.getItem('currentUser');
    const element = currentUser;
    if (currentUser) {
      Object.keys(info).forEach(key => {
        if (('[object Array]' === Object.prototype.toString.call(info[key]))) {
          Object.keys(info[key]).forEach(function (key2) {
            element[key][key2] = info[key][key2];
          });
        } else {
          element[key] = info[key];
        }
      });
      localStorage.setItem('currentUser', element);
      this.setUserInfo(element);
    }
  }

  refreshToken() {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.one('auth/refresToken')
        .get()
        .subscribe((data) => {
          console.log(data);
          if (data.data.token) {
            localStorage.setItem('accessToken', data.data.token);
            AppComponent.currentToken = data.data.token;
            resolve(data.data.token);
          } else
            reject(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  send_code(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.all('auth/send-code')
        .post(params)
        .subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  send_code_reset(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.all('auth/send-code-reset-pin')
        .post(params)
        .subscribe((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  verify_code(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.all('auth/verify-code')
        .post(params)
        .subscribe((data) => {
          if (data.user) {
            this.saveSession(data);
          }
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  login(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.all('auth/teacherLogin')
        .post(params)
        .subscribe((data) => {
          if (data.data.user) {
            this.saveSession(data.data);
            resolve(data.data);
          } else {
            reject('unknown error');
          }
        }, (error) => {
          reject(error);
        });
    });
  }

  set_pin_code(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService.restangular.all('users/set-pin-code')
        .post(params)
        .subscribe((data) => {
          this.updateUserInfo(params);
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  update_user(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService.restangular.all('users/updateMe')
        .post(params)
        .subscribe((data) => {
          this.updateUserInfo(params);
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  signup(params) {
    return new Promise((resolve, reject) => {
      AuthServiceService.apiService
        .restangular.all('auth/signup')
        .post(params)
        .subscribe((data) => {
          resolve(data.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  logout() {
  }
}
