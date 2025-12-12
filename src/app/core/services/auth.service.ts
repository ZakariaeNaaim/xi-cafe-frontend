import { inject, Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
import { MOCK_USERS, TIMING } from '../constants/validation.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private translate = inject(TranslateService);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return of(null)
      .pipe(delay(TIMING.AUTH_DELAY_MS))
      .pipe(() => {
        const matchedUser = MOCK_USERS.find(
          (user) =>
            user.firstName.toLowerCase() === credentials.firstName.toLowerCase() &&
            user.surname.toLowerCase() === credentials.surname.toLowerCase() &&
            user.roomNumber === credentials.roomNumber &&
            user.dateOfBirth.day === credentials.dateOfBirth.day &&
            user.dateOfBirth.month === credentials.dateOfBirth.month &&
            user.dateOfBirth.year === credentials.dateOfBirth.year
        );

        if (matchedUser) {
          return of({
            success: true,
            message: this.translate.instant('LOGIN.SUCCESS'),
            token: `mock-jwt-token-${Date.now()}`,
          });
        } else {
          return throwError(() => ({
            success: false,
            message: this.translate.instant('LOGIN.ERROR.INVALID_CREDENTIALS'),
          }));
        }
      });
  }

  logout(): void {
    console.log('User logged out');
  }
}
