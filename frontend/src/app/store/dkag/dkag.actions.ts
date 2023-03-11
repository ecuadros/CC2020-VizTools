import { createAction, props } from '@ngrx/store';
import { DKAGModel } from '@core/models';



const addDKAG = createAction(
  '[DKAG] Add DKAG',
  props<{ dkag: DKAGModel }>()
);

const addDKAGSuccess = createAction(
  '[DKAG] Add DKAG Success',
  props<{ dkag: DKAGModel }>()
);

const loadDKAGs = createAction(
  '[DKAG] Load DKAGs'
);

const loadDKAGsSuccess = createAction(
  '[DKAG] Load DKAGs Success',
  props<{ dkags: DKAGModel[] }>()
);

const updateDKAG = createAction(
  '[DKAG] Update DKAG',
  props<{ dkag: DKAGModel }>()
);

const updateDKAGSuccess = createAction(
  '[DKAG] Update DKAG Success',
  props<{ dkag: DKAGModel }>()
);

const removeDKAG = createAction(
  '[DKAG] Remove DKAG',
  props<{ dkagId: number }>()
);

const removeDKAGSuccess = createAction(
  '[DKAG] Remove DKAG Success',
  props<{ dkagId: number }>()
);

export const DKAGActions = {
  addDKAG,
  addDKAGSuccess,
  loadDKAGs,
  loadDKAGsSuccess,
  updateDKAG,
  updateDKAGSuccess,
  removeDKAG,
  removeDKAGSuccess,
};
