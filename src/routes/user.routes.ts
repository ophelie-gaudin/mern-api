import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const userRouter = Router();

userRouter.post('/register', AuthController.signUp);

// userRouter.post('/signin', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// userRouter.post('/forgot-pwd', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// userRouter.post('/reset-pwd', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// userRouter.get('/me', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// // generics

// // find
// userRouter.get('/', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// // find one
// userRouter.get('/:id', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// // create
// userRouter.post('/', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// // update
// userRouter.patch('/', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });

// // delete
// userRouter.delete('/', (req, res) => {
//   console.log('toto');
//   res.send('tutu');
// });
