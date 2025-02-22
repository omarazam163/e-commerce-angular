import { product } from './../../../shared/interfaces/product';
import { sign } from 'crypto';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../../shared/interfaces/register';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../product/product.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);
  _ProductService = inject(ProductService);
  isLogin = new BehaviorSubject<boolean>(false);
  platformId = inject(PLATFORM_ID);
  name = new BehaviorSubject<string>('');
  emailFromSignIn: string = '';
  emailToResetPassword: string = '';
  wishLIstItems =new  BehaviorSubject<product[]>([]);
  Cart = new  BehaviorSubject<any>({});

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.verifyToken(localStorage.getItem('token') ?? '').subscribe({
          next: (res) => {
            this.name.next(res.decoded.name);
            this.isLogin.next(true);
            this._ProductService;
          },
          error: (err) => {
            this.isLogin.next(false);
          },
        });
      } else {
        this.isLogin.next(false);
      }
    }
  }

  verifyToken(t: string): Observable<any> {
    return this._http.get(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
      {
        headers: {
          token: t,
        },
      }
    );
  }

  getWishList() {
    this._ProductService
      .getAllwatchList(localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          this.wishLIstItems.next(res.data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getCart() {
    this._ProductService.getCart(localStorage.getItem('token') || '').subscribe({
      next: (res: any) => {
        this.Cart.next(res.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  register(data: Register): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  signIn(data: any) {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      data
    );
  }

  forgotPassword(data: any) {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }

  VirifyResetCode(code: string) {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      { resetCode: code }
    );
  }

  resetPassword(newPassword: string) {
    return this._http.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      { email: this.emailToResetPassword, newPassword: newPassword }
    );
  }
}
