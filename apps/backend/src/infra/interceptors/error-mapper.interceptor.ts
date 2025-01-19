import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { EntityError } from '../../core/domain/errors/entity.error';
import { NotFoundError } from '../../core/domain/errors/not-found.error';
import { UnauthorizedError } from '../../core/domain/errors/unauthorized.error';

@Injectable()
export class ErrorMapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityError) {
          throw new UnprocessableEntityException(error.message);
        }

        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException(error.message);
        }

        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
