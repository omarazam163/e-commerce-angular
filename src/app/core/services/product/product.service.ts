import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpClient = inject(HttpClient);
  constructor() {}
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

  addTocart(id: string, token: string) {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  addToWatchList(id: string, token: string) {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  getAllwatchList(token: string) {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        headers: {
          token: token,
        },
      }
    );
  }

  removeFromWatchList(id: string, token: string) {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  getCart(token: string) {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: token,
      },
    });
  }

  updateCart(id: string, count: number) {
    const token = localStorage.getItem('token') || '';
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  removeACartItem(id: string) {
    const token = localStorage.getItem('token') || '';
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  createAnOnlineSession(data: any, cartId: string) {
    const token: string = localStorage.getItem('token') || '';
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/orders`,
      data,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  createCashOrder(data: any, cartId: string) {
    const token: string = localStorage.getItem('token') || '';
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      data,
      {
        headers: {
          token: token,
        },
      }
    );
  }
}
