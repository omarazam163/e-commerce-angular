import { product } from './../../../shared/interfaces/product';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { Category } from '../../../shared/interfaces/category';
import { SliderCatComponent } from '../slider-cat/slider-cat.component';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [LoaderComponent, SliderCatComponent, RouterLink, RatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  _ProductService = inject(ProductService);
  _auth = inject(AuthService);
  products: product[] = [];
  Categories: Category[] = [];
  _PLATFORM_ID = inject(PLATFORM_ID);
  islogin: boolean = false;
  _router = inject(Router);
  WatchList = new Set();
  WatchlistLoading: boolean = false;
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._ProductService.getAllproducts().subscribe({
        next: (res: any) => {
          this.products = res.data;
        },
      });
      this._ProductService.getAllCategories().subscribe({
        next: (res: any) => {
          this.Categories = res.data;
        },
      });
    

    this._auth.isLogin.subscribe((res) => {
      this.islogin = res;
      this._ProductService
        .getAllwatchList(localStorage.getItem('token') || '')
        .subscribe({
          next: (res: any) => {
            res.data.forEach((element: any) => {
              this.WatchList.add(element._id);
            });
          },
          error: (err: any) => {
            this.WatchList.clear();
          },
        });
    });
  }
  }
  addToCart(id: string) {
    this._ProductService
      .addTocart(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          console.log('success');
        },
        error: (err: any) => {
          this._router.navigate(['/signin']);
        },
      });
  }
  toSignIn() {
    this._router.navigate(['/signin']);
  }

  addToWatchList(id: string) {
    this.WatchList.add(id);
    this._ProductService
      .addToWatchList(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          console.log('success');
        },
        error: (err: any) => {
          this._router.navigate(['/signin']);
          this.WatchlistLoading = false;
        },
      });
  }

  removeFromWatchList(id:string)
  {
    this.WatchList.delete(id);
    this._ProductService.removeFromWatchList(
      id,
      localStorage.getItem('token') || ''
    ).subscribe({next:(res)=>{
      console.log('success');
    },
  error:(err:any)=>{
    this._router.navigate(['/signin']);
  }
  })
  }
}
