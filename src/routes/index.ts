import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { userRouter } from './user.routes';

import { checkUser, requireAuth } from '../middleware/auth.middleware';

export const initRouter = () => {
  const app: Express = express();
  const port = process.env.PORT;

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server !!!!!');
  });

  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // cookie parser
  app.use(cookieParser());

  // jwt: each request = control of user identity
  app.get('*', checkUser);
  // jwt: automatic login
  app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
  });

  // routes
  app.use('/user', userRouter);

  // server
  app.listen(port, () => {
    console.log(`[Express]: ⚡️HTTP server is running at https://localhost:${port}`);
  });
};
