import { UserModel } from '../models/user.model';
import { isValidObjectId } from 'mongoose';

export class UserController {
  static getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    // '-password' remove password of response display for security
    res.status(200).json(users);
  };

  static getUserInfo = async (req, res) => {
    console.log(req.params);

    // verify if the ID user exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id);

    // if it exists, execute :
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      // docs: data in response
      else console.log('ID unknown : ' + err);
    }).select('-password');
  };

  static updateUser = async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try {
      const userDocument = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true },
      );

      return res.status(200).send(userDocument);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  static deleteUser = async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try {
      await UserModel.remove({ _id: req.params.id }).exec();

      res.status(200).json({ message: 'Successfully deleted.' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
}
