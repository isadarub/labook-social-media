import { IGetPostsDBDTO, ILikeDB, ILikeDBDTO, IPostDB, Post } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"
import { UserDatabase } from "./UserDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "Labook_Posts"
    public static TABLE_LIKES = "Labook_Likes"

    public createPost = async (post: Post) => {
        const result: IPostDB = {
            id: post.getId(),
            content: post.getContent(),
            user_id: post.getUserId()
        }

        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(result)
    }

    public getPosts = async (input:IGetPostsDBDTO)=> {
        const search = input.search
        const order = input.order
        const sort = input.sort
        const limit = input.limit
        const offset = input.offset

        const postsDB:IPostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where("content", "LIKE", `%${search}%`)
        .orderBy(order, sort)
        .limit(limit)
        .offset(offset)

        return postsDB
    }

    public getLikes = async (id:string) => {

        const result = await BaseDatabase.connection(PostDatabase.TABLE_LIKES)
        .select()
        .count("id")
        .where({post_id: id})


        return result[0]["count(`id`)"]
    }

    public findById = async(id:string) => {
        const postsDB:IPostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id})

        return postsDB[0]
    }

    public deletePostById = async (id: string) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public likePost = async(input:ILikeDB) => {
        const newLikeDB: ILikeDB = {
            id: input.id,
            post_id: input.post_id,
            user_id: input.user_id
        }
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES)
        .insert(newLikeDB)
    }

    public isLiked = async (id:string, userId: string) => {
        const postLikeDB: ILikeDB[] = await BaseDatabase
            .connection("Labook_Likes")
            .select()
            .where("user_id", "=", `${userId}`)
            .andWhere("post_id", "=", `${id}`)

        return postLikeDB[0]
    }

    public dislikePost = async (dislike:ILikeDBDTO) => {
        const dislikeDB: ILikeDBDTO = {
            post_id: dislike.post_id,
            user_id: dislike.user_id
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .where({ post_id: dislike.post_id, user_id: dislike.user_id })
            .delete();
    }

    public modifyPost = async (post: IPostDB) => {
        const postDB: IPostDB = {
            id: post.id,
            content: post.content,
            user_id: post.user_id
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: post.id})
    }
}