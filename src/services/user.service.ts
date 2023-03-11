import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PROVIDERS } from 'src/constants/provider.constant';
import { User } from 'src/interfaces/user.interface';
import { CreateUserModel } from 'src/models/register.model';
import { UserDocument } from 'src/schemas/user.schema';
import { HarshService } from './hash.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USER_MODEL) private userModel: Model<UserDocument>,
    private readonly _hashService: HarshService,
  ) {}

  create = async (
    createUser: CreateUserModel & {
      activated?: boolean;
      verified?: boolean;
    },
  ): Promise<UserDocument> => {
    const user = await this.findOne(createUser.email);
    if (user) {
      throw new BadRequestException();
    }

    const password = await this._hashService.hashPassword(createUser.password);
    const saveUser: User = {
      ...createUser,
      passwordhash: password,
      activated: createUser.activated ?? false,
      verified: createUser.verified ?? false,
    };
    return this.userModel.create<User>(saveUser);
  };
  findOne = (email: string): Promise<UserDocument | null> =>
    this.userModel.findOne({ email }).lean();
  findById = (id: string): Promise<UserDocument | null> =>
    this.userModel.findById(id).lean();
  findAll = (): Promise<Array<UserDocument>> => this.userModel.find().lean();
  activeUsers = () => this.userModel.count({ activated: true, verified: true });
}
