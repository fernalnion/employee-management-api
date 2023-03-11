import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/enums/role.enum';

export class CreateUserModel {
  @ApiProperty({ type: String })
  email = '';

  @ApiProperty({ type: String })
  firstname = '';

  @ApiProperty({ type: String })
  lastname = '';

  @ApiProperty({ type: String })
  password = '';

  @ApiProperty({ type: String, enum: ROLES })
  role: ROLES = ROLES.USER;

  @ApiProperty({ type: String })
  mobile = '';

  @ApiProperty({ type: Number })
  dob = 0;
}
