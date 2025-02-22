import { Component,ElementRef,inject,PLATFORM_ID,viewChild,ViewChild } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import {AuthService} from "../../../core/services/auth/register.service"
import { threadId } from 'worker_threads';
import { Dropdown, initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  _register = inject(AuthService);
  islogin: boolean = false;
  _platformId = inject(PLATFORM_ID);
  hideDropdown: boolean = true;
  name: string = '';
    ngOnInit() {
    this._register.isLogin.subscribe((res) => {
      this.islogin = res;
    });
    this._register.name.subscribe((res) => {
      this.name = res;
    });
  }
  
  toggleUser()
  {
    this.hideDropdown = !this.hideDropdown;
  }


  logout() {
    this._register.isLogin.next(false);
    localStorage.removeItem('token');
  }
}
