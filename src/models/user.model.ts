import mongoose from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
      // trim permet d'enlever les espaces en fin de pseudo si l'user en met
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

// play function before save into DB
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  // salt to encrypt password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel = mongoose.model('user', userSchema);
