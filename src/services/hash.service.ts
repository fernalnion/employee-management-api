import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HarshService {
  hashPassword = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };

  comparePassword = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash);
    return result;
  };
}
