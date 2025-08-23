"use server"
import {z} from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"

const CreateCommentSchema = z.object({
    content:z.string().min(10)
});

type CreateCommentState = {
   errors:{
     content?:string[],
     formError?:string[]
   }
}


export const createComment = async({postId,parentId}:{postId:string,parentId?:string},prevState:CreateCommentState,formData:FormData):Promise<CreateCommentState> =>{

    const result = CreateCommentSchema.safeParse({
        content:formData.get('content'),
    })

    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors
        }
    }


    //user authentication
    const session = await getServerSession(authOptions);

      if (!session || !session.user||!session.user.id ){
            return {
                errors: {
                    formError: ['You have to login first!']
                }
            }
     }

      try {

        await prisma.comment.create({
            data:{
                content:result.data.content,
                postId,
                userId:session.user.id,
                parentId
            }
        })

        } catch (error) {
                 if (error instanceof Error) {
                     return {
                         errors: {
                             formError: [error.message]
                         }
                     }
                 } else {
                     return {
                         errors: {
                             formError: ['faild to comment.']
                         }
                     }
                 }
             }

     const topic = await prisma.topic.findFirst({
        where: { posts: { some: { id: postId } } }
    });
    if (!topic) {
        return {
            errors: {
                formError: ['Failed to revalidate path']
            }
        }
    }

     revalidatePath(`/topics/${topic.slug}/posts/${postId}`);
    return {
        errors:{}
    }



}