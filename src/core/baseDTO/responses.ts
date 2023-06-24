import { SuccessResponseCodes } from '../dictionary/success.codes'

export class BaseSuccessResponse {
  isSuccess: true
  code: typeof SuccessResponseCodes
  details?: Record<string, unknown>
}
