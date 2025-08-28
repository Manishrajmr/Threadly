'use server'
// import { auth } from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma"
import { Topic } from "@/generated/prisma";
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation";
import { z } from "zod";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase letter without spaces" }),
    description: z.string().min(10, "Description must be at least 10 characters")
})

type CreateTopicFormState = {
    errors: {
        name?: string[],
        description?: string[],
        formError?: string[]
    }
}


export const createTopics = async (prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> => {

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors //object of array of messages
        }
    }

    // const session = await auth();
    const session = await getServerSession(authOptions);

    console.log("session",session);

    

    if (!session || !session.user) {
        return {
            errors: {
                formError: ['You have to login first!']
            }
        }
    }
    let topic : Topic;
    try {
       topic =  await prisma.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
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
                    formError: ['Something went wrong.']
                }
            }
        }
    }
    revalidatePath("/");
    redirect(`/topics/${topic.slug}`);

}