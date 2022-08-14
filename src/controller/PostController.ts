import { Request,Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { IDeletePostInputDTO, IGetPostsDBDTO, IGetPostsInputDTO, ILikePostInputDTO, IPostInputDTO, IUpdatePostInputDTO } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public createPost = async(req:Request, res:Response) => {
        try {
            const input:IPostInputDTO = {
                content: req.body.content,
                token: req.headers.authorization
            }

            const response = await this.postBusiness.createPost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    public getPosts =async (req:Request, res: Response) => {
        try {
            const input:IGetPostsInputDTO = {
                token: req.headers.authorization,
                search: req.query.search as string,
                order: req.query.order as string,
                sort: req.query.sort as string,
                limit: req.query.limit as string,
                page: req.query.page as string
            }
    
            const response = await this.postBusiness.getPosts(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deletePost = async(req:Request, res: Response) => {
        try {
            const input:IDeletePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }

            const response = await this.postBusiness.deletePost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    public likePost = async(req:Request, res:Response)=> {
        try {
            const input: ILikePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }

            const response = await this.postBusiness.likePost(input)
            res.status(200).send(response)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    public dislikePost = async (req: Request, res: Response) => {
        try {
            const input: ILikePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }
            
            const response = await this.postBusiness.dislikePost(input);

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    public updatePost = async (req: Request, res: Response) => {
        try {
            const input: IUpdatePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id,
                content: req.body.content
            }

            const response = await this.postBusiness.modifyPost(input)

            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

}