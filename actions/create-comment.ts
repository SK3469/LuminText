"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createCommentSchema = z.object({
    body: z.string().min(5)
})
type createCommentFormState = {
    errors: {
        body?: string[]
        formErrors?: string[]
    }
}
export const createComment = async (
    articleId: string,
    prevState: createCommentFormState,
    formData: FormData) => {
    const result = createCommentSchema.safeParse({ body: formData.get('body') })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ["Your have to login first"]
            }
        }
    }
    const existinguser = await prisma.user.findUnique(
        {
            where:
                { clerkUserId: userId }
        })
    if (!existinguser) {
        return {
            errors: {
                formErrors: ["User not found , Pls register first to adding comments"]
            }
        }
    }
    try {
        await prisma.comment.create({
            data: {
                body: result.data.body,
                authorId: existinguser.id,
                articleId
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formErrors: ['Error occurred while adding comments']
                }
            }
        }
    }revalidatePath(`/articles/${articleId}`)
    return { errors: {} }
}
