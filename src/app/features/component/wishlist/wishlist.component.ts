import { product } from './../../../shared/interfaces/product';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { AuthService } from '../../../core/services/auth/register.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  imports: [LoaderComponent,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  _ProductService = inject(ProductService);
  _platformId = inject(PLATFORM_ID);
  _auth = inject(AuthService);
  products: product[] = [];
  _toaster = inject(ToastrService);
  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._ProductService
        .getAllWishList()
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
      .addTocart(id)
      .subscribe({
        next: (res: any) => {
          this._toaster.success('success',"added to cart");
          this._ProductService.CartItemsCount.next(res.numOfCartItems);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  removeFromWatchList(id: string) {
    this.products = this.products.filter((el) => el._id !== id);
    this._ProductService
      .removeFromWishList(id)
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
