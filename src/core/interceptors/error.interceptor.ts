import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'
import { Observable, catchError, throwError } from 'rxjs'
import { ErrorResponseCodes } from '../dictionary/error.codes'
import { InternalServerError } from '../errors/internal-server'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error(error, error instanceof Error)

        return throwError(
          () =>
            new InternalServerError(
              error.message,
              ErrorResponseCodes.INTERNAL_SERVER_ERROR,
              HttpStatus.INTERNAL_SERVER_ERROR,
              { message: 'zalupa' },
            ),
        )
      }),
    )
  }
}
