import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VoucherService } from '../../core/services/voucher.service';
import { PurchaseStateService } from '../../core/services/purchase-state.service';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';

@Component({
  selector: 'app-redeem-voucher',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './redeem-voucher.html',
  styleUrl: './redeem-voucher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RedeemVoucherComponent {
  private router = inject(Router);
  private voucherService = inject(VoucherService);
  private purchaseState = inject(PurchaseStateService);

  appConstants = APP_CONSTANTS;

  voucherCode = signal('');
  errorMsg = signal('');
  isProcessing = signal(false);

  redeem() {
    this.errorMsg.set('');
    this.isProcessing.set(true);

    this.voucherService.validateVoucher(this.voucherCode()).subscribe({
      next: (result) => {
        this.isProcessing.set(false);
        if (result.success && result.plan && result.duration) {
          this.purchaseState.setSelection(
            result.plan,
            result.duration,
            this.appConstants.DEFAULTS.Devices
          );
          this.router.navigate([this.appConstants.ROUTES.CONNECTED]);
        }
      },
      error: (err) => {
        this.isProcessing.set(false);
        this.errorMsg.set(err.message ?? '');
      },
    });
  }
}
