import { NewPasswordComponent } from './features/component/new-password/new-password.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/component/home/home.component';
import { CartComponent } from './features/component/cart/cart.component';
import { BrandsComponent } from './features/component/brands/brands.component';
import { ProductsComponent } from './features/component/products/products.component';
import { sign } from 'crypto';
import { SignupComponent } from './features/component/signup/signup.component';
import { SigninComponent } from './features/component/signin/signin.component';
import { CategoryComponent } from './features/component/category/category.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loginguardGuard } from './core/guards/auth/loginguard.guard';
import { ForgotpasswordComponent } from './features/component/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './features/component/reset-password/reset-password.component';
import { VerifyResetPasswordComponent } from './features/component/verify-reset-password/verify-reset-password.component';
import { forgotpassGuardGuard } from './core/guards/auth/forgotpass-guard.guard';
import { SingleProductComponent } from './features/component/single-product/single-product.component';
import { CheckoutComponent } from './features/component/checkout/checkout.component';
import { OrdersComponent } from './features/component/orders/orders.component';
import { SingleOrderComponent } from './features/component/single-order/single-order.component';
import { single } from 'rxjs';
import { WishlistComponent } from './features/component/wishlist/wishlist.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'cart',
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    title: 'categories',
  },
  {
    path: 'brands',
    component: BrandsComponent,
    title: 'brands',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'products',
  },
  {
    path: 'single/:id',
    component: SingleProductComponent,
    title: 'product',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'signup',
    canActivate: [loginguardGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    title: 'orders',
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:cartId',
    component: CheckoutComponent,
    title: 'Check Out',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'signin',
    canActivate: [loginguardGuard],
  },
  {
    path: 'singleorder',
    component: SingleOrderComponent,
    title: 'singleorder',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'wishlist',
    canActivate: [authGuard],
  },
  {
    path: 'reset-password',
    title: 'reset password',
    component: ResetPasswordComponent,
    children: [
      {
        path: '',
        component: ForgotpasswordComponent,
        canActivate: [loginguardGuard],
      },
      {
        path: 'verify',
        component: VerifyResetPasswordComponent,
        canActivate: [loginguardGuard, forgotpassGuardGuard],
      },
      {
        path: 'new-password',
        component: NewPasswordComponent,
        canActivate: [loginguardGuard, forgotpassGuardGuard],
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
];
