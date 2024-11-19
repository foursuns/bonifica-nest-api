import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP Request..');

  use(req: Request, res: Response, next: NextFunction): void {
    const now = Date.now();

    const { method, originalUrl, ip, headers, params, query } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const time = `${Date.now() - now} ms`;
      const logObject = {
        method,
        statusCode,
        originalUrl,
        ip,
        headers,
        params,
        query,
        time,
      };

      const logMessage = JSON.stringify(logObject);

      if (statusCode >= 200 && statusCode < 400) {
        this.logger.log(logMessage);
      } else {
        this.logger.error(logMessage);
      }
    });
    next();
  }
}
