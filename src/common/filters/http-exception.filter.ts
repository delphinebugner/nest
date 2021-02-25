import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // Recupération existant
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    // Conversion objet à notre sauce
    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(), // ajouts de champs perso !
      label: 'Coucou Delphine!',
    });
  }
}
