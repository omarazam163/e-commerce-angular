import { Component,inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { brand } from '../../../shared/interfaces/brand';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-brands',
  imports: [LoaderComponent,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  _productService = inject(ProductService);
  brands = signal<brand[]>([]);
  ngOnInit()
  {
    this._productService.getAllBrands().subscribe({
      next: (res:any) => {
        this.brands.set(res.data);
      }
    });
  }
}
