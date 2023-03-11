import { Injectable } from '@angular/core';
import { DKAGModel } from '@core/models';
import { DKAGService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { DKAGActions } from './dkag.actions';
import { DKAGSelector } from './dkag.selectors';

@Injectable()
export class DKAGEffects {

  constructor(
    private actions$: Actions,
    private dkagService: DKAGService,
    private store: Store
  ) { }

  addDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAGActions.addDKAG),
      exhaustMap((action) => {
        return this.dkagService.create(action.dkag).pipe(
          map((dkag: DKAGModel) => {
            return DKAGActions.addDKAGSuccess({ dkag });
          })
        );
      })
    )
  );

  loadDKAs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAGActions.loadDKAGs),
      withLatestFrom(this.store.select(DKAGSelector.selectDKAGs)),
      mergeMap(([, allDKAGs]) => {
        if (allDKAGs.length === 0) {
          return this.dkagService.read().pipe(
            map((dkags: DKAGModel[]) => {
              return DKAGActions.loadDKAGsSuccess({ dkags });
            })
          );
        } else {
          return of(DKAGActions.loadDKAGsSuccess({ dkags: allDKAGs }));
        }
      })
    )
  );

  updateDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAGActions.updateDKAG),
      exhaustMap((action) => {
        return this.dkagService.update(action.dkag).pipe(
          map((dkag: DKAGModel) => {
            return DKAGActions.updateDKAGSuccess({ dkag });
          })
        );
      })
    )
  );

  removeDKA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DKAGActions.removeDKAG),
      exhaustMap((action) => {
        return this.dkagService.delete(action.dkagId).pipe(
          map(() => {
            return DKAGActions.removeDKAGSuccess({ dkagId: action.dkagId });
          })
        );
      })
    )
  );

}
