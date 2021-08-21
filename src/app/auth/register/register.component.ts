import { Component } from '@angular/core';
import { NbRegisterComponent} from '@nebular/auth';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent extends NbRegisterComponent {

  user: any;
  enterprise: any;
  loading: boolean = false;
  step: number = 1;
  roles = [];
  errors = [];
  messages = [];

  async createUser() {
    try {
      const data = {
        phoneNumber: this.user.phoneNumber,
        alternativePhoneNumber: this.user.alternativePhoneNumber,
        pinCode: this.user.pinCode,
        password: this.user.password,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        userName: this.user.userName,
        role: 'BIP_ADMIN',
      };
    }catch (err) {
      this.errors ? this.errors.push(err) : this.errors = [err];
      console.log('error: ', err);
    }
  }

  async signUpUser() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Verify that the two passwords fields are identical');
    }else {
      const username = this.user.userName;
      const password = this.user.password;
      const email = this.user.email;
      const phone_number = this.user.phoneNumber;
      this.loading = true;
    }
  }
}
