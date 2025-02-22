import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input() rating: number = 0;
  numberOfStars: number[] = [];
  numberOfHalfStars: number = 1;
  numberOfNoStars: number[] = [];
  ngOnInit() {
    this.CalcStars();
  }
  CalcStars() {
    const numberOfStars = Math.floor(this.rating);
    this.numberOfHalfStars = this.rating - numberOfStars >= 0.5 ? 1 : 0;
    const numberOfNoStars = 5 - numberOfStars - this.numberOfHalfStars;
    for (let i = 0; i < numberOfStars; i++) {
      this.numberOfStars.push(1);
    }
    for (let i = 0; i < numberOfNoStars; i++) {
      this.numberOfNoStars.push(1);
    }
  }
}
