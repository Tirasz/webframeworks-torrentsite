
export interface User{
    id: string,
    date_added: Date
    username: string, 
    email: string,
    pw_hash?: string, 
}

export interface Comment{
    id: string,
    date_added: Date
    userId: string
    content: string,
    torrentId: string
}

export interface Rating{
    id: string,
    userId: string,
    value: 1 | 0 | -1,
    commentId: string
}