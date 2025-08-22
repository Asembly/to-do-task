'use server'
import { redirect } from "next/navigation";
import { auth, signOut } from "./auth";
import { serverInstance } from "./config";
import { AxiosError, isAxiosError } from "axios";
import { revalidateTag } from "next/cache";

/* /api/auth/sign-up POST */
export async function signUp(prevState: User, formData: FormData)
{
   const data = {
      username: formData.get("username"), 
      email: formData.get("email"), 
      password: formData.get("password"), 
   }

   console.log(data)

   const response: User | AxiosError = await serverInstance.post(`/api/auth/sign-up`, data,
      {
         headers: {
            'Content-Type': "application/json"
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   if(!isAxiosError(response))
   {
      console.log("Пользователь успешно зарегестрировался. " + response)
      redirect("/sign-in")
   }

   return response
}

/* /api/auth/sign-in POST */
export async function login(data: Login)
{
   console.log(data)

   const response: AxiosError | ResponseLogin = await serverInstance.post(`/api/auth/sign-in`,data,
      {
         headers: {
            'Content-Type': "application/json"
         },
      }
   )  
   .then(res => res.data)
   .catch(error => error);

   if(isAxiosError(response))
   {
      console.log('Пользователь с такими данными не найден.')
      return undefined
   }

   console.log("Пользователь успешно авторизовался на сервере: " + response.user.username)

   return response 
}

/* /api/auth/logout POST */
export async function logout(refreshToken: string | undefined)
{
   console.log(refreshToken)

   if(refreshToken == undefined)
      return "Refresh Token is undefined"

   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken

   const data = {
      refreshToken: refreshToken
   } 

   const response = await serverInstance.post(`/api/auth/logout`,data,
      {
         headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': "application/json"
         },
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   await signOut()   

   return response 
}

export async function refresh(refreshToken: string)
{
   const data = {
      refreshToken: refreshToken
   } 

   const response: AccessToken = await serverInstance.post(`/api/auth/refresh`,data,
      {
         headers: {
            'Content-Type': "application/json"
         },
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   if(!response)
    return null

   console.log("Токен обновился на сервере: " + response.access_token)

   return response
}

/*  /api/user/:id/tasks POST  */
export async function addTask(initialState: any, formData: FormData)
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const userId = session?.user?.id
   const accessToken = session?.accessToken

   const data = {
      title: formData.get("title") 
   }

   console.log(data)
   const response: Task = await serverInstance.post(`/api/user/${userId}/tasks`, data,
      {
         headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': "application/json"
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   if(response)
    console.log("Задача создана: \"" + response.title + "\"")

   revalidateTag('/')

   return response
}

/*  /api/user/:id GET */
export async function getTaskByUserId()
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const userId = session?.user?.id
   const accessToken = session?.accessToken

   const response: User = await serverInstance.get(`/api/user/${userId}`,
      {
         headers: {
            'Authorization': "Bearer " + accessToken,
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   return response.tasks
}

/*  /api/task/:id/tags POST */
export async function addTag(prevState: Task, formData: FormData)
{

   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken

   const data = {
      name: formData.get("name"), 
      color: formData.get("color"), 
   }

   console.log("Форма отправлена: " + data.name)

   const taskId = formData.get("taskId")  

   const response: Task = await serverInstance.post(`/api/task/${taskId}/tags`, data,
      {
         headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': "application/json"
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   revalidateTag('/')

   return response
}

/*  /api/tag/:id DELETE */
export async function removeTag(tagId: string)
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken

   const response = await serverInstance.delete(`/api/tag/${tagId}`, 
      {
         headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': "application/json"
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   revalidateTag('/')

   return response
}