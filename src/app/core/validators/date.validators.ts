import { AbstractControl, ValidationErrors } from '@angular/forms';
import { VALIDATION } from '../../core/constants/validation.constants';

export function dayValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const day = parseInt(control.value, 10);
  if (isNaN(day) || day < VALIDATION.DAY_MIN || day > VALIDATION.DAY_MAX) {
    return { invalidDay: true, errorKey: VALIDATION.ERROR_KEYS.OUT_OF_RANGE };
  }
  return null;
}

export function yearValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const year = parseInt(control.value, 10);
  if (isNaN(year) || !VALIDATION.PATTERNS.YEAR.test(control.value)) {
    return { invalidYear: true, errorKey: VALIDATION.ERROR_KEYS.INVALID_FORMAT };
  }
  return null;
}
