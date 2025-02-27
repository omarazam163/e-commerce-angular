import { Component, Input, Output, signal } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slider-cat',
  imports: [CarouselModule, LoaderComponent,CommonModule],
  templateUrl: './slider-cat.component.html',
  styleUrl: './slider-cat.component.scss',
})
export class SliderCatComponent {
  @Output() sendNameOfCat = new EventEmitter();
  activeName = signal('all');
  sendName(name: string) {
    this.sendNameOfCat.emit(name);
    this.activeName.set(name);
  }

  @Input() Categories!: Category[];
  customOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
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
}
