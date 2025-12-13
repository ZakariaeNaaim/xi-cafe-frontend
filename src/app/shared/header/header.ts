import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  showLogout = false;
  showBackButton = false;
  currentUrl = '';

  readonly constants = APP_CONSTANTS;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        this.showLogout = event.url !== this.constants.ROUTES.LOGIN && event.url !== '/';
        this.showBackButton = event.url.startsWith(this.constants.ROUTES.VOUCHER);
      });
  }

  goBack() {
    this.router.navigate([this.constants.ROUTES.PLANS]);
  }
}
