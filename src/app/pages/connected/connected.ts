import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { Upgrade } from '../../core/models';
import { DataService } from '../../core/services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-connected',
  imports: [CommonModule, TranslateModule],
  templateUrl: './connected.html',
  styleUrl: './connected.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ConnectedComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  private readonly queryParams = toSignal<Params>(this.route.queryParams);

  details = computed(() => {
    const params = this.queryParams() ?? {};
    const planName = params['plan'] ?? 'Basic';

    const rawDevices = params['devices'];
    const parsedDevices = Number.parseInt(typeof rawDevices === 'string' ? rawDevices : '1', 10);
    const devices = Number.isNaN(parsedDevices) ? 1 : parsedDevices;

    const date = new Date();
    date.setHours(date.getHours() + 24);
    const expiration = date.toLocaleString();

    return { planName, devices, expiration };
  });

  private readonly allUpgrades = toSignal<Upgrade[]>(this.dataService.getUpgrades());
  upgrades = computed(() => this.allUpgrades());

  startBrowsing() {
    window.open(APP_CONSTANTS.BRAND.EXTERNAL_LINKS.BROWSING_START);
  }
}
