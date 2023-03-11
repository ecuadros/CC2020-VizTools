import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DisciplineState } from './discipline.state';



const selectDisciplineState = createFeatureSelector<DisciplineState>('discipline');

const selectDisciplines = createSelector(
  selectDisciplineState,
  (state: DisciplineState) => state.disciplines
);

const selectDisciplinesByMultipleIds = (props: { disciplineIds: number[] }) => createSelector(
  selectDisciplineState,
  (state: DisciplineState) => state.disciplines.filter(d => props.disciplineIds.includes(d.id))
);

const selectWeightsByDiscipline = (props: { disciplineId: number }) => createSelector(
  selectDisciplineState,
  (state: DisciplineState) => state.disciplines.find(d => d.id === props.disciplineId)?.weights ?? []
);

export const DisciplineSelector = {
  selectDisciplines,
  selectDisciplinesByMultipleIds,
  selectWeightsByDiscipline
};
