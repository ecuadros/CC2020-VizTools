import { Injectable } from '@angular/core';
import { DKAGModel, DKAModel, ProgramModel, PWeightModel } from '@core/models';
import { ProgramService } from '@core/services';
import { PWeightService } from '@core/services/pweight.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DKASelector } from '@store/dka/dka.selectors';
import { DKAGSelector } from '@store/dkag/dkag.selectors';
import { exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { ProgramActions } from './program.actions';
import { ProgramSelector } from './program.selectors';

@Injectable()
export class ProgramEffects {

  constructor(
    private actions$: Actions,
    private programService: ProgramService,
    private pWeightService: PWeightService,
    private store: Store
  ) { }

  addProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.addProgram),
      exhaustMap((action) => {
        return this.programService.create(action.program).pipe(
          map((program: ProgramModel) => {
            return ProgramActions.addProgramSuccess({ program });
          })
        );
      })
    )
  );

  loadProgramsByMultipleIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.loadProgramsByMultipleIds),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(ProgramSelector.selectProgramsByMultipleIds({ programIds: action.programIds }))),
        exhaustMap(([action, programsByIds]) => {
          let programIdsToLoad = action.programIds.filter(id => !programsByIds.some(p => p.id === id));
          if (programIdsToLoad.length > 0) {
            return this.programService.readByMultipleIds(programIdsToLoad, action.includeWeights).pipe(
              map((programs: ProgramModel[]) => {
                return ProgramActions.loadProgramsByMultipleIdsSuccess({ programs });
              })
            );
          } else {
            return of(ProgramActions.loadProgramsByMultipleIdsSuccess({ programs: [] }));
          }
        })
      ))
    )
  );

  loadProgramsByInstitution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.loadProgramsByInstitution),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(ProgramSelector.selectProgramsByInstitution({ institutionId: action.institutionId }))),
        exhaustMap(([action, programsByInstitution]) => {
          if (programsByInstitution.length === 0) {
            return this.programService.readByInstitutionId(action.institutionId).pipe(
              map((programs: ProgramModel[]) => {
                return ProgramActions.loadProgramsByInstitutionSuccess({ programs });
              })
            );
          } else {
            return of(ProgramActions.loadProgramsByInstitutionSuccess({ programs: [] }));
          }
        })
      ))
    )
  );

  loadWeightsByProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.loadWeightsByProgram),
      exhaustMap((action) => of(action).pipe(
        withLatestFrom(this.store.select(ProgramSelector.selectWeightsByProgram({ programId: action.programId })), this.store.select(DKASelector.selectDKAs), this.store.select(DKAGSelector.selectDKAGs)),
        exhaustMap(([action, programWeights, allDKAs, allDKAGs]) => {
          if (programWeights.length === 0) {
            return this.pWeightService.readByProgramId(action.programId).pipe(
              map((weights: PWeightModel[]) => {
                weights.forEach(pw => {
                  const dka = new DKAModel(allDKAs.find(dka => dka.id === pw.dkaId));
                  const dkag = new DKAGModel(allDKAGs.find(dkag => dkag.id === dka.dkagId));
                  pw.dkaName = dka.name;
                  pw.dkaIndex = dka.index;
                  pw.dkaDescription = dka.description;
                  pw.dkaFormattedIndex = dka.formattedIndex;
                  pw.dkagFormattedName = dkag.formattedName;
                });
                return ProgramActions.loadWeightsByProgramSuccess({ programId: action.programId, weights });
              })
            );
          } else {
            return of(ProgramActions.loadWeightsByProgramSuccess({ programId: action.programId, weights: programWeights }));
          }
        })
      ))
    )
  );

  updateProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.updateProgram),
      exhaustMap((action) => {
        return this.programService.update(action.program).pipe(
          map((program: ProgramModel) => {
            return ProgramActions.updateProgramSuccess({ program });
          })
        );
      })
    )
  );

  updateWeightByProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.updateWeightByProgram),
      exhaustMap((action) => {
        return this.pWeightService.update(action.weight).pipe(
          map((weight: PWeightModel) => {
            return ProgramActions.updateWeightByProgramSuccess({ programId: action.programId, weight });
          })
        );
      })
    )
  );

  removeProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramActions.removeProgram),
      exhaustMap((action) => {
        return this.programService.delete(action.programId).pipe(
          map(() => {
            return ProgramActions.removeProgramSuccess({ programId: action.programId });
          })
        );
      })
    )
  );

}
