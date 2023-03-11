import { createReducer, on } from '@ngrx/store';
import { CountryActions } from './country.actions';
import { CountryState } from './country.state';

const initialState: CountryState = {
  countries: []
};

export const CountryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountriesSuccess, (state, action) => {
    return {
      ...state,
      countries: action.countries
    };
  }
  )
);
