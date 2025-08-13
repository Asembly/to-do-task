type User = {
    id: string,
    email: string
    username: string,
    tasks: Task[]
}

type Task = {
    id: string,
    title: string,
    tags: Tag[] 
} 

type Tag = {
   id: string
   name: string 
   color: string
}