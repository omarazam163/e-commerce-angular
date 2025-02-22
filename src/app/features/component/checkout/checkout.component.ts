import { Component,inject,PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from '../../../shared/component/loader/loader.component';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  imports: [LoaderComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  cartId: string = this._ActivatedRoute.snapshot.paramMap.get('cartId') || '';
  _ProductService = inject(ProductService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  totalPrice: number = 0;
  _Router = inject(Router);
  egyptGovernorates: string[] = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Dakahlia',
    'Red Sea',
    'Beheira',
    'Fayoum',
    'Gharbia',
    'Ismailia',
    'Menofia',
    'Minya',
    'Qaliubiya',
    'New Valley',
    'Suez',
    'Aswan',
    'Assiut',
    'Beni Suef',
    'Port Said',
    'Damietta',
    'Sharkia',
    'South Sinai',
    'Kafr El Sheikh',
    'Matrouh',
    'Luxor',
    'Qena',
    'North Sinai',
    'Sohag',
  ];
  isLoading: boolean = false;
  formgroup: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]),
    city: new FormControl(this.egyptGovernorates[0], [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    paymentType: new FormControl("online", [Validators.required]),
  });
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._ProductService
        .getCart(localStorage.getItem('token') || '')
        .subscribe((res: any) => {
          this.totalPrice = res.data.totalCartPrice;
        });
    }
  }

  createAnOrder(form: FormGroup) {
    console.log(form.valid);
    if (form.valid) {
    this.isLoading = true;
      const data =
          {shippingAddress: {
            details: form.get('address')?.value,
            phone: form.get('phone')?.value,
            city: form.get('city')?.value,
          }};
      if(form.get('paymentType')?.value === 'online') {
        this._ProductService
          .createAnOnlineSession(data, this.cartId)
          .subscribe({
            next: (res: any) => {
              this.isLoading = false;
              window.location.href = res.session.url;
            },
            error: (err) => {
              this.isLoading = false;
              console.log(err);
            },
          });
      }
      else if(form.get('paymentType')?.value === 'cash') {
        this._ProductService.createCashOrder(data, this.cartId).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this._Router.navigate(['/orders']);
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
      }
    }
  }
}
