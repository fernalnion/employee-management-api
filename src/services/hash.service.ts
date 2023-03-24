import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HarshService {
  hashData = async (value: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(value, saltOrRounds);
    return hash;
  };

  compareData = async (value: string, hash: string) => {
    const result = await bcrypt.compare(value, hash);
    return result;
  };
}
