import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class NgxLoginComponent extends NbLoginComponent {
  user: any;
  loading: boolean = false;

  constructor(public authService: AuthServiceService,
              service: NbAuthService, @Inject(NB_AUTH_OPTIONS) options: {},
              cd: ChangeDetectorRef, router: Router) {
    super(service, options, cd, router);
  }

  sign_in() {
    this.loading = true;
    console.log(this.user);
    this.authService
      .login({phone_number: this.user.phone_number, pin_code: this.user.pin_code})
      .then((data) => {
          console.log(data['user']);
          this.loading = false;
          this.router.navigate(['/pages']);
        },
        (error) => {
          this.loading = false;
          console.log(error);
          const e_array = error.data.errors;
          const self = this;
          Object.keys(e_array).forEach(function(key, index) {
            self.errors.push(this[key][0]);
          }, e_array);
        },
      );
  }
}
