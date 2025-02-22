import { Component,inject,PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../../core/services/product/orders.service';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode} from "jwt-decode"
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
@Component({
  selector: 'app-orders',
  imports: [LoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  _ordersService = inject(OrdersService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);
  orders: any[] = [];
  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let clientId: any = jwtDecode(localStorage.getItem('token') || '');
      this._ordersService.getAllOrders(clientId.id).subscribe({
        next: (res: any) => {
          this.orders = res;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  formatDate(date: any) {
    return new Date(date).toDateString();
  }

  showOrderDetails(index: number) {
    this._ordersService.singleOrder = this.orders[index];
    this._Router.navigate(['singleorder']);
  }
}
