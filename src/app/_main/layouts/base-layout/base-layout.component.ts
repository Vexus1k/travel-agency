import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "../../../auth/core/services/AuthService";
import { DataService } from "../../../core/services/DataService";
import { Router } from "@angular/router";

@Component({
  selector: 'app-base-auth-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent {
  public readonly title = 'Travel agency';
  public readonly menuItems = [
    {
      name: 'Home',
      path: '/main/dashboard',
      iconClass: 'ri-home-line'
    },
    {
      name: 'About us',
      path: '/main/about-us',
      iconClass: 'ri-information-line'
    },
    {
      name: 'Offers',
      path: '/main/offers',
      iconClass: 'ri-percent-line'
    },
    {
      name: 'Shopping cart',
      path: '/main/shopping-cart',
      iconClass: 'ri-shopping-basket-2-line'
    },
    {
      name: 'Contact',
      path: '/main/contact',
      iconClass: 'ri-phone-line'
    },
  ]

  public constructor(
    private readonly _authService: AuthService,
    private readonly _dataService: DataService,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._authService.logout();
  }
}
