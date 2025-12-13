import { inject, Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';
import { TIMING } from '../constants/timing.constants';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../constants/app-data.constants';
import db from '../../../../db.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private translate = inject(TranslateService);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return of(null)
      .pipe(delay(TIMING.AUTH_DELAY_MS))
      .pipe(() => {
        const matchedUser = db.users.find(
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
    this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]);
  }
}
