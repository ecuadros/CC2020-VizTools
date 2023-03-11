import { createAction, props } from '@ngrx/store';
import { DisciplineModel, DWeightModel } from '@core/models';



const addDiscipline = createAction(
  '[Discipline] Add Discipline',
  props<{ discipline: DisciplineModel }>()
);

const addDisciplineSuccess = createAction(
  '[Discipline] Add Discipline Success',
  props<{ discipline: DisciplineModel }>()
);

const loadDisciplines = createAction(
  '[Discipline] Load Disciplines'
);

const loadDisciplinesSuccess = createAction(
  '[Discipline] Load Disciplines Success',
  props<{ disciplines: DisciplineModel[] }>()
);

const loadDisciplinesByMultipleIds = createAction(
  '[Discipline] Load Disciplines By Multiple Ids',
  props<{ disciplineIds: number[], includeWeights: boolean }>()
);

const loadDisciplinesByMultipleIdsSuccess = createAction(
  '[Discipline] Load Disciplines By Multiple Ids Success',
  props<{ disciplines: DisciplineModel[] }>()
);

const loadWeightsByDiscipline = createAction(
  '[Discipline] Load Weights By Discipline',
  props<{ disciplineId: number }>()
);

const loadWeightsByDisciplineSuccess = createAction(
  '[Discipline] Load Weights By Discipline Success',
  props<{ disciplineId: number, weights: DWeightModel[] }>()
);

const updateDiscipline = createAction(
  '[Discipline] Update Discipline',
  props<{ discipline: DisciplineModel }>()
);

const updateDisciplineSuccess = createAction(
  '[Discipline] Update Discipline Success',
  props<{ discipline: DisciplineModel }>()
);

const removeDiscipline = createAction(
  '[Discipline] Remove Discipline',
  props<{ disciplineId: number }>()
);

const removeDisciplineSuccess = createAction(
  '[Discipline] Remove Discipline Success',
  props<{ disciplineId: number }>()
);

export const DisciplineActions = {
  addDiscipline,
  addDisciplineSuccess,
  loadDisciplines,
  loadDisciplinesSuccess,
  loadDisciplinesByMultipleIds,
  loadDisciplinesByMultipleIdsSuccess,
  loadWeightsByDiscipline,
  loadWeightsByDisciplineSuccess,
  updateDiscipline,
  updateDisciplineSuccess,
  removeDiscipline,
  removeDisciplineSuccess,
};
