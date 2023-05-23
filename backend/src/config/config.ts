import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
});

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
const MONGO_HOST: string = process.env.MONGO_HOST || '';

const MONGO_URL: string = 'mongodb+srv://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@' + MONGO_HOST;

const SERVER_PORT = Number(process.env.SERVER_PORT) || 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
