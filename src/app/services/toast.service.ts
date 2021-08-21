import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  success(text) {
    this.presentToast(text, 'top-right', 'success');
  }

  info(text) {
    this.presentToast(text, 'top-right', 'info');
  }

  api_errors(errors) {
    let txt = '';
    if (errors.hasOwnProperty('message')) {
      for (let j = 0; j < errors.message.length; j++) {
        console.log(errors.message[j].phone_number);
        txt = '';
        for (const cle in errors.message[j]) {
          if (errors.message[j].hasOwnProperty(cle)) {
            txt += errors.message[j][cle];
          }
        }
        this.error(txt);
      }
    }else {
      for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
          txt = errors[key][0];
          for (let i = 1; i < errors[key].length; i++) {
            txt += '<br>' + errors[key][i];
          }
          key = key.split('_').join(' ');
          this.error(key + ' : ' + txt);
        }
      }
    }
  }

  default(text) {
    this.presentToast(text, 'top-right', 'info');
  }

  presentToast(text, position, status) {
    this.toastrService.show(text, `Error`, { position, status });
  }

  error(message: string) {
    this.presentToast(message, 'top-right', 'error');
  }

  logout() {
  }
}
