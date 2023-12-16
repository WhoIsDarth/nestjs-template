import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

import { ApiErrorDto } from '../../../api/generic/dto';

@Catch(Error)
export class DefaultFilter implements ExceptionFilter {
  private readonly logger = new Logger(DefaultFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    this.logger.debug(exception);

    const response = this.getResponseFromHost(host);

    if (exception instanceof HttpException) {
      this.handleHttpException(exception, response);
    } else {
      this.handleUnknownError(exception, response);
    }
  }

  private getResponseFromHost(host: ArgumentsHost): Response {
    return host.switchToHttp().getResponse<Response>();
  }

  private handleHttpException(
    exception: HttpException,
    response: Response,
  ): void {
    const apiErrorDto = exception.getResponse() as ApiErrorDto;
    response
      .status(exception.getStatus())
      .json({ message: apiErrorDto.message, errors: apiErrorDto.errors });
  }

  private handleUnknownError(exception: Error, response: Response): void {
    this.logger.error(exception);
    response.status(500).json({ message: 'Something went wrong', errors: [] });
  }
}
