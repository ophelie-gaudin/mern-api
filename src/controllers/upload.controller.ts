import fs from 'fs';
import { UserModel } from '../models/user.model';

// const pipeline = promisify(stream.pipeline);
const authorizedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
const dir = './public/images/avatars';

if (!fs.existsSync(dir)) {
  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}

export class UploadController {
  static uploadAvatar = async (req, res, next) => {
    // return res.status(200).send('toto');

    const file = req.file as Express.Multer.File;

    if (!authorizedMimeTypes.includes(file.mimetype)) {
      next(new Error('Invalid file type'));
    }

    if (file.size > 500000) next(new Error('Max size exceeded.'));

    try {
      const promise = new Promise((resolve, reject) => {
        fs.writeFile(`${dir}/${file.originalname}`, file.buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });

      await promise;

      const user = await UserModel.findByIdAndUpdate(
        res.locals.user._id,
        { $set: { picture: file.originalname } },
        { new: true, projection: { picture: 1, _id: 1 } },
      );

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
