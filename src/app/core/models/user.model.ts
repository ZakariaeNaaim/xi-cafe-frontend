export interface User {
  id?: number;
  firstName: string;
  surname: string;
  roomNumber: number;
  dateOfBirth: DateOfBirth;
}

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface LoginRequest {
  firstName: string;
  surname: string;
  roomNumber: number;
  dateOfBirth: DateOfBirth;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}
