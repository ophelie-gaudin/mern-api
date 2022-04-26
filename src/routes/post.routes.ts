import { Router } from 'express';

import { PostController } from '../controllers/post.controller';

export const postRouter = Router();

postRouter.get('/', PostController.readAllPosts);
postRouter.post('/', PostController.createPost);
postRouter.put('/:id', PostController.updatePost);
postRouter.delete('/:id', PostController.deletePost);
postRouter.patch('/like-post/:id', PostController.likePost);
postRouter.patch('/unlike-post/:id', PostController.unlikePost);

// comments
postRouter.patch('/comment-post/:id', PostController.commentPost);
postRouter.patch('/edit-comment-post/:id', PostController.editCommentPost);
postRouter.patch('/delete-comment-post/:id', PostController.deleteCommentPost);
