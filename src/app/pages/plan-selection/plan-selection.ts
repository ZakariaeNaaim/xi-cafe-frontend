import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { Plan, Duration } from '../../core/models';
import { DataService } from '../../core/services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-plan-selection',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './plan-selection.html',
  styleUrl: './plan-selection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PlanSelectionComponent {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private dataService = inject(DataService);

  readonly constants = APP_CONSTANTS;

  plans = toSignal(this.dataService.getPlans(), { initialValue: [] as Plan[] });
  durations = toSignal(this.dataService.getDurations(), { initialValue: [] as Duration[] });
  deviceOptions = toSignal(this.dataService.getDeviceOptions(), { initialValue: [] as number[] });

  selectedTier = signal<Plan | null>(null);
  selectedDuration = signal<Duration | null>(null);
  selectedDevices = signal<number>(1);

  totalPrice = computed(() => {
    const tier = this.selectedTier();
    const duration = this.selectedDuration();
    const devices = this.selectedDevices();
    return tier && duration ? tier.basePrice * duration.multiplier * devices : 0;
  });

  purchaseError = signal('');

  selectTier(tier: Plan) {
    this.selectedTier.set(tier);
  }

  selectDuration(duration: Duration) {
    this.selectedDuration.set(duration);
  }

  selectDevices(count: number) {
    this.selectedDevices.set(count);
  }

  onPurchase() {
    if (!this.selectedTier() || !this.selectedDuration()) {
      this.purchaseError.set(this.translate.instant('PURCHASE.ERROR.SELECTION_MISSING'));
      return;
    }
    this.router.navigate(
      [this.constants.ROUTES.CONNECTED]
      // TODO : redirect to purchase confirmation
      //   , {
      //   queryParams: {
      //     plan: this.selectedTier()?.name,
      //     duration: this.selectedDuration()?.name,
      //     devices: this.selectedDevices(),
      //     price: this.totalPrice(),
      //   },
      // }
    );
  }
}
