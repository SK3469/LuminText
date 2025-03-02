import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { Prisma } from '@prisma/client'

type CommentListProps = {
    comments: Prisma.CommentGetPayload<{
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true
                }
            }
        }
    }>[]
}
const CommentList:React.FC<CommentListProps> = ({comments}) => {

    return (
        <div className='space-y-8'>

           {
            comments.map((comment)=>(
                <div key={comment.id} className='flex gap-3 '>
                <Avatar>
                    <AvatarImage src={comment.author.imageUrl || ""}/>
                    <AvatarFallback>{comment.author.name}</AvatarFallback>
                </Avatar>
                <div>
                    <div className='flex flex-row gap-3'>
                        <h1>{comment.author.name}</h1>
                        <p>{comment.createdAt.toDateString()}</p>
                    </div>
                    <h1>{comment.body}</h1>
                </div>
            </div>
            ))
           }

        </div>
    )
}

export default CommentList