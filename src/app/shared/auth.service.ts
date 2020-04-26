import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Register a new user
   * @param user, User object to register with email and password
   * return Observable json
   */
  register(user: User):Observable<any> {
    let api = `${this.endpoint}/auth`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
   * Manage Client side and server errors
   * @param error
   */
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      msg = error.error.message;
    } else {
      // Server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
