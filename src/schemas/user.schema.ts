import { Schema } from 'mongoose';
import { ROLES } from 'src/enums/role.enum';
import { User } from 'src/interfaces/user.interface';

export interface UserDocument extends User, Document {}

export const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    require: true,
    unique: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  passwordhash: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    enum: ROLES,
    default: ROLES.USER,
  },
  dob: {
    type: Number,
    require: true,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.index({
  email: 1,
  mobile: 1,
});
