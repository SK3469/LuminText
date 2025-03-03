import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { Prisma } from "@prisma/client"
import Link from 'next/link'

type AllArticlePageProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[]
}

const AllArticlePage: React.FC<AllArticlePageProps> = async ({ articles }) => {
    if (articles.length == 0) {
        return <NoSearchResultPage />
    }
    return (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-8 '>
            {
                articles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`}>
                      <Card  className='group relative overflow-hidden translate-all hover:shadow-lg '>
                        <div className='p-4'>
                            <div className='relative h-48 w-full rounded-full'>
                                <Image
                                    src={article.featureImage}
                                    alt='images'
                                    fill
                                    className=' object-cover rounded-xl'
                                />
                            </div>
                            <div className='mt-2 text-lg'>
                                <h3>{article.title}</h3>
                                <p>{article.category}</p>
                                <div className='text-sm flex justify-between items-center mt-4'>
                                    <div className='flex gap-2 items-center'>
                                        <Avatar>
                                            <AvatarImage src={article.author.imageUrl || ""} />
                                            <AvatarFallback>CN</AvatarFallback>

                                        </Avatar>
                                        <h1>{article.author.name}</h1>
                                    </div>
                                    <h1>{article.createdAt.toDateString()}</h1>
                                </div>
                            </div>
                        </div>
                    </Card>
                    </Link>
                  
                ))
            }
        </div>
    )
}

export default AllArticlePage

export const NoSearchResultPage = () => {
    return (
        <div className=' w-full h-[25%] flex justify-center items-center my-24 inset-0 flex-col'>
            <h1 className='font-3xl md:5xl font-bold text-red-500 '>
                No Result Found
            </h1>
            <p className='text-lg'>
            We couldn&rsquo;t find any articles matching your search. Try with a different keyword or phrase.
            </p>
        </div>
    )
}
