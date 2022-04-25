import dotenv from 'dotenv';
import { initRouter } from './routes';
import { initDb } from './db';

dotenv.config();

initDb().then((mongooseClient) => {
  initRouter();
});
