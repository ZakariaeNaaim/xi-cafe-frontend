import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xiwl-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xiwl-button.component.html',
  styleUrl: './xiwl-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XiwlButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  customClass = input('');
  clicked = output<Event>();

  onClick(event: Event) {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
