import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request as RequestType } from 'express';
import { AccessTokenAuthGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenAuthGuard } from 'src/guards/refreshToken.guard';
import { AuthDto } from "src/models/auth.dto";
import { ErrorResponse } from "src/models/error-response.dto";
import { CreateUserDto } from "src/models/create-user.dto";
import { AuthService } from 'src/services/auth.service';

@ApiExtraModels(ErrorResponse, AuthDto, CreateUserDto)
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
  constructor(private readonly _authService: AuthService) { }
  @Post('signin')
  @ApiBody({ type: () => AuthDto })
  async login(@Body() data: AuthDto) {
    return this._authService.singIn(data);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('logout')
  async logout(@Req() req: RequestType & { user: any }) {
    await this._authService.logout(req.user['sub']);
    return;
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  refreshTokens(@Request() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this._authService.refreshTokens(userId, refreshToken);
  }
}
