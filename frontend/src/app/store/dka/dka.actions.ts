import { createAction, props } from '@ngrx/store';
import { DKAModel } from '@core/models';



const addDKA = createAction(
  '[DKA] Add DKA',
  props<{ dka: DKAModel }>()
);

const addDKASuccess = createAction(
  '[DKA] Add DKA Success',
  props<{ dka: DKAModel }>()
);

const loadDKAs = createAction(
  '[DKA] Load DKAs'
);

const loadDKAsSuccess = createAction(
  '[DKA] Load DKAs Success',
  props<{ dkas: DKAModel[] }>()
);

const updateDKA = createAction(
  '[DKA] Update DKA',
  props<{ dka: DKAModel }>()
);

const updateDKASuccess = createAction(
  '[DKA] Update DKA Success',
  props<{ dka: DKAModel }>()
);

const removeDKA = createAction(
  '[DKA] Remove DKA',
  props<{ dkaId: number }>()
);

const removeDKASuccess = createAction(
  '[DKA] Remove DKA Success',
  props<{ dkaId: number }>()
);

export const DKAActions = {
  addDKA,
  addDKASuccess,
  loadDKAs,
  loadDKAsSuccess,
  updateDKA,
  updateDKASuccess,
  removeDKA,
  removeDKASuccess,
};
