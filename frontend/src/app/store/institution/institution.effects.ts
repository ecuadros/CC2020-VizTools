import { Injectable } from '@angular/core';
import { InstitutionModel } from '@core/models';
import { InstitutionService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { InstitutionActions } from './institution.actions';
import { InstitutionSelector } from './institution.selectors';

@Injectable()
export class InstitutionEffects {

  constructor(
    private actions$: Actions,
    private institutionService: InstitutionService,
    private store: Store
  ) { }

  loadInstitutionsByCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstitutionActions.loadInstitutionsByCountry),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(InstitutionSelector.selectInstitutionsByCountry({ countryId: action.countryId }))),
        exhaustMap(([action, institutionsByCountry]) => {
          if (institutionsByCountry.length === 0) {
            return this.institutionService.readByCountryId(action.countryId).pipe(
              map((institutions: InstitutionModel[]) => {
                return InstitutionActions.loadInstitutionsByCountrySuccess({ institutions });
              })
            );
          } else {
            return of(InstitutionActions.loadInstitutionsByCountrySuccess({ institutions: institutionsByCountry }));
          }
        }
        )
      ))
    )
  );

}
