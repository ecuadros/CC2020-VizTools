import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DKAGState } from './dkag.state';



const selectDKAGState = createFeatureSelector<DKAGState>('dkag');

const selectDKAGs = createSelector(
  selectDKAGState,
  (state: DKAGState) => state.dkags
);

export const DKAGSelector = {
  selectDKAGs
};
