import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection';
import { PurchaseConfirmationComponent } from './pages/purchase-confirmation/purchase-confirmation';
import { RedeemVoucherComponent } from './pages/redeem-voucher/redeem-voucher';
import { ConnectedComponent } from './pages/connected/connected';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'plans', component: PlanSelectionComponent },
  { path: 'purchase', component: PurchaseConfirmationComponent },
  { path: 'connected', component: ConnectedComponent },
  { path: 'voucher', component: RedeemVoucherComponent },
  { path: '**', redirectTo: 'login' },
];
