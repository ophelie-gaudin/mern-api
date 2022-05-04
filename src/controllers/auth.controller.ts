import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { signInErrors, signUpErrors } from '../utils/errors.utils';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt?.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

export class AuthController {
  static signUp = async (req, res) => {
    console.log(req.body);

    const { pseudo, email, password } = req.body;

    try {
      const user = await UserModel.create({ pseudo, email, password });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = signUpErrors(err);
      res.status(400).send({ errors });
    }
  };

  static signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.login(email, password);

      const token = createToken(user._id);

      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });

      console.log('cookie ok');

      return res.status(200).json({ user: user._id });
    } catch (err) {
      console.log(err);
      const errors = signInErrors(err);
      return res.status(400).json({ errors });
    }
  };

  static logOut = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  };

  // static forgotPassword = async (req, res) => {
  //   console.log('signin');
  // };

  // static resetPassword = async (req, res) => {
  //   console.log('signin');
  // };
}
