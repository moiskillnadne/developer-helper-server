import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common'
import { Observable, catchError, throwError } from 'rxjs'
import { BadRequestError } from '../errors/bad-request'
import { ValidationError } from '../errors/validation'
import { ErrorResponseCodes } from '../dictionary/error.codes'
import { InternalServerError } from '../errors/internal-server'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const response = error.getResponse()

          const message = response['message'] instanceof Array ? response['message'][0] : response['message']

          return throwError(() => new ValidationError(message, ErrorResponseCodes.VALIDATION_FAILED))
        }

        if (error instanceof BadRequestError || error instanceof ValidationError) {
          return throwError(() => error.toPlainObject())
        }

        return throwError(() => new InternalServerError(error.message, ErrorResponseCodes.INTERNAL_SERVER_ERROR))
      }),
    )
  }
}
