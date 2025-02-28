import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { RatingComponent } from '../rating/rating.component';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-single-product',
  imports: [LoaderComponent, RatingComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export class SingleProductComponent {
  @ViewChild('mainview') mainImage!: ElementRef<HTMLImageElement>;
  _activatedRoute = inject(ActivatedRoute);
  _ProductService = inject(ProductService);
  _authService = inject(AuthService);
  _router = inject(Router);
  _auth = inject(AuthService);
  _toastr = inject(ToastrService);
  isLogin: boolean = false;
  product!: product;
  WatchList = new Set();
  ngOnInit(): void {
    const id: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    this._ProductService.getSingleProduct(id).subscribe({
      next: (res: any) => {
        this.product = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._auth.isLogin.subscribe((res) => {
      this.isLogin = res;
      this._ProductService;
      if (this.isLogin) {
        this._ProductService.getAllWishList().subscribe({
          next: (res: any) => {
            res.data.forEach((element: any) => {
              this.WatchList.add(element._id);
            });
          },
          error: (err: any) => {
            this.WatchList.clear();
          },
        });
      }
    });
  }

  changeImage(num: number) {
    this.mainImage.nativeElement.src = this.product.images[num];
  }

  addToCart(id: string) {
    this._ProductService.addTocart(id).subscribe({
      next: (res: any) => {
        this._toastr.success('success', 'Added to cart');
        this._ProductService.CartItemsCount.next(res.numOfCartItems);
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
    this._ProductService.addToWishList(id).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        this._router.navigate(['/signin']);
      },
    });
  }

  removeFromWatchList(id: string) {
    this.WatchList.delete(id);
    this._ProductService.removeFromWishList(id).subscribe({
      next: (res) => {

      },
      error: (err: any) => {
        this._router.navigate(['/signin']);
      },
    });
  }
}
