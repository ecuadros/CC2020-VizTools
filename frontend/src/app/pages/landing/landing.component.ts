import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  userData: any = { };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCredentialComplete() {
    let encodedData = encodeURIComponent(JSON.stringify(this.userData));
    this.router.navigate(['/auth/register'], {queryParams: { userData: encodedData }});
  }

}
