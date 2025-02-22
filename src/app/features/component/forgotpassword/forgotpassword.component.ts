import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/register.service';
@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  _register = inject(AuthService);
  emailFromSignIn = this._register.emailFromSignIn;
  _router = inject(Router);
  isLoading: boolean = false;
  formgroup = new FormGroup({
    email: new FormControl(this.emailFromSignIn, [Validators.required, Validators.email]),
  });
  emailNotExist = false;
  sendData(formgroup: FormGroup) {
    if (formgroup.valid) {
      this.isLoading = true;
      this._register.forgotPassword(formgroup.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.emailNotExist = false;
          this._register.emailToResetPassword = formgroup.get('email')?.value;
          this._router.navigate(["/reset-password/verify"]);
        },
        error: (err) => {
          this.isLoading = false;
          this.emailNotExist = true;
        },
      });
    }
  }
  
}
