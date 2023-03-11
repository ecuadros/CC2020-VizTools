import { CountryModel } from '@core/models';
import { createAction, props } from '@ngrx/store';



const loadCountries = createAction(
  '[Country] Load Countries'
);

const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: CountryModel[] }>()
);

export const CountryActions = {
  loadCountries,
  loadCountriesSuccess
};
