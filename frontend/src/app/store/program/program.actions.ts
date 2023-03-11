import { ProgramModel, PWeightModel } from '@core/models';
import { createAction, props } from '@ngrx/store';



const addProgram = createAction(
  '[Program] Add Program',
  props<{ program: ProgramModel }>()
);

const addProgramSuccess = createAction(
  '[Program] Add Program Success',
  props<{ program: ProgramModel }>()
);

const loadProgramsByMultipleIds = createAction(
  '[Program] Load Programs By Multiple Ids',
  props<{ programIds: number[], includeWeights: boolean }>()
);

const loadProgramsByMultipleIdsSuccess = createAction(
  '[Program] Load Programs By Multiple Ids Success',
  props<{ programs: ProgramModel[] }>()
);

const loadProgramsByInstitution = createAction(
  '[Program] Load Programs By Institution',
  props<{ institutionId: number }>()
);

const loadProgramsByInstitutionSuccess = createAction(
  '[Program] Load Programs By Institution Success',
  props<{ programs: ProgramModel[] }>()
);

const loadWeightsByProgram = createAction(
  '[Program] Load Weights By Program',
  props<{ programId: number }>()
);

const loadWeightsByProgramSuccess = createAction(
  '[Program] Load Weights By Program Success',
  props<{ programId: number, weights: PWeightModel[] }>()
);

const updateProgram = createAction(
  '[Program] Update Program',
  props<{ program: ProgramModel }>()
);

const updateProgramSuccess = createAction(
  '[Program] Update Program Success',
  props<{ program: ProgramModel }>()
);

const updateWeightByProgram = createAction(
  '[Program] Update Weight By Program',
  props<{ programId: number, weight: PWeightModel }>()
);

const updateWeightByProgramSuccess = createAction(
  '[Program] Update Weight By Program Success',
  props<{ programId: number, weight: PWeightModel }>()
);

const removeProgram = createAction(
  '[Program] Remove Program',
  props<{ programId: number }>()
);

const removeProgramSuccess = createAction(
  '[Program] Remove Program Success',
  props<{ programId: number }>()
);

export const ProgramActions = {
  addProgram,
  addProgramSuccess,
  loadProgramsByMultipleIds,
  loadProgramsByMultipleIdsSuccess,
  loadProgramsByInstitution,
  loadProgramsByInstitutionSuccess,
  loadWeightsByProgram,
  loadWeightsByProgramSuccess,
  updateProgram,
  updateProgramSuccess,
  updateWeightByProgram,
  updateWeightByProgramSuccess,
  removeProgram,
  removeProgramSuccess
};
