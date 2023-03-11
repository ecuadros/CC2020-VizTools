import { Injectable } from '@angular/core';
import { CountryModel } from '@core/models';
import { CountryService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { CountryActions } from './country.actions';
import { CountrySelector } from './country.selectors';

@Injectable()
export class CountryEffects {

  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store
  ) { }

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      withLatestFrom(this.store.select(CountrySelector.selectCountries)),
      mergeMap(([, allCountries]) => {
        if (allCountries.length === 0) {
          return this.countryService.read().pipe(
            map((countries: CountryModel[]) => {
              return CountryActions.loadCountriesSuccess({ countries });
            })
          );
        } else {
          return of(CountryActions.loadCountriesSuccess({ countries: allCountries }));
        }
      })
    )
  );

}
