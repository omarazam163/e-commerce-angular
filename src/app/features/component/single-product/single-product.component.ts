import { Component,ElementRef,inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { RatingComponent } from "../rating/rating.component";
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
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
       this._ProductService
         .getAllwatchList(localStorage.getItem('token') || '')
         .subscribe({
           next: (res: any) => {
             res.data.forEach((element: any) => {
               this.WatchList.add(element._id);
             });
           },
           error: (err: any) => {
             this.WatchList.clear();
           },
         });
     });
  }

  changeImage(num: number) {
    console.log('here');
    this.mainImage.nativeElement.src = this.product.images[num];
  }

  addToCart(id: string) {
    this._ProductService
      .addTocart(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          console.log('success');
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
    this._ProductService
      .addToWatchList(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res: any) => {
          console.log('success');
        },
        error: (err: any) => {
          this._router.navigate(['/signin']);
        },
      });
  }

  removeFromWatchList(id: string) {
    this.WatchList.delete(id);
    this._ProductService
      .removeFromWatchList(id, localStorage.getItem('token') || '')
      .subscribe({
        next: (res) => {
          console.log('success');
        },
        error: (err: any) => {
          this._router.navigate(['/signin']);
        },
      });
  }
}
