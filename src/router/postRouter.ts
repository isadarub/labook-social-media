import { Router } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../database/PostDatabase'
import { UserDatabase } from '../database/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const postRouter = Router()

const postBusiness = new PostBusiness(
    new PostDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
) 

const postController = new PostController(postBusiness)

postRouter.post('/create', postController.createPost)
postRouter.get('/', postController.getPosts)
postRouter.delete('/:id', postController.deletePost)
postRouter.post('/like/:id', postController.likePost)
postRouter.delete('/dislike/:id', postController.dislikePost)
postRouter.put('/:id',postController.updatePost)
