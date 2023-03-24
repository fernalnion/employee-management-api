import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';
import { AccessTokenAuthGuard } from 'src/guards/accessToken.guard';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/models/create-user.dto';
import { ErrorResponse } from 'src/models/error-response.dto';
import { UserEntity } from 'src/models/response-user';
import { UpdateUserDto } from 'src/models/update-user.dto';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@Controller('users')
@ApiExtraModels(ErrorResponse, CreateUserDto)
@UseGuards(AccessTokenAuthGuard)
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
  constructor(private readonly _userService: UserService) { }
  @ApiBody({ type: () => CreateUserDto })
  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this._userService.create(createUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users = await this._userService.findAll();
    return users.map((u: User) => new UserEntity(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  async findById(@Param('id') id: string): Promise<UserEntity> {
    const user: User | null = await this._userService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: () => UpdateUserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User | null = await this._userService.update(id, updateUserDto);
    if (!user) throw new NotFoundException('User not found');
    return new UserEntity(user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  async remove(@Param('id') id: string) {
    await this._userService.remove(id);
    return true;
  }
}
