import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initDb } from './db';

dotenv.config();

initDb().then((mongooseClient) => {
  const app: Express = express();
  const port = process.env.PORT;

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server !!!!!');
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
