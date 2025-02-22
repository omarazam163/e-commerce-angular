import { Component,inject} from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  isLoading:boolean = false;
  success:boolean = false;
  failure:boolean = false;
  _auth = inject(AuthService)
  _router = inject(Router);
  formgroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
  },this.passMatch);

  passMatch(form: any) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null;
    } else {
      return { didNotMatch: true };
    }
  }

  sendPassword(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this._auth.resetPassword(form.get('password')?.value).subscribe({
        next:()=>{
          this.isLoading = false;
          this.success = true;
          this.failure = false;
          this._auth.emailToResetPassword = '';
          this._auth.emailFromSignIn = '';
          this._router.navigate(["/signin"]);
        },
        error:()=>{
          this.isLoading = false;
          this.failure = true;
          this.success = false;
        }
      })
    }
  }
}
