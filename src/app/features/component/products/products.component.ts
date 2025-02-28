import { Category } from './../../../shared/interfaces/category';
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../../../core/services/auth/register.service';
import { ProductService } from '../../../core/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { SearchPipePipe } from '../../../core/pipes/search-pipe.pipe';
import { brand } from '../../../shared/interfaces/brand';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgxSliderModule,
    CardComponent,
    LoaderComponent,
    SearchPipePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
 export class ProductsComponent {
  //options for the ngx slider
  minValue: number = 50;
  maxValue: number = 50000;
  readonly options: Options = {
    floor: 0,
    ceil: 50000,
    step: 1500,
    };

  // services
  _auth = inject(AuthService);
  _productSerivce = inject(ProductService);
  _pId = inject(PLATFORM_ID);
  products = signal<product[]>([]);
  Categories = signal<Category[]>([]);
  islogin = signal<boolean>(false);
  sideBarOpen = signal<boolean>(true);
  wishList = new Set<string>();
  brands = signal<brand[]>([]);
  isbrower: boolean = false;

  //filter
  SelectedCat = signal<string>('all');
  searchWord = signal<string>('');
  selectedBrand = signal<string>('all');

  //accordion
  accordion = signal<boolean>(false);
  ngOnInit() {
    this._auth.isLogin.subscribe((res) => {
      this.islogin.set(res);
      if (this.islogin()) {
        this._productSerivce.getAllWishList().subscribe({
          next: (res: any) => {
            res.data.forEach((element: any) => {
              this.wishList.add(element._id);
            });
          },

          error: (err: any) => {
            this.wishList.clear();
          },
        });
      }
      this.isbrower = isPlatformBrowser(this._pId);
    });

    this._productSerivce.getAllproducts().subscribe((res: any) => {
      this.products.set(res.data);
    });

    this._productSerivce.getAllCategories().subscribe((res: any) => {
      this.Categories.set(res.data);
    });

    this._productSerivce.getAllBrands().subscribe((res: any) => {
      this.brands.set(res.data);
    });
  }
  WishListEcentHandler(event: string) {
    if (this.wishList.has(event)) {
      this.wishList.delete(event);
    } else {
      this.wishList.add(event);
    }
  }
}
