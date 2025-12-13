import { Injectable } from '@angular/core';
import db from '../../../../db.json';
import { delay, Observable, of } from 'rxjs';
import { Duration, Plan, Upgrade } from '../models';
import { TIMING } from '../constants/validation.constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getPlans(): Observable<Plan[]> {
    return of(null)
      .pipe(delay(TIMING.ANIMATION_FAST_MS))
      .pipe(() => {
        return of(db.plans);
      });
  }

  getDurations(): Observable<Duration[]> {
    return of(null)
      .pipe(delay(TIMING.ANIMATION_FAST_MS))
      .pipe(() => {
        return of(db.durations);
      });
  }

  getDeviceOptions(): Observable<number[]> {
    return of(null)
      .pipe(delay(TIMING.ANIMATION_FAST_MS))
      .pipe(() => {
        return of(db.deviceOptions);
      });
  }

  getUpgrades(): Observable<Upgrade[]> {
    return of(null)
      .pipe(delay(TIMING.ANIMATION_FAST_MS))
      .pipe(() => {
        return of(db.upgrades);
      });
  }
}
