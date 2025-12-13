import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Plan, Duration, PurchaseState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PurchaseStateService {
  private readonly STORAGE_KEY = 'purchase_state';
  private platformId = inject(PLATFORM_ID);

  private state = signal<PurchaseState>(this._loadState());

  readonly selection = computed(() => this.state());
  readonly totalPrice = computed(() => {
    const { plan, duration, devices } = this.state();
    return plan && duration ? plan.basePrice * duration.multiplier * devices : 0;
  });

  setSelection(plan: Plan, duration: Duration, devices: number) {
    const newState = { plan, duration, devices };
    this.state.set(newState);
    this._saveState(newState);
  }

  clearSelection() {
    const emptyState = { plan: null, duration: null, devices: 1 };
    this.state.set(emptyState);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private _loadState(): PurchaseState {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      return stored
        ? (JSON.parse(stored) as PurchaseState)
        : { plan: null, duration: null, devices: 1 };
    }
    return { plan: null, duration: null, devices: 1 };
  }

  private _saveState(state: PurchaseState) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }
}
