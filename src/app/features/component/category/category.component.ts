import { Component,inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Category } from '../../../shared/interfaces/category';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
@Component({
  selector: 'app-category',
  imports: [LoaderComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  _productSerivce = inject(ProductService);
  categories = signal<Category[]>([]);
  ngOnInit()
  {
    this._productSerivce.getAllCategories().subscribe((res: any) => {
      this.categories.set(res.data);
    })
  }
}
