import { Document, Schema } from 'mongoose';
import { Token } from 'src/interfaces/token.interface';

export interface TokenDocument extends Token, Document {}

export const TokenSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

TokenSchema.index(
  {
    userid: 1,
    token: 1,
    tokentype: 1,
  },
  { unique: true },
);
