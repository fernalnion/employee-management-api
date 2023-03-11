import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserModel } from 'src/models/register.model';
import { ErrorResponse } from 'src/models/response.model';
import { UserService } from 'src/services/user.service';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(ErrorResponse, CreateUserModel)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiResponse({
  status: 400,
  description: 'Invalid input',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
@ApiResponse({
  status: 404,
  description: 'Not found',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
@ApiResponse({
  status: 500,
  description: 'Server error',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get('profile')
  getProfile(@Request() { user }: { user: any }) {
    return user;
  }

  @ApiBody({ type: () => CreateUserModel })
  @Post('register')
  register(@Body() createUser: CreateUserModel) {
    return this._userService.create(createUser);
  }
}
