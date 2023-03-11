import { Injectable } from '@angular/core';
import { ProgramModel, PWeightModel } from '@core/models';
import { Store } from '@ngrx/store';
import { ProgramActions } from '@store/program/program.actions';
import { ProgramSelector } from '@store/program/program.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectProgramsByInstitution(institutionId: number): Observable<ProgramModel[]> {
    this.loadProgramsByInstitution(institutionId);
    return this.store.select(ProgramSelector.selectProgramsByInstitution({ institutionId }));
  }

  selectProgramsByMultipleIds(programIds: number[], includeWeights: boolean): Observable<ProgramModel[]> {
    this.loadProgramsByMultipleIds(programIds, includeWeights);
    return this.store.select(ProgramSelector.selectProgramsByMultipleIds({ programIds }));
  }

  selectWeightsByProgram(programId: number): Observable<PWeightModel[]> {
    this.loadWeightsByProgram(programId);
    return this.store.select(ProgramSelector.selectWeightsByProgram({ programId }));
  }

  add(program: ProgramModel) {
    this.store.dispatch(ProgramActions.addProgram({ program }));
  }

  loadProgramsByMultipleIds(programIds: number[], includeWeights: boolean) {
    this.store.dispatch(ProgramActions.loadProgramsByMultipleIds({ programIds, includeWeights }));
  }

  loadProgramsByInstitution(institutionId: number) {
    this.store.dispatch(ProgramActions.loadProgramsByInstitution({ institutionId }));
  }

  loadWeightsByProgram(programId: number) {
    this.store.dispatch(ProgramActions.loadWeightsByProgram({ programId }));
  }

  update(program: ProgramModel) {
    this.store.dispatch(ProgramActions.updateProgram({ program }));
  }

  updateWeightByProgram(programId: number, weight: PWeightModel) {
    this.store.dispatch(ProgramActions.updateWeightByProgram({ programId, weight }));
  }

  remove(programId: number) {
    this.store.dispatch(ProgramActions.removeProgram({ programId }));
  }

}
