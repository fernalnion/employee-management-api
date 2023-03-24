import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { PROVIDERS } from 'src/constants/provider.constant';
import { Token } from 'src/interfaces/token.interface';
import { TokenDocument } from 'src/schemas/token.schema';

@Injectable()
export class TokenService {
  constructor(
    @Inject(PROVIDERS.TOKEN_MODEL) private tokenModel: Model<TokenDocument>,
  ) {}

  save = async (userId: ObjectId, accessToken: string) => {
    await this.disable(userId);
    const token = new this.tokenModel({
      userid: userId,
      token: accessToken,
      status: true,
    });
    return token.save();
  };

  count = ({ userid, token }: Token) =>
    this.tokenModel.count({ userid, token, status: true });
  disable = (userid: ObjectId | string) =>
    this.tokenModel.updateMany(
      { userid: typeof userid === 'string' ? new ObjectId(userid) : userid },
      { $set: { status: false } },
    );
}
