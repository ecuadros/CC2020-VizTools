import { ProgramModel, PWeightModel } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import { ProgramActions } from './program.actions';
import { ProgramState } from './program.state';



const initialState: ProgramState = {
  programs: []
};

export const ProgramReducer = createReducer(
  initialState,
  on(ProgramActions.addProgramSuccess, (state, action) => {
    return {
      ...state,
      programs: [...state.programs, action.program]
    };
  }),
  on(ProgramActions.loadProgramsByMultipleIdsSuccess, (state, action) => {
    return {
      ...state,
      programs: [...state.programs, ...action.programs]
    };
  }),
  on(ProgramActions.loadProgramsByInstitutionSuccess, (state, action) => {
    return {
      ...state,
      programs: [...state.programs, ...action.programs]
    };
  }),
  on(ProgramActions.loadWeightsByProgramSuccess, (state, action) => {
    return {
      ...state,
      programs: state.programs.map(p => p.id === action.programId ? new ProgramModel({ ...p, weights: action.weights }) : p)
    };
  }),
  on(ProgramActions.updateProgramSuccess, (state, action) => {
    return {
      ...state,
      programs: state.programs.map(p => p.id === action.program.id ? action.program : p)
    };
  }),
  on(ProgramActions.updateWeightByProgramSuccess, (state, action) => {
    return {
      ...state,
      programs: state.programs.map(p => p.id === action.programId ? new ProgramModel({ ...p, weights: p.weights.map(w => w.id === action.weight.id ? new PWeightModel({ ...w, value: action.weight.value }) : w) }) : p)
    };
  }),
  on(ProgramActions.removeProgramSuccess, (state, action) => {
    return {
      ...state,
      programs: state.programs.filter(p => p.id !== action.programId)
    };
  })
);
