import { ChangeDetectionStrategy, Component, inject, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { Duration, DurationType, Upgrade } from '../../core/models';
import { DataService } from '../../core/services/data.service';
import { PurchaseStateService } from '../../core/services/purchase-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { XiwlButtonComponent } from '../../shared/components/xiwl-button/xiwl-button.component';

@Component({
  selector: 'app-connected',
  imports: [CommonModule, TranslateModule, XiwlButtonComponent],
  templateUrl: './connected.html',
  styleUrl: './connected.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ConnectedComponent implements OnInit {
  private purchaseState = inject(PurchaseStateService);
  private dataService = inject(DataService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  appConstants = APP_CONSTANTS;

  private voyageExpiration = toSignal(this.translate.stream('CONNECTED.EXPIRATION.VOYAGE'), {
    initialValue: '',
  });

  private readonly allUpgrades = toSignal<Upgrade[]>(this.dataService.getUpgrades());
  upgrades = computed(() => this.allUpgrades());

  details = computed(() => {
    const state = this.purchaseState.selection();
    const planName = state.plan?.name ?? this.appConstants.DEFAULTS.PLAN_NAME;
    const devices = state.devices;
    const expiration = this._calculateExpiration(state.duration);

    return { planName, devices, expiration };
  });

  ngOnInit(): void {
    const state = this.purchaseState.selection();
    if (!state.plan || !state.duration) {
      this.router.navigate([this.appConstants.ROUTES.PLANS]);
    }
  }

  startBrowsing() {
    window.location.href = this.appConstants.BRAND.EXTERNAL_LINKS.BROWSING_START;
  }

  private _calculateExpiration(duration: Duration | null): string {
    if (!duration) {
      const date = new Date();
      date.setHours(date.getHours() + 24);
      return date.toLocaleString();
    }

    if (duration.type === DurationType.Voyage) {
      return this.voyageExpiration();
    }

    if (duration.type === DurationType.Fixed && duration.value) {
      const date = new Date();
      date.setHours(date.getHours() + duration.value);
      return date.toLocaleString();
    }

    return '';
  }
}
