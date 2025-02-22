import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  Message: string = '';
  loading: boolean = false;
  _register = inject(AuthService);
  _Router = inject(Router);
  reactiveForms = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  getData(form: any) {
    if (this.reactiveForms.valid) {
      this.loading = true;
      this._register.signIn(form.value).subscribe({
        next: (res: any) => {
          this.Message = 'welcome Back';
          this._Router.navigate(['/home']);
          localStorage.setItem('token', res.token);
          // let decodedToken = jwtDecode(res.token);
          this._register.isLogin.next(true);
          this._register.name.next(res.user.name);
          this.loading = false;
        },
        error: (err) => {
          this.Message = 'Invalid email or password';
          this.loading = false;
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }

  saveEmail() {
    if (this.reactiveForms.get('email')?.valid) {
      this._register.emailFromSignIn =
        this.reactiveForms.get('email')?.value || '';
    }
  }
}
