import { UserModel } from '../models/user.model';

export class AuthController {
  static signUp = async (req, res) => {
    console.log(req.body);

    const { pseudo, email, password } = req.body;

    try {
      const user = await UserModel.create({ pseudo, email, password });
      res.status(201).json({ user: user._id });
    } catch (err) {
      res.status(200).send({ err });
    }
  };

  // static signIn = async (req, res) => {
  //   console.log('signin');
  // };

  // static forgotPassword = async (req, res) => {
  //   console.log('signin');
  // };

  // static resetPassword = async (req, res) => {
  //   console.log('signin');
  // };
}
