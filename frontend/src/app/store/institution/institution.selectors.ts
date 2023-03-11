import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InstitutionState } from './institution.state';



const selectInstitutionState = createFeatureSelector<InstitutionState>('institution');

const selectInstitutionsByCountry = (props: { countryId: number }) => createSelector(
  selectInstitutionState,
  (state: InstitutionState) => state.institutions.filter(i => i.countryId === props.countryId)
);

export const InstitutionSelector = {
  selectInstitutionsByCountry
};
