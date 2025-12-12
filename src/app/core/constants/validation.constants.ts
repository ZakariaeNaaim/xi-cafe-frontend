import { User } from '../models';

export const VALIDATION = {
  PATTERNS: {
    NUMERIC: /^[0-9]+$/,
    DAY: /^[0-9]{1,2}$/,
    YEAR: /^[0-9]{4}$/,
  },

  DAY_MIN: 1,
  DAY_MAX: 31,
  ROOM_MIN: 1,
  ROOM_MAX: 9999,

  ERROR_KEYS: {
    REQUIRED: 'VALIDATION.REQUIRED',
    INVALID_FORMAT: 'VALIDATION.INVALID_FORMAT',
    OUT_OF_RANGE: 'VALIDATION.OUT_OF_RANGE',
  },
} as const;

// Network/Timing Constants
export const TIMING = {
  AUTH_DELAY_MS: 800,
  PURCHASE_DELAY_MS: 1000,
  VOUCHER_DELAY_MS: 600,
  ANIMATION_FAST_MS: 200,
  ANIMATION_NORMAL_MS: 300,
  ANIMATION_SLOW_MS: 500,
} as const;

// Test/Mock Data
export const MOCK_DATA = {
  FAILURE_RATE: 0.2,
  VOUCHER_CODES: ['VALID123', 'FREEWIFI', 'CRUISE2024'],
} as const;

export const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'John',
    surname: 'Doe',
    roomNumber: 101,
    dateOfBirth: { day: '15', month: 'March', year: '1990' },
  },
] as const;
