import { HttpStatus } from '@nestjs/common'
import { ErrorResponseCodes } from '../dictionary/error.codes'

export class CustomError extends Error {
  code: keyof typeof ErrorResponseCodes
  httpCode: HttpStatus
  details: Record<string, unknown>

  constructor(message: string, code: keyof typeof ErrorResponseCodes, details: Record<string, unknown>) {
    super(message)
    this.code = code
    this.name = 'CustomError'
    this.details = details
  }

  public toPlainObject() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }
}
