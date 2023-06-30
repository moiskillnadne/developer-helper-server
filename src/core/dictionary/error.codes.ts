export const ErrorResponseCodes = {
  SIGNUP_FAILED: 'SIGNUP_FAILED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const

export type TErrorResponseCodes = keyof typeof ErrorResponseCodes
