import { Component, Input, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {

  @Input() link: string = '';

  faClipboard = faClipboard;

  constructor() { }

  ngOnInit(): void {
  }

  copyInputMessage(inputElement): void{
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
