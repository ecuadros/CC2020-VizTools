import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgramState } from './program.state';



const selectProgramState = createFeatureSelector<ProgramState>('program');

const selectProgramsByMultipleIds = (props: { programIds: number[] }) => createSelector(
  selectProgramState,
  (state: ProgramState) => state.programs.filter(p => props.programIds.includes(p.id))
);

const selectProgramsByInstitution = (props: { institutionId: number }) => createSelector(
  selectProgramState,
  (state: ProgramState) => state.programs.filter(p => p.institutionId === props.institutionId)
);

const selectWeightsByProgram = (props: { programId: number }) => createSelector(
  selectProgramState,
  (state: ProgramState) => state.programs.find(p => p.id === props.programId)?.weights ?? []
);

export const ProgramSelector = {
  selectProgramsByMultipleIds,
  selectProgramsByInstitution,
  selectWeightsByProgram
};
