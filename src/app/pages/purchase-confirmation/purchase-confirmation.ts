import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { PurchaseService } from '../../core/services/purchase.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-purchase-confirmation',
  imports: [CommonModule, TranslateModule],
  templateUrl: './purchase-confirmation.html',
  styleUrl: './purchase-confirmation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PurchaseConfirmationComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private purchaseService = inject(PurchaseService);
  private translate = inject(TranslateService);

  readonly constants = APP_CONSTANTS;

  private readonly queryParams = toSignal<Params>(this.route.queryParams);

  details = computed(() => {
    const params = this.queryParams() ?? {};
    return {
      planName: params['plan'] ?? 'Unknown Plan',
      duration: params['duration'] ?? '',
      devices: Number.parseInt(params['devices'] ?? '1', 10) || 1,
      price: Number.parseFloat(params['price'] ?? '0') || 0,
    };
  });

  errorMsg = signal('');
  isProcessing = signal(false);

  confirmPurchase() {
    this.errorMsg.set('');
    this.isProcessing.set(true);

    const { planName, duration, devices, price } = this.details();

    this.purchaseService.processPurchase({ planName, duration, devices, price }).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.router.navigate([APP_CONSTANTS.ROUTES.CONNECTED], {
          queryParams: { plan: planName, devices },
        });
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.errorMsg.set(
          error.message || this.translate.instant('PURCHASE.ERROR.PURCHASE_FAILED')
        );
      },
    });
  }

  goBack() {
    this.router.navigate([APP_CONSTANTS.ROUTES.PLANS]);
  }
}
