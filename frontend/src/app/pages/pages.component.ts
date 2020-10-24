import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  navItems: any = null;

  constructor() {
    this.navItems = {
      path: 'auth',
      children: [
        {
          name: 'Login',
          path: 'login',
          status: false
        },
        {
          name: 'Register',
          path: 'register',
          status: false
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}
