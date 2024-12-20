import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../interfaces/response';
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: ResponseDto, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message,
        error: error.name,
      });
    } else {
      const status = error?.statusCode || 500;
      response.status(status).json({
        statusCode: status,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  }
}
