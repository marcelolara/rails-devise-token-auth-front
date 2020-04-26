import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.registrationForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  registerUser() {
    this.auth.register(this.registrationForm.value).subscribe(res => {
        console.log(res);
      }
    )
  }
}
