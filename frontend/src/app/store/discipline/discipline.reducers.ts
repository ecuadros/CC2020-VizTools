import { DisciplineModel } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import { DisciplineActions } from './discipline.actions';
import { DisciplineState } from './discipline.state';



const initialState: DisciplineState = {
  disciplines: []
};

export const DisciplineReducer = createReducer(
  initialState,
  on(DisciplineActions.addDisciplineSuccess, (state, action) => {
    return {
      ...state,
      disciplines: [...state.disciplines, action.discipline]
    };
  }),
  on(DisciplineActions.loadDisciplinesSuccess, (state, action) => {
    return {
      ...state,
      disciplines: action.disciplines
    };
  }),
  on(DisciplineActions.loadDisciplinesByMultipleIdsSuccess, (state, action) => {
    return {
      ...state,
      disciplines: [...state.disciplines, ...action.disciplines]
    };
  }),
  on(DisciplineActions.loadWeightsByDisciplineSuccess, (state, action) => {
    return {
      ...state,
      disciplines: state.disciplines.map(d => d.id === action.disciplineId ? new DisciplineModel({ ...d, weights: action.weights }) : d)
    };
  }),
  on(DisciplineActions.updateDisciplineSuccess, (state, action) => {
    return {
      ...state,
      disciplines: state.disciplines.map(d => d.id === action.discipline.id ? action.discipline : d)
    };
  }),
  on(DisciplineActions.removeDisciplineSuccess, (state, action) => {
    return {
      ...state,
      disciplines: state.disciplines.filter(d => d.id !== action.disciplineId)
    };
  })
);
