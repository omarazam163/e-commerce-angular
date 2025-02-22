import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-password.component.html',
  styleUrl: './verify-reset-password.component.scss',
})
export class VerifyResetPasswordComponent {
  isLoading: boolean = false;
  _auth = inject(AuthService);
  _router = inject(Router);
  isInvalidCode: boolean = false;
  formgroup = new FormGroup({
    1: new FormControl(null, [Validators.required]),
    2: new FormControl(null, [Validators.required]),
    3: new FormControl(null, [Validators.required]),
    4: new FormControl(null, [Validators.required]),
    5: new FormControl(null, [Validators.required]),
    6: new FormControl(null, [Validators.required]),
  });

  oninput(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const inputElement = event.target as HTMLInputElement;
      (inputElement.previousElementSibling as HTMLInputElement | null)?.focus();
    } else {
      const inputElement = event.target as HTMLInputElement;
      (inputElement.nextElementSibling as HTMLInputElement | null)?.focus();
    }
  }

  submitVerifyCode(FormGroup: any) {
    if (FormGroup.valid) {
      this.isLoading = true;
      let code:string="";
      for (let i = 1; i <= 6; i++) code+=this.formgroup.get(i.toString())?.value;
      this._auth.VirifyResetCode(code).subscribe(
        {
          next:(res)=>{
            this.isLoading=false;
            this.isInvalidCode=false;
            this._router.navigate(["/reset-password/new-password"]);
          },
          error:(err)=>{
            this.isLoading=false;
            this.isInvalidCode=true;
          }
        }
      )
    }
  }
}
