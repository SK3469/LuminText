"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const likeDislikeToggle = async (articleId: string) => {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("Your must login to comment ")
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if(!user){
         throw new Error ("Your have to signin first")
    }
    const existingLike = await prisma.like.findFirst({
        where:{articleId , userId:user.id}
    })
    if(existingLike){
        //dislike feature
        await prisma.like.delete({
            where:{
                id:existingLike.id
            }
        })
    } else{
        // like function
        await prisma.like.create({
            data:{
                articleId ,
                userId:user.id
            }
        })
    }
    revalidatePath(`articles/${articleId}`)
}