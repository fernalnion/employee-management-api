import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: String })
  email = '';

  @ApiProperty({ type: String })
  password = '';
}
