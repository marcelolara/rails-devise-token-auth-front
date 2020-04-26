import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  register(user: User):Observable<any> {
    let api = `${this.endpoint}/auth`;
    return this.http.post(api, user)
  }
}
