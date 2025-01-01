import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { EntityError } from 'src/domain/errors/entity.error';

@Injectable()
export class ErrorMapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityError) {
          throw new UnprocessableEntityException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
