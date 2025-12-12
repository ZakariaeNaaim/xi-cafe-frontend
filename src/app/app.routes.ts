import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'plans', component: PlanSelectionComponent },
  { path: '**', redirectTo: 'login' },
];
