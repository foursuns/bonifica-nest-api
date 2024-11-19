import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from '../../dtos/user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserSchema } from '../../schemas/user.schema';
import { UserService } from './user.service';
import { JoiValidatorPipe } from '../../../common/pipes/joi.validator.pipe';
@Controller({ version: '1' })
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new JoiValidatorPipe<UserDto>(UserSchema))
  @Post('users')
  @ApiBody({ type: UserDto, description: 'User Information' })
  @ApiCreatedResponse({ type: UserEntity, description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
