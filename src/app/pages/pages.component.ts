import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  user: any;
  menu = MENU_ITEMS;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    // MENU_ITEMS.forEach(menu => {
    //   if (menu.data.roles && menu.data.roles.indexOf(this.user.role) === -1) {
    //     menu.hidden = true;
    //   } else {
    //     menu.hidden = false;
    //     if (menu.children) {
    //       menu.children.forEach(child => {
    //         child.hidden = (child.data.roles && child.data.roles.indexOf(this.user.role) === -1);
    //       });
    //     }
    //   }
    //   this.menu.push(menu);
    // });
  }
}
