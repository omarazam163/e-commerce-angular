import { Component,inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import {ReactiveFormsModule,FormGroup, FormControl, Validators} from "@angular/forms"
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  _register = inject(AuthService);
  _router = inject(Router);
  EmailAlreadyExists = false;
  isLoading: boolean = false;
  reactiveForms = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPass
  );
  confirmPass(form: any) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null;
    } else {
      return { didNotMatch: true };
    }
  }
  getData(f: any) {
    
    if(this.reactiveForms.valid)
    {
      this.isLoading=true;
      this._register.register(f.value).subscribe({
        next: (res) => {
          console.log(res);
          this.EmailAlreadyExists = false;
          this.isLoading=false;
          this._router.navigate(['/signin']);
        },
        error: (err) => {
          this.EmailAlreadyExists=true;
          this.isLoading=false;
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }
}
