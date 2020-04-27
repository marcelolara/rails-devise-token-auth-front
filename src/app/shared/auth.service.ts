import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { User } from './user';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  login( user: User ): Observable<HttpResponse<any>> {
    return this.http.post(`${ this.urlBase }/sign_in`, user, {observe: 'response' })
      .pipe(
        map(res => {
          localStorage.setItem('access-token', res.headers.get('access-token'));
          localStorage.setItem('user', res.body['data']);
          return res
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Register a new user
   * @param user, User object to register with email and password
   * return Observable json
   */
  register( user: User ): Observable<any> {
    return this.http.post(this.urlBase, user)
      .pipe(catchError(this.handleError))
  }

  /**
   * Manage Client side and server errors
   * @param error
   */
  private handleError( error: HttpErrorResponse ) {
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
