import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../interceptors/strategy/jwt.strategy';
import { HttpModule } from '../../handlers/http.module';

@Module({
  imports: [
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        baseURL: 'http://127.0.0.1:8000/api',
        enableLogging: true,
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
