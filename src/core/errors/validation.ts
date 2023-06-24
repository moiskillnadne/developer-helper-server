import { ErrorResponseCodes } from '../dictionary/error.codes'
import { CustomError } from './base'

export class ValidationError extends CustomError {
  constructor(message: string, code?: keyof typeof ErrorResponseCodes, details?: Record<string, unknown>) {
    super(message, code, details)
    this.name = 'VALIDATION_ERROR'
  }
}
