import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Router } from '@angular/router';
import { cartProduct } from '../../../shared/interfaces/cart-product';
import { isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports:[LoaderComponent,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart!: any;
  products: cartProduct[] = [];

  constructor(
    private _ProductService: ProductService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ Fixed: Explicitly defined type
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._ProductService
        .getCart(localStorage.getItem('token') || '')
        .subscribe({
          next: (res: any) => {
            this.cart = res;
            this.products = res.data.products;
            console.log(this.products);
          },
          error: (err: any) => {},
        });
    }
  }
  updateCart(id: string, count: number) {
    const product = this.products.find((el) => el.product._id === id);
    if (product) {
      if (count === 0) {
        this.products = this.products.filter((el) => el.product._id !== id);
      }
      else
      {
          product.count = count;
      }
    }
    this.cart.numOfCartItems = this.products.length;
    this.cart.data.totalCartPrice = this.products.reduce(
      (acc, el) => acc + el.price * el.count,
      0
    );
    this._ProductService.updateCart(id, count).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeFromCart(id: string) {
    this.products = this.products.filter((el) => el.product._id !== id);
    this.cart.numOfCartItems = this.products.length;
    this.cart.data.totalCartPrice = this.products.reduce(
          (acc, el) => acc + el.price * el.count,
          0
        );
    this._ProductService.removeACartItem(id).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
