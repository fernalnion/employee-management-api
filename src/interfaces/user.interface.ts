import { ROLES } from 'src/enums/role.enum';

export interface User {
  _id?: string | any;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: ROLES;
  mobile: string;
  dob: number;
  activated?: boolean;
  verified?: boolean;
  refreshToken?: string | null;
}

export interface Login {
  email: string;
  password: string;
}
