export interface IPostDB {
    id: string,
    content: string,
    user_id: string
}

export interface ILikeDB {
    id: string,
    post_id: string,
    user_id: string
}

export interface IPostInputDTO {
    content: string,
    token: string
}

export interface IGetPostsDBDTO {
    search: string,
    order: string,
    sort: string,
    limit: number,
    offset: number
}

export interface IGetPostsInputDTO {
    token: string,
    search: string,
    order: string,
    sort: string,
    limit: string,
    page: string
}

export interface IDeletePostInputDTO{
    token: string,
    id: string
}

export interface ILikePostInputDTO {
    token: string,
    id: string,
}

export interface ILikeDBDTO {
    post_id: string;
    user_id: string;
}

export interface IUpdatePostInputDTO {
    token: string,
    id: string,
    content: string,
}
export class Post {
    constructor(
        private id: string,
        private content: string,
        private userId: string,
        private likes: number = 0
    ) {}

    public getId = () => {
        return this.id
    }

    public getContent = () => {
        return this.content
    }

    public getUserId = () => {
        return this.userId
    }

    public getLikes = () => {
        return this.likes
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setContent = (newContent: string) => {
        this.content = newContent
    }

    public setUserId = (newUserId: string) => {
        this.userId = newUserId
    }

    public setLikes = (newLikes: number) => {
        this.likes = newLikes
    }
}
