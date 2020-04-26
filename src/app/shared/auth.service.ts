import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/auth'

  constructor(
    private http: HttpClient
  ) { }

  login( user: User ): Observable<any> {
    return this.http.post(`${ this.endpoint }/sign_in`, user)
      .pipe(catchError(this.handleError))
  }

  /**
   * Register a new user
   * @param user, User object to register with email and password
   * return Observable json
   */
  register( user: User ): Observable<any> {
    return this.http.post(this.endpoint, user)
      .pipe(catchError(this.handleError))
  }

  /**
   * Manage Client side and server errors
   * @param error
   */
  handleError( error: HttpErrorResponse ) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      msg = error.error.message;
    } else {
      // Server-side error
      msg = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
    }
    return throwError(msg);
  }
}
