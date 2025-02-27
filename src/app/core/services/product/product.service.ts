import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/register.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpClient = inject(HttpClient);
  _authService = inject(AuthService);
  wishLIstItemsNumber = new BehaviorSubject<number>(0);
  CartItemsCount = new BehaviorSubject<number>(0);
  constructor() {
    this._authService.isLogin.subscribe({
      next: (res) => {
        if (res) {
          this.getWishListNumber();
          this.getCartCount();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getWishListNumber() {
    this.getAllWishList().subscribe({
      next: (res: any) => {
        this.wishLIstItemsNumber.next(res.data.length);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCartCount() {
    this.getCart().subscribe({
      next: (res: any) => {
        this.CartItemsCount.next(res.numOfCartItems);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllproducts() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

  getAllCategories() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }

  getSingleProduct(id: string) {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  addTocart(id: string) {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      }
    );
  }

  addToWishList(id: string) {
    this.wishLIstItemsNumber.next(this.wishLIstItemsNumber.value + 1);
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }

  getAllWishList() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }

  removeFromWishList(id: string) {
    this.wishLIstItemsNumber.next(this.wishLIstItemsNumber.value - 1);
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }

  getCart() {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  updateCart(id: string, count: number, total: number) {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      }
    );
  }

  removeACartItem(id: string) {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  createAnOnlineSession(data: any, cartId: string) {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/orders`,
      data
    );
  }

  createCashOrder(data: any, cartId: string) {
    this.CartItemsCount.next(0);
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      data
    );
  }

  getAllBrands() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }
}
