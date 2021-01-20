import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CProgram, Series, UProgram } from '../../../models';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  @Input() items: Series[] = [];

  @Input() options?: { filter: (series: Series) => boolean; };

  @Input() onlyView?: boolean = false;

  @Output() onChange = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onColorPickerChange(): void {
    this.onChange.emit();
  }

  onRemoveItem(index: number): void {
    this.items.splice(index, 1);
    this.onChange.emit();
  }

}
