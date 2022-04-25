import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { userRouter } from './user.routes';

export const initRouter = () => {
  const app: Express = express();
  const port = process.env.PORT;

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server !!!!!');
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // routes
  app.use('/user', userRouter);

  // server
  app.listen(port, () => {
    console.log(`[Express]: ⚡️HTTP server is running at https://localhost:${port}`);
  });
};
