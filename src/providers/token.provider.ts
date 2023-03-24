import { Connection } from 'mongoose';
import { PROVIDERS } from 'src/constants/provider.constant';
import { TokenSchema } from 'src/schemas/token.schema';

export const tokenProviders = [
  {
    provide: PROVIDERS.TOKEN_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Token', TokenSchema),
    inject: [PROVIDERS.DATABASE_CONNECTION],
  },
];
