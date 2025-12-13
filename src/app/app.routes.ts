import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection';
import { PurchaseConfirmationComponent } from './pages/purchase-confirmation/purchase-confirmation';
import { RedeemVoucherComponent } from './pages/redeem-voucher/redeem-voucher';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'plans', component: PlanSelectionComponent },
  { path: 'purchase', component: PurchaseConfirmationComponent },
  { path: 'voucher', component: RedeemVoucherComponent },
  { path: '**', redirectTo: 'login' },
];
