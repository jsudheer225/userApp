import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/user/auth';
  private token = 'TestToken';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(formObj: any) {
    return this.http.post<any>(`${this.apiUrl}/signup`, {formObj}).pipe(
      tap((response) => {
        if(response && response.accessToken) {
          this.setToken(response.accessToken)
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { userName: email, password: password }).pipe(
      tap((response) => {
        if(response && response.accessToken) {
          this.setToken(response.accessToken)
          let userData = {
            userName: response.userName,
            displayName: response.displayName
          }
          this.setUserData(JSON.stringify(userData));
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  setUserData(userData: any) {
    localStorage.setItem('userData', userData)
  }

  getUserData(userData: any) {
    return localStorage.getItem('userData')
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
