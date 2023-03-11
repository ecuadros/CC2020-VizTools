import { Injectable } from '@angular/core';
import { DisciplineModel, DWeightModel } from '@core/models';
import { DisciplineService, DWeightService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { DisciplineActions } from './discipline.actions';
import { DisciplineSelector } from './discipline.selectors';

@Injectable()
export class DisciplineEffects {

  constructor(
    private actions$: Actions,
    private disciplineService: DisciplineService,
    private dWeightService: DWeightService,
    private store: Store
  ) { }

  addDiscipline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.addDiscipline),
      exhaustMap((action) => {
        return this.disciplineService.create(action.discipline).pipe(
          map((discipline: DisciplineModel) => {
            return DisciplineActions.addDisciplineSuccess({ discipline });
          })
        );
      })
    )
  );

  loadDisciplines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.loadDisciplines),
      withLatestFrom(this.store.select(DisciplineSelector.selectDisciplines)),
      mergeMap(([, allDisciplines]) => {
        if (allDisciplines.length === 0) {
          return this.disciplineService.read().pipe(
            map((disciplines: DisciplineModel[]) => {
              return DisciplineActions.loadDisciplinesSuccess({ disciplines });
            })
          );
        } else {
          return of(DisciplineActions.loadDisciplinesSuccess({ disciplines: allDisciplines }));
        }
      })
    )
  );

  loadDisciplinesByMultipleIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.loadDisciplinesByMultipleIds),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(DisciplineSelector.selectDisciplinesByMultipleIds({ disciplineIds: action.disciplineIds }))),
        exhaustMap(([action, disciplinesByIds]) => {
          let disciplineIdsToLoad = action.disciplineIds.filter(id => !disciplinesByIds.some(p => p.id === id));
          if (disciplineIdsToLoad.length > 0) {
            return this.disciplineService.readByMultipleIds(disciplineIdsToLoad, action.includeWeights).pipe(
              map((disciplines: DisciplineModel[]) => {
                return DisciplineActions.loadDisciplinesByMultipleIdsSuccess({ disciplines });
              })
            );
          } else {
            return of(DisciplineActions.loadDisciplinesByMultipleIdsSuccess({ disciplines: [] }));
          }
        })
      ))
    )
  );

  loadWeightsByDiscipline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.loadWeightsByDiscipline),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(DisciplineSelector.selectWeightsByDiscipline({ disciplineId: action.disciplineId }))),
        exhaustMap(([action, weightsByDiscipline]) => {
          if (weightsByDiscipline.length === 0) {
            return this.dWeightService.readByDisciplineId(action.disciplineId).pipe(
              map((weights: DWeightModel[]) => {
                return DisciplineActions.loadWeightsByDisciplineSuccess({ disciplineId: action.disciplineId, weights });
              })
            );
          } else {
            return of(DisciplineActions.loadWeightsByDisciplineSuccess({ disciplineId: action.disciplineId, weights: weightsByDiscipline }));
          }
        })
      ))
    )
  );

  updateDiscipline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.updateDiscipline),
      exhaustMap((action) => {
        return this.disciplineService.update(action.discipline).pipe(
          map((discipline: DisciplineModel) => {
            return DisciplineActions.updateDisciplineSuccess({ discipline });
          })
        );
      })
    )
  );

  removeDiscipline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisciplineActions.removeDiscipline),
      exhaustMap((action) => {
        return this.disciplineService.delete(action.disciplineId).pipe(
          map(() => {
            return DisciplineActions.removeDisciplineSuccess({ disciplineId: action.disciplineId });
          })
        );
      })
    )
  );

}
