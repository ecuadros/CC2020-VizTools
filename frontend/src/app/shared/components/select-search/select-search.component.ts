import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, mergeMap, map } from 'rxjs';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent {

  @Input()
  label!: string;

  @Input()
  options$!: Observable<any>;

  @Input()
  keepSelectedOption = true;

  @Output()
  onOptionSelected!: EventEmitter<any>;

  filteredOptions$!: Observable<any>;

  control!: FormControl;

  selectedOption!: any;

  constructor() {
    this.onOptionSelected = new EventEmitter<any>();
    this.control = new FormControl('');
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      mergeMap(value => this._filter(value))
    );
  }

  reset() {
    this.control.reset();
  }

  optionSelected(event: any) {
    this.selectedOption = event.option.value;

    if (this.keepSelectedOption) {
      this.control.setValue(this.selectedOption.name);
    } else {
      this.control.setValue('');
    }

    this.onOptionSelected.emit(this.selectedOption);
  }

  focusIn(event: any) {
    this.control.setValue('');
  }

  focusOut(event: any) {
    if (this.keepSelectedOption) {
      if (this.selectedOption && (event.relatedTarget == null || event.relatedTarget.localName != 'mat-option')) {
        this.control.setValue(this.selectedOption.name);
      }
    } else {
      this.control.setValue('');
    }
  }

  private _filter(value: string): Observable<any> {
    try {
      const filterValue = value.toLowerCase();
      return this.options$.pipe(
        map(options => options.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue)))
      );
    }
    catch (e) {
      return this.options$;
    }
  }

}
