import { LoginModel } from '@core/models';



export interface AuthState {
  loginData: LoginModel | null;
  isLoading: boolean;
  error: string | null;
}
