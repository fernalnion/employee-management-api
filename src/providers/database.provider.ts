import * as mongoose from 'mongoose';
import { PROVIDERS } from 'src/constants/provider.constant';
export const databaseproviders = [
  {
    provide: PROVIDERS.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_CONNECTION_STRING ?? ''),
  },
];
