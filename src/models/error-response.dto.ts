import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ type: Boolean })
  data: boolean = false;

  @ApiProperty({ type: String })
  message: string = '';

  @ApiProperty({ type: Boolean })
  error: boolean = true;
}
