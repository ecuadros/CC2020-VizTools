import { Injectable } from '@angular/core';
import { DisciplineModel, DWeightModel } from '@core/models';
import { Store } from '@ngrx/store';
import { DisciplineActions } from '@store/discipline/discipline.actions';
import { DisciplineSelector } from '@store/discipline/discipline.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectDisciplines(): Observable<DisciplineModel[]> {
    this.load();
    return this.store.select(DisciplineSelector.selectDisciplines);
  }

  selectDisciplinesByMultipleIds(disciplineIds: number[], includeWeights: boolean): Observable<DisciplineModel[]> {
    this.loadProgramsByMultipleIds(disciplineIds, includeWeights);
    return this.store.select(DisciplineSelector.selectDisciplinesByMultipleIds({ disciplineIds }));
  }

  selectWeightsByDiscipline(disciplineId: number): Observable<DWeightModel[]> {
    this.loadWeightsByDiscipline(disciplineId);
    return this.store.select(DisciplineSelector.selectWeightsByDiscipline({ disciplineId }));
  }

  add(discipline: DisciplineModel) {
    this.store.dispatch(DisciplineActions.addDiscipline({ discipline }));
  }

  load() {
    this.store.dispatch(DisciplineActions.loadDisciplines());
  }

  loadProgramsByMultipleIds(disciplineIds: number[], includeWeights: boolean) {
    this.store.dispatch(DisciplineActions.loadDisciplinesByMultipleIds({ disciplineIds, includeWeights }));
  }

  loadWeightsByDiscipline(disciplineId: number) {
    this.store.dispatch(DisciplineActions.loadWeightsByDiscipline({ disciplineId }));
  }

  update(discipline: DisciplineModel) {
    this.store.dispatch(DisciplineActions.updateDiscipline({ discipline }));
  }

  remove(disciplineId: number) {
    this.store.dispatch(DisciplineActions.removeDiscipline({ disciplineId }));
  }

}
