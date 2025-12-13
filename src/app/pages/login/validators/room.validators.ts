import { AbstractControl, ValidationErrors } from '@angular/forms';
import { VALIDATION } from '../../../core/constants/validation.constants';

export function roomNumberValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const room = parseInt(control.value, 10);
  if (isNaN(room) || room < VALIDATION.ROOM_MIN || room > VALIDATION.ROOM_MAX) {
    return { invalidRoom: true, errorKey: VALIDATION.ERROR_KEYS.OUT_OF_RANGE };
  }
  return null;
}
