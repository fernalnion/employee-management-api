import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ROLES } from 'src/enums/role.enum';
import { CreateUserDto } from "src/models/create-user.dto";
import { UserService } from './user.service';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(private readonly _userService: UserService) {}
  async onApplicationBootstrap() {
    const activeUsers = await this._userService.activeUsers();
    if (!activeUsers) {
      const user: CreateUserDto & {
        activated: boolean;
        verified: boolean;
      } = {
        email: 'test@test.com',
        firstname: 'Test',
        lastname: 'Test',
        password: 'test',
        role: ROLES.ADMIN,
        mobile: '+91 9999999999',
        dob: new Date('1990-12-16').getTime(),
        activated: true,
        verified: true,
      };
      await this._userService.create(user);
    }
  }
}
