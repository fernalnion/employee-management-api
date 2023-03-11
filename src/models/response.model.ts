import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ type: Boolean })
  data = false;

  @ApiProperty({ type: String })
  message = '';

  @ApiProperty({ type: Boolean })
  error = true;
}
