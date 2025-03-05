import { Component,PLATFORM_ID,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './core/services/flowbite.service';
import { FooterComponent } from "./core/layout/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
  _platformId = inject(PLATFORM_ID);
  _flowbiteService = inject(FlowbiteService);
  ngOnInit() {
    this._flowbiteService.loadFlowbite((flowbite) => {
      if (isPlatformBrowser(this._platformId)) {
        initFlowbite();
      }
    });
  }
}
