import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { User } from 'src/interfaces/user.interface';
import { LoginModel } from 'src/models/login.model';
import { CreateUserModel } from 'src/models/register.model';
import { ErrorResponse } from 'src/models/response.model';
import { AuthService } from 'src/services/auth.service';

@ApiExtraModels(ErrorResponse, LoginModel, CreateUserModel)
@ApiTags('Authendication')
@Controller('auth')
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
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiExtraModels(LoginModel)
  @ApiBody({ type: () => LoginModel })
  async login(@Request() { user }: { user: User }) {
    return this._authService.login(user);
  }
}
