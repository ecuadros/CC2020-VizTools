import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DKAState } from './dka.state';



const selectDKAState = createFeatureSelector<DKAState>('dka');

const selectDKAs = createSelector(
  selectDKAState,
  (state: DKAState) => state.dkas
);

export const DKASelector = {
  selectDKAs
};
