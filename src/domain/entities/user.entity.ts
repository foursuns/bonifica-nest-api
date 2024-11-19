import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ type: String, required: true, nullable: false })
  name: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  email: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  message: string;
}
