import { createReducer, on } from '@ngrx/store';
import { DKAActions } from './dka.actions';
import { DKAState } from './dka.state';



const initialState: DKAState = {
  dkas: []
};

export const DKAReducer = createReducer(
  initialState,
  on(DKAActions.addDKASuccess, (state, action) => {
    return {
      ...state,
      dkas: [...state.dkas, action.dka]
    };
  }),
  on(DKAActions.loadDKAsSuccess, (state, action) => {
    return {
      ...state,
      dkas: action.dkas
    };
  }),
  on(DKAActions.updateDKASuccess, (state, action) => {
    return {
      ...state,
      dkas: state.dkas.map(d => d.id === action.dka.id ? action.dka : d)
    };
  }),
  on(DKAActions.removeDKASuccess, (state, action) => {
    return {
      ...state,
      dkas: state.dkas.filter(d => d.id !== action.dkaId)
    };
  })
);
