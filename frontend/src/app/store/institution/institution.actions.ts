import { InstitutionModel } from '@core/models';
import { createAction, props } from '@ngrx/store';



const loadInstitutionsByCountry = createAction(
  '[Institution] Load Institutions By Country',
  props<{ countryId: number }>()
);

const loadInstitutionsByCountrySuccess = createAction(
  '[Institution] Load Institutions By Country Success',
  props<{ institutions: InstitutionModel[] }>()
);

export const InstitutionActions = {
  loadInstitutionsByCountry,
  loadInstitutionsByCountrySuccess
};
