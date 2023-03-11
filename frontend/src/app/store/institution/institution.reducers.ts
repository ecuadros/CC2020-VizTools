import { createReducer, on } from '@ngrx/store';
import { InstitutionActions } from './institution.actions';
import { InstitutionState } from './institution.state';



const initialState: InstitutionState = {
  institutions: []
};

export const InstitutionReducer = createReducer(
  initialState,
  on(InstitutionActions.loadInstitutionsByCountrySuccess, (state, action) => ({
    ...state,
    institutions: [...state.institutions, ...action.institutions]
  }))
);
