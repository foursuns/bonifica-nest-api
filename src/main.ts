import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { CustomExceptionFilter } from './api/handlers/custom-exception.filter';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const loggerInfo = new Logger('NEST API');

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.CLIENT_DEV, process.env.CLIENT_PROD],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'x-access-token',
        'X-Requested-With',
        'XSRF-TOKEN',
      ],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());
  app.setGlobalPrefix(process.env.API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.API_PREFIX}/${process.env.SWAGGER_PREFIX}`, app, document);

  app.enableShutdownHooks();
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT ?? 5000);

  loggerInfo.log(`🚀 Application running on port ${process.env.PORT ?? 5000}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
    loggerInfo.log(`❌ Application stopping on port ${process.env.PORT ?? 5000}`);
  }
}

bootstrap();
