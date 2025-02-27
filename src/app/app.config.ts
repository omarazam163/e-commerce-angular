import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideToastr } from 'ngx-toastr';
import { handleTokenInterceptor } from './core/interceptors/handle-token.interceptor';
import { handleErrorInterceptor } from './core/interceptors/handle-error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([handleTokenInterceptor, handleErrorInterceptor])
    ),
    BrowserAnimationsModule,
    CarouselModule,
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      progressBar: false,
      closeButton: true,
      tapToDismiss: false,
      
    }),
  ],
};
