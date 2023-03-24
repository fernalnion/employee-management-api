import { Schema, Document } from 'mongoose';
import { ROLES } from 'src/enums/role.enum';
import { User } from 'src/interfaces/user.interface';

export interface UserDocument extends User, Document { }

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
  password: {
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
  refreshToken: {
    type: String,
    default: null,
  },
});

UserSchema.index({
  email: 1,
  mobile: 1,
});
