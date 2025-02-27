import { Category } from './../../shared/interfaces/category';
import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../../shared/interfaces/product';
import { brand } from '../../shared/interfaces/brand';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(value: product[], searchValue: string,catName:string='all',brand:string='all',minVal:number=0,maxVal:number=50000): product[] {
    console.log(catName);
    return value.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase()) 
      && (catName=='all' || item.category.name===catName)
      && (brand=='all' || item.brand.name===brand)
      && (item.price>=minVal && item.price<=maxVal)
      ;
    });
  }
}
