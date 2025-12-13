import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.html',
  styleUrl: './purchase-confirmation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseConfirmationComponent {}
