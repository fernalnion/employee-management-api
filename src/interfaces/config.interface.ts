export interface Config {
  PORT: number;
  MONGO_CONNECTION_STRING: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}
