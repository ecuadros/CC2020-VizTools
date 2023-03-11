import { Injectable } from '@angular/core';
import { DKAModel } from '@core/models';
import { DKAService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { DKAActions } from './dka.actions';
import { DKASelector } from './dka.selectors';

@Injectable()
export class DKAEffects {

  constructor(
    private actions$: Actions,
    private dkaService: DKAService,
    private store: Store
  ) { }

  addDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAActions.addDKA),
      exhaustMap((action) => {
        return this.dkaService.create(action.dka).pipe(
          map((dka: DKAModel) => {
            return DKAActions.addDKASuccess({ dka });
          })
        );
      })
    )
  );

  loadDKAs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAActions.loadDKAs),
      withLatestFrom(this.store.select(DKASelector.selectDKAs)),
      mergeMap(([, allDKAs]) => {
        if (allDKAs.length === 0) {
          return this.dkaService.read().pipe(
            map((dkas: DKAModel[]) => {
              return DKAActions.loadDKAsSuccess({ dkas });
            })
          );
        } else {
          return of(DKAActions.loadDKAsSuccess({ dkas: allDKAs }));
        }
      })
    )
  );

  updateDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAActions.updateDKA),
      exhaustMap((action) => {
        return this.dkaService.update(action.dka).pipe(
          map((dka: DKAModel) => {
            return DKAActions.updateDKASuccess({ dka });
          })
        );
      })
    )
  );

  removeDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAActions.removeDKA),
      exhaustMap((action) => {
        return this.dkaService.delete(action.dkaId).pipe(
          map(() => {
            return DKAActions.removeDKASuccess({ dkaId: action.dkaId });
          })
        );
      })
    )
  );

}
