export default () => ({
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
});
