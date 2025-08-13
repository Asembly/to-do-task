'use server'

import { authConfig, serverInstance } from "@/utils/config"
import { auth } from "./auth";

export async function getTasks()
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 

   const response = await serverInstance.get("/api/task",
      {
         headers: {
            'Authorization': "Bearer " + session?.accessToken 
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   return response
}

export async function getTaskByUserId()
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken
   const userId = session?.user?.id

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

export async function createTask(initialState: any, formData: FormData)
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken
   const userId = session?.user?.id

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

   return response
}

export async function createTag(prevState: Task, formData: FormData)
{
   const session: { user?: { id: string }; accessToken?: string } | null = await auth() 
   const accessToken = session?.accessToken

   const data = {
      name: formData.get("name"), 
      color: formData.get("color"), 
   }
   const taskId = formData.get("taskId")  

   console.log("ACTIONS" + taskId)

   console.log(data)
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

   return response
}

export async function createUser(prevState: User, formData: FormData)
{
   const data = {
      username: formData.get("username"), 
      email: formData.get("email"), 
      password: formData.get("password"), 
   }

   console.log(data)

   const response: User = await serverInstance.post(`/api/auth/sign-up`, data,
      {
         headers: {
            'Content-Type': "application/json"
         }
      }
   )  
   .then(res => res.data)
   .catch(error => error)

   return response
}

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

   return response
}