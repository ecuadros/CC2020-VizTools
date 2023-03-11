import { createReducer, on } from '@ngrx/store';
import { DKAGActions } from './dkag.actions';
import { DKAGState } from './dkag.state';



const initialState: DKAGState = {
  dkags: []
};

export const DKAGReducer = createReducer(
  initialState,
  on(DKAGActions.addDKAGSuccess, (state, action) => {
    return {
      ...state,
      dkags: [...state.dkags, action.dkag]
    };
  }),
  on(DKAGActions.loadDKAGsSuccess, (state, action) => {
    return {
      ...state,
      dkags: action.dkags
    };
  }),
  on(DKAGActions.updateDKAGSuccess, (state, action) => {
    return {
      ...state,
      dkags: state.dkags.map(d => d.id === action.dkag.id ? action.dkag : d)
    };
  }),
  on(DKAGActions.removeDKAGSuccess, (state, action) => {
    return {
      ...state,
      dkags: state.dkags.filter(d => d.id !== action.dkagId)
    };
  })
);
