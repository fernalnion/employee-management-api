interface TokenBase {
  email: string;
  mobile: string;
}

export interface Token extends TokenBase {
  sub: string;
}

export interface ValidToken extends TokenBase {
  id: string;
}
