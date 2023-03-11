import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducers';
import { AuthState } from './auth/auth.state';
import { DKAGEffects } from './dkag/dkag.effects';
import { DKAGReducer } from './dkag/dkag.reducers';
import { DKAEffects } from './dka/dka.effects';
import { DKAReducer } from './dka/dka.reducers';
import { ProgramEffects } from './program/program.effects';
import { ProgramReducer } from './program/program.reducers';
import { DisciplineReducer } from './discipline/discipline.reducers';
import { DisciplineEffects } from './discipline/discipline.effects';
import { CountryReducer } from './country/country.reducers';
import { InstitutionReducer } from './institution/institution.reducers';
import { CountryEffects } from './country/country.effects';
import { InstitutionEffects } from './institution/institution.effects';



export interface RootState {
  auth: AuthState
}

export const appReducer = {
  auth: AuthReducer,
  country: CountryReducer,
  discipline: DisciplineReducer,
  dka: DKAReducer,
  dkag: DKAGReducer,
  institution: InstitutionReducer,
  program: ProgramReducer,
}

export const appEffects = [
  AuthEffects,
  CountryEffects,
  DisciplineEffects,
  DKAEffects,
  DKAGEffects,
  InstitutionEffects,
  ProgramEffects,
]
