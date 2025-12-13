import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'xiwl-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './xiwl-input.component.html',
  styleUrl: './xiwl-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XiwlInputComponent {
  control = input.required<FormControl>();
  label = input('');
  type = input('text');
  placeholder = input('');
  inputId = input('');

  get isInvalid(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
}
