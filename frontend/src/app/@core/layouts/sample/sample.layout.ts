import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-layout',
  templateUrl: './sample.layout.html',
  styleUrls: ['./sample.layout.scss']
})
export class SampleComponent implements OnInit {

  @Input() navItems: any;

  constructor() { }

  ngOnInit(): void {
  }

}
