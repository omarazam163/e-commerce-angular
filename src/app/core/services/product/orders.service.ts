import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  _http = inject(HttpClient);
  singleOrder:any;
  constructor() { }
  getAllOrders(id:string){
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }
}
