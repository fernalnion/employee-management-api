import { ROLES } from 'src/enums/role.enum';

export interface User {
  _id?: string | any;
  email: string;
  firstname: string;
  lastname: string;
  passwordhash: string;
  role: ROLES;
  mobile: string;
  dob: number;
  activated: boolean;
  verified: boolean;
}

export interface Login {
  identity: string;
  password: string;
}
