import { inject, Injectable } from '@angular/core';
import { Observable, throwError, delay, map, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TIMING } from '../../core/constants/timing.constants';
import { DataService } from '../../core/services/data.service';
import { VoucherValidationResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private translate = inject(TranslateService);
  private dataService = inject(DataService);

  validateVoucher(code: string): Observable<VoucherValidationResponse> {
    if (!code.trim()) {
      return throwError(() => ({
        success: false,
        message: this.translate.instant('VOUCHER.ERROR.VOUCHER_EMPTY'),
      }));
    }

    const normalized = code.toUpperCase();

    return forkJoin({
      vouchers: this.dataService.getVouchers(),
      plans: this.dataService.getPlans(),
    }).pipe(
      delay(TIMING.VOUCHER_DELAY_MS),
      map(({ vouchers, plans }) => {
        const voucher = vouchers.find((v) => v.code.toUpperCase() === normalized);
        if (!voucher) {
          throw {
            success: false,
            message: this.translate.instant('VOUCHER.ERROR.VOUCHER_INVALID'),
          };
        }

        const plan = plans.find((p) => p.id === voucher.planId);
        if (!plan) {
          throw {
            success: false,
            message: this.translate.instant('VOUCHER.ERROR.VOUCHER_INVALID'),
          };
        }

        return { success: true, planName: plan.name };
      })
    );
  }
}
