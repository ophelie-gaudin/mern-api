import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie('jwt', '', { maxAge: 1 });
        next();
      } else {
        // console.log('decoded token : ', decodedToken);
        const user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log('error: ' + err);
      } else {
        console.log('connectedUserId: ' + decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
    return res.status(400).json({ error: 'No token' });
  }
};
