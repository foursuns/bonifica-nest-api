import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createCipheriv } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../dtos/user.dto';
import { ResponseDto } from 'src/api/interfaces/response';
import customMessage from 'src/common/customMessage';
import { HttpService } from 'src/api/handlers/http.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('CustomHttpService')
    private readonly httpService: HttpService,
    private readonly jwt: JwtService,
  ) {}

  async create(user: UserDto): Promise<ResponseDto> {
    const token = await this.generateToken({
      name: user.name,
      email: user.email,
    });

    if (!token) {
      throw new BadRequestException('Falha na geração do token');
    }

    const userData = {
      name: await this.encryption(user.name),
      email: await this.encryption(user.email),
      message: await this.encryption(user.message),
    };

    if (!userData) {
      throw new BadRequestException('Falha na criptografia');
    }

    try {
      const response = await this.externalApi(token, userData);
      return customMessage(HttpStatus.CREATED, `Usuário criado com sucesso`, token, response);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, 'Falha no registro do usuário', null, {});
    }
  }

  async encryption(payload: string) {
    const algorithm = process.env.ALGORITHM;
    const iv = Buffer.from(process.env.ENCRYPT_IV, 'hex');
    const key = Buffer.from(process.env.ENCRYPT_SECRET_KEY, 'hex');
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]).toString('base64');
    return encrypted;
  }

  async generateToken(args: { name: string; email: string }) {
    const payload = {
      name: args.name,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async externalApi(token: string, userData: UserDto) {
    return this.httpService
      .post('http://127.0.0.1:8000/users', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.data)
      .catch(error => console.error(error));
  }

}
