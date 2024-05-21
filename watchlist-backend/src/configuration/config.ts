import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: Number(env.PORT || 4000),
  mongoUri: env.MONGO_URI,
  frontEndUrl: env.FRONTEND_URL,
  accessTokenSecret: env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
  recoverCodeExpiration: Number(env.RECOVER_CODE_EXPIRATION),
  finnhubAPIUrl: env.FINNHUB_API_URL,
  apiSecretKey:env.SECRET_KEY,
  jwtSecretKey:env.JWT_SECRET
};