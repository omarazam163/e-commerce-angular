import { Category } from './../../../shared/interfaces/category';
import { product } from './../../../shared/interfaces/product';
import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { SliderCatComponent } from '../slider-cat/slider-cat.component';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipePipe } from '../../../core/pipes/search-pipe.pipe';
import { map } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [
    LoaderComponent,
    SliderCatComponent,
    FormsModule,
    SearchPipePipe,
    CardComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchWord: string = '';
  _ProductService = inject(ProductService);
  _auth = inject(AuthService);
  products: product[] = [];
  Categories: Category[] = [];
  _PLATFORM_ID = inject(PLATFORM_ID);
  islogin: boolean = false;
  _router = inject(Router);
  WatchList = new Set();
  CategoryFilter = signal<string>('all');
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._ProductService.getAllproducts().subscribe({
        next: (res: any) => {
          this.products = res.data;
        },
      });

      this._ProductService
        .getAllCategories()
        .pipe(
          map((data: any) => {
            let all: Category = {
              _id: 'all',
              name: 'all',
              slug: 'all',
              image: 'images/all.png',
            };
            data.data.unshift(all);
            return data;
          })
        )
        .subscribe({
          next: (res: any) => {
            this.Categories = res.data;
          },
        });

      this._auth.isLogin.subscribe((res) => {
        this.islogin = res;
        if (res) {
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
  }

  recieveCat(category: string) {
    this.CategoryFilter.set(category);
  }

  WishListEcentHandler(event: string) {
    if (this.WatchList.has(event)) {
      this.WatchList.delete(event);
    } else {
      this.WatchList.add(event);
    }
  }
}
