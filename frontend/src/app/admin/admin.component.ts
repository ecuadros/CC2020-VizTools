import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navItems: any = null;

  constructor() {
    this.navItems = {
      path: 'admin',
      children: [
        {
          name: '',
          path: '',
          status: false
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}
