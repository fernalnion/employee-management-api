import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PROVIDERS } from 'src/constants/provider.constant';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/models/create-user.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USER_MODEL) private userModel: Model<UserDocument>,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<UserDocument> => {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  };
  findByEmail = (email: string): Promise<UserDocument | null> =>
    this.userModel.findOne({ email }).exec();
  findById = (id: string): Promise<UserDocument | null> =>
    this.userModel.findById(id);
  findAll = (): Promise<Array<UserDocument>> => this.userModel.find().exec();

  update = (id: string, user: Partial<User>) =>
    this.userModel.findByIdAndUpdate(id, user, { new: true });
  activeUsers = () => this.userModel.count({ activated: true, verified: true });
  remove = (id: string) => this.userModel.findByIdAndDelete(id).exec();
}
