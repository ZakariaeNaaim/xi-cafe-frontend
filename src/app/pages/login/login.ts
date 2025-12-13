import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../core/constants/app-data.constants';
import { AuthService } from '../../core/services/auth.service';
import { VALIDATION } from '../../core/constants/validation.constants';
import { dayValidator } from '../../core/validators/date.validators';
import { finalize } from 'rxjs';
import { XiwlInputComponent } from '../../shared/components/xiwl-input/xiwl-input.component';
import { XiwlButtonComponent } from '../../shared/components/xiwl-button/xiwl-button.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    XiwlInputComponent,
    XiwlButtonComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  loginForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    surname: ['', Validators.required],
    roomNumber: [
      VALIDATION.ROOM_MIN,
      [
        Validators.required,
        Validators.min(VALIDATION.ROOM_MIN),
        Validators.pattern(VALIDATION.PATTERNS.NUMERIC),
      ],
    ],
    dobDay: [1, [Validators.required, Validators.pattern(VALIDATION.PATTERNS.DAY), dayValidator]],
    dobMonth: ['January', Validators.required],
    dobYear: [2000, [Validators.required, Validators.pattern(VALIDATION.PATTERNS.YEAR)]],
  });

  submitted = signal(false);
  loginError = signal('');
  isLoading = signal(false);

  readonly constants = APP_CONSTANTS;

  onSubmit() {
    this.submitted.set(true);
    this.loginForm.markAllAsTouched();
    this.loginError.set('');

    if (this.loginForm.invalid) return;

    this.isLoading.set(true);

    this.authService
      .login({
        firstName: this.f.firstName.value,
        surname: this.f.surname.value,
        roomNumber: this.f.roomNumber.value,
        dateOfBirth: {
          day: this.f.dobDay.value,
          month: this.f.dobMonth.value,
          year: this.f.dobYear.value,
        },
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate([this.constants.ROUTES.PLANS]);
        },
        error: (error) => {
          this.loginError.set(error.message || this.translate.instant('LOGIN.ERROR.FAILED'));
        },
      });
  }

  get f() {
    return this.loginForm.controls;
  }
}
