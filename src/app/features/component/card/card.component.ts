import { Component, EventEmitter, inject, Input, input, Output, PLATFORM_ID, signal } from '@angular/core';
import { product } from '../../../shared/interfaces/product';
import { RatingComponent } from '../rating/rating.component';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { AuthService } from '../../../core/services/auth/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card',
  imports: [RatingComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: product;
  @Input() islogin: boolean = false;
  @Input() inWishlist:boolean=false;
  @Output() AddToWishListSet= new EventEmitter<string>();
  _ProductService = inject(ProductService);
  _auth = inject(AuthService);
  products: product[] = [];
  _PLATFORM_ID = inject(PLATFORM_ID);
  _router = inject(Router);
  WatchlistLoading: boolean = false;
  toastr = inject(ToastrService);
  addToCart(id: string) {
    this._ProductService.addTocart(id).subscribe({
      next: (res: any) => {
        this._ProductService.CartItemsCount.next(res.numOfCartItems);
        this.toastr.success('success', 'Added to cart');
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
    this.AddToWishListSet.emit(id);
    this._ProductService.addToWishList(id).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        this._router.navigate(['/signin']);
        this.WatchlistLoading = false;
      },
    });
  }

  removeFromWatchList(id: string) {
    this.AddToWishListSet.emit(id);
    this._ProductService.removeFromWishList(id).subscribe({
      next: (res) => {
        console.log('success');
      },
      error: (err: any) => {
        this._router.navigate(['/signin']);
      },
    });
  }
}
