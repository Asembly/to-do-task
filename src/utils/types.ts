type User = {
    id: string,
    email: string,
    username: string,
    tasks: Task[]
}

type Task = {
    id: string,
    title: string,
    tags: Tag[]
}

type Tag = {
    id: string,
    name: string,
    color: string
}

type ResponseLogin = {
    access_token: string,
    refresh_token: string,
    expires_at: number,
    user: User
}

type ResponseRefresh = {
    access_token: string
}

type Login = {
    username: string | unknown,
    password: string | unknown
}

type AccessToken = {
    access_token: string,
    expires_at: number,
}

type MessageError = {
    error: string
}