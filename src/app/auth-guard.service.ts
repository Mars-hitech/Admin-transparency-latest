import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  user: any;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.user) {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    if (this.user) {
      if (route.data.roles && route.data.roles.indexOf(this.user.role) === -1) {
        this.router.navigate(['pages']);
        return false;
      }
      return true;
    }
    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
