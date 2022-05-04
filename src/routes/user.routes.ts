// import fs from 'fs';
import { Router } from 'express';
import multer from 'multer';

import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { UploadController } from '../controllers/upload.controller';

export const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// auth
userRouter.post('/register', AuthController.signUp);
userRouter.post('/login', AuthController.signIn);
userRouter.get('/logout', AuthController.logOut);

// user DB
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserInfo);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.patch('/follow/:id', UserController.follow);
userRouter.patch('/unfollow/:id', UserController.unfollow);

// upload
userRouter.post('/upload-avatar', upload.single('file'), UploadController.uploadAvatar);

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
