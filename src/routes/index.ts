import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { userRouter } from './user.routes';
import { postRouter } from './post.routes';

import { checkUser } from '../middleware/auth.middleware';

export const initRouter = () => {
  const app: Express = express();
  const port = process.env.PORT;

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
  };

  app.use(cors(corsOptions));

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server !!!!!');
  });

  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // cookie parser
  app.use(cookieParser());

  // jwt: each request = control of user identity
  app.use('*', checkUser);

  // jwt: automatic login
  app.get('/jwt', (req, res) => {
    // const token = createToken()
    res.status(200).send(res.locals.user._id);
  });

  // routes
  app.use('/user', userRouter);
  app.use('/post', postRouter);

  // server
  app.listen(port, () => {
    console.log(`[Express]: ⚡️HTTP server is running at https://localhost:${port}`);
  });
};
