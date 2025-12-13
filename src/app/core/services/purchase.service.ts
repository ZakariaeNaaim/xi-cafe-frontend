import { inject, Injectable } from '@angular/core';
import { Observable, of, delay, throwError, switchMap } from 'rxjs';
import { PurchaseRequest, PurchaseResponse } from '../models';
import { TranslateService } from '@ngx-translate/core';
import { TIMING } from '../constants/timing.constants';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private translate = inject(TranslateService);

  processPurchase(purchaseData: PurchaseRequest): Observable<PurchaseResponse> {
    return of(null).pipe(
      delay(TIMING.PURCHASE_DELAY_MS),
      switchMap(() => {
        if (!purchaseData.planName || !purchaseData.duration || purchaseData.price <= 0) {
          return throwError(() => ({
            success: false,
            message: this.translate.instant('PURCHASE.ERROR.INVALID_DATA'),
          }));
        }

        return of({
          success: true,
          message: this.translate.instant('PURCHASE.SUCCESS'),
          orderId: `ORD-${Date.now()}`,
        });
      })
    );
  }
}
