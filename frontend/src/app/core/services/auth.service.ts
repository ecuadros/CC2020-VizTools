import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { AuthTokenModel, LoginModel, RegisterModel } from '@core/models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.apiUrl + '/auth/';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  static get token(): string {
    return AuthService.authToken.token || '';
  }

  static get authToken(): AuthTokenModel {
    return JSON.parse(localStorage.getItem('authtoken') || '{}') as AuthTokenModel;
  }

  login(login: LoginModel): Observable<AuthTokenModel> {
    this.logout();
    const url = this.BASE_URL + 'login';
    return this.http.post<AuthTokenModel>(url, login).pipe(
      tap((response: AuthTokenModel) => {
        localStorage.setItem('authtoken', JSON.stringify(response));
      }
      ));
  }

  register(register: RegisterModel): Observable<boolean> {
    this.logout();
    const url = this.BASE_URL + 'register';
    return this.http.post<boolean>(url, register);
  }

  logout(): void {
    localStorage.clear();
  }

  activateAccount(token: string): Observable<boolean> {
    const url = this.BASE_URL + 'activate-account/' + token;
    return this.http.get<boolean>(url);
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    const url = this.BASE_URL + 'reset-password/' + token;
    return this.http.post<boolean>(url, password);
  }

  forgotPassword(email: string): Observable<boolean> {
    const url = this.BASE_URL + 'forgot-password';
    return this.http.post<boolean>(url, email);
  }

  resendActivationEmail(email: string): Observable<boolean> {
    const url = this.BASE_URL + 'resend-activation-email';
    return this.http.post<boolean>(url, email);
  }

  isEmailRegistered(email: string): Observable<boolean> {
    const url = this.BASE_URL + 'is-email-registered';
    return this.http.post<boolean>(url, email);
  }

  isAuthenticated(): boolean {
    return AuthService.token.length > 0 && !this.jwtHelperService.isTokenExpired(AuthService.token);
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.jwtHelperService.decodeToken(AuthService.token).role === 'ADMIN' || false;
  }

  isUser(): boolean {
    return this.isAuthenticated() && this.jwtHelperService.decodeToken(AuthService.token).role === 'USER';
  }

}
