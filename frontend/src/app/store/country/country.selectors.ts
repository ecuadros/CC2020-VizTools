import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.state';



const selectCountryState = createFeatureSelector<CountryState>('country');

const selectCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state.countries
);

export const CountrySelector = {
  selectCountries
};
