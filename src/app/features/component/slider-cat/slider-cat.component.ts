import { Component, Input } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
@Component({
  selector: 'app-slider-cat',
  imports: [CarouselModule,LoaderComponent],
  templateUrl: './slider-cat.component.html',
  styleUrl: './slider-cat.component.scss',
})
export class SliderCatComponent {
  @Input() Categories!: Category[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit() {
    console.log(this.Categories);
  }
}
