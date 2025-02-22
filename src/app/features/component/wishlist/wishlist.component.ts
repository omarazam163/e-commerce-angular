import { product } from './../../../shared/interfaces/product';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
@Component({
  selector: 'app-wishlist',
  imports: [LoaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  _ProductService = inject(ProductService);
  _platformId = inject(PLATFORM_ID);
  products: product[] = [];
  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._ProductService
        .getAllwatchList(localStorage.getItem('token') || '')
        .subscribe({
          next: (res: any) => {
            this.products = res.data;
          },
          error: (err: any) => {
            console.log(err);
          },
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
          console.log(err);
        },
      });
  }

  removeFromWatchList(id: string) {
    this.products = this.products.filter((el) => el._id !== id);
    this._ProductService
      .removeFromWatchList(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          console.log('success');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
