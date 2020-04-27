import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(res => {
      if (res.status == 200) {
        localStorage.setItem('user', res.body.data)
        // this.router.navigate(['/user']);
      }
    })
  }
}
