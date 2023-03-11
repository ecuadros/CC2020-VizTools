import { Injectable } from '@angular/core';
import { CountryModel } from '@core/models';
import { Store } from '@ngrx/store';
import { CountryActions } from '@store/country/country.actions';
import { CountrySelector } from '@store/country/country.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectCountries(): Observable<CountryModel[]> {
    this.load();
    return this.store.select(CountrySelector.selectCountries);
  }

  load() {
    this.store.dispatch(CountryActions.loadCountries());
  }

}
