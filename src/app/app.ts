import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Layout } from './shared/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private translate = inject(TranslateService);
  protected readonly title = signal('xi-cafe-portal');

  constructor() {
    this.translate.use('en');
  }
}
