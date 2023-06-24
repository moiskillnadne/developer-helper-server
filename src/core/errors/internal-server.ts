import { ErrorResponseCodes } from '../dictionary/error.codes'
import { CustomError } from './base'

export class InternalServerError extends CustomError {
  constructor(message: string, code?: keyof typeof ErrorResponseCodes, details?: Record<string, unknown>) {
    super(message, code, details)
    this.name = 'INTERNAL_SERVER_ERROR'
  }
}
