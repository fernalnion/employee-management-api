import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  firstname: string = '';

  @ApiProperty({ type: String })
  lastname: string = '';

  @ApiProperty({ type: String })
  password: string = '';

  @ApiProperty({ type: String, enum: ROLES })
  role: ROLES = ROLES.USER;

  @ApiProperty({ type: String })
  mobile: string = '';

  @ApiProperty({ type: Number })
  dob: number = 0;
}
