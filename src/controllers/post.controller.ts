import { isValidObjectId, Types } from 'mongoose';

import { PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';

export class PostController {
  static readAllPosts = async (req, res) => {
    PostModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error ro get data:' + err);
    }).sort({ createdAt: -1 });
  };

  static createPost = async (req, res) => {
    const newPost = new PostModel({
      posterId: req.body.posterId,
      message: req.body.message,
      video: req.body.video,
      likers: [],
      comments: [],
    });

    try {
      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  static updatePost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    const updatedRecord = {
      message: req.body.message,
    };

    PostModel.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true }, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update post error : ' + err);
    });
  };

  static deletePost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Delete post error : ' + err);
    });
  };

  static likePost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, { $addToSet: { likers: req.body.id } }, { new: true });
      await UserModel.updateOne({ _id: new Types.ObjectId(req.body.id) }, { $addToSet: { likes: req.params.id } }, { new: true });

      return res.status(200).json({ data: post });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  static unlikePost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, { $pull: { likers: req.body.id } }, { new: true });
      await UserModel.updateOne({ _id: new Types.ObjectId(req.body.id) }, { $pull: { likes: req.params.id } }, { new: true });

      return res.status(200).json({ data: post });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  static commentPost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    try {
      const post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
      );

      return res.status(200).json({ data: post });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  static editCommentPost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    try {
      const commentedPost = await PostModel.findById(req.params.id);

      const selectedComment = commentedPost.comments.find((comment) => comment._id.equals(req.body.commentId));

      selectedComment.text = req.body.text;

      return commentedPost.save(() => {
        return res.status(200).send(commentedPost);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  static deleteCommentPost = async (req, res) => {
    // verify if the ID post exist
    if (!isValidObjectId(req.params.id)) return res.status(400).send('post ID unknown : ' + req.params.id);

    try {
      const post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
      );
      return res.status(200).send(post);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}
