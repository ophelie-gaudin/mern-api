import { UserModel } from '../models/user.model';
// import ObjectID from ('mongoose').Types.ObjectID;

export class UserController {
  static getAllUsers = async (req, res) => {
    const users = await UserModel.find().select();
    res.status(200).json(users);
  };
}
