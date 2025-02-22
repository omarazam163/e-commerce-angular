import { Component, inject, Input } from '@angular/core';
import { OrdersService } from '../../../core/services/product/orders.service';
import { cartProduct } from '../../../shared/interfaces/cart-product';
@Component({
  selector: 'app-single-order',
  imports: [],
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.scss',
})
export class SingleOrderComponent {
  _OrdersService = inject(OrdersService);
  order = this._OrdersService.singleOrder;
  orderItems:cartProduct[] = this.order.cartItems;
  formattedDate= new Date(this.order.createdAt).toLocaleString();
  ngOnInit() {
    console.log(this.orderItems);
  }


}
