import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  navItems: any = null;

  constructor() {
    this.navItems = {
      path: 'user',
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
