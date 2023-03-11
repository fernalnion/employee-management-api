import { ApiProperty } from '@nestjs/swagger';

export class LoginModel {
  @ApiProperty({ type: String })
  email = '';

  @ApiProperty({ type: String })
  password = '';
}
