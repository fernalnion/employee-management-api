import { Connection } from 'mongoose';
import { PROVIDERS } from 'src/constants/provider.constant';
import { UserSchema } from 'src/schemas/user.schema';

export const userProviders = [
  {
    provide: PROVIDERS.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [PROVIDERS.DATABASE_CONNECTION],
  },
];
