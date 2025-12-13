import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { PurchaseService } from '../../core/services/purchase.service';
import { PurchaseStateService } from '../../core/services/purchase-state.service';

@Component({
  selector: 'app-purchase-confirmation',
  imports: [CommonModule, TranslateModule],
  templateUrl: './purchase-confirmation.html',
  styleUrl: './purchase-confirmation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PurchaseConfirmationComponent implements OnInit {
  private router = inject(Router);
  private purchaseService = inject(PurchaseService);
  private purchaseState = inject(PurchaseStateService);
  private translate = inject(TranslateService);

  readonly constants = APP_CONSTANTS;

  details = this.purchaseState.selection;

  ngOnInit(): void {
    this._checkState();
  }

  errorMsg = signal('');
  isProcessing = signal(false);

  confirmPurchase() {
    this.errorMsg.set('');
    this.isProcessing.set(true);

    const { plan, duration, devices } = this.details();

    if (!plan || !duration) {
      this.errorMsg.set(this.translate.instant('PURCHASE.ERROR.NO_SELECTION_FOUND'));
      return;
    }

    const payload = {
      planName: plan.name,
      duration: duration.name,
      devices,
      price: this.purchaseState.totalPrice(),
    };

    this.purchaseService.processPurchase(payload).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.router.navigate([APP_CONSTANTS.ROUTES.CONNECTED]);
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

  private _checkState() {
    const state = this.details();
    if (!state.plan || !state.duration) {
      this.router.navigate([APP_CONSTANTS.ROUTES.PLANS]);
    }
  }
}
