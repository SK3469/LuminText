import {  Clock, FileText, MessageCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticles from './recent-articles'
import { prisma } from '@/lib/prisma'

const BlogDashboard = async() => {
const [articles] = await Promise.all([
  prisma.articles.findMany({
    orderBy:{
      createdAt:'desc'
    },
    include:{
      comments:true,
      author:{
        select:{
          name:true,
          email:true,
          imageUrl:true
        }
      }
    }
  }),
  prisma.comment.count(),
])
  return (
 <main className='flex-1 p-4 md:p-8'>
    <div className='flex justify-between items-center mb-8'>
        <div>
            <h1 className='font-bold text-xl'>Blog Dashboard</h1>
            <p>Manage your content and analytics</p>
        </div>
      <Link href={'/dashboard/articles/create'}>
        <Button><PlusCircle className='w-4 h-4'/>Add Articles </Button>
        </Link>
    </div>
    {/* Stats */}
    <div className='  grid md:grid-cols-3 gap-4'>
        <Card className=' '>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className='font-medium text-sm'> Total Articles</CardTitle>
                <FileText className='w-4 h-4'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold '>{articles.length}</div>
                <p>+5 from last month</p>
            </CardContent>
        </Card>
        <Card className=''>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className='font-medium text-sm'> Total Comments</CardTitle>
                <MessageCircle className='w-4 h-4'/>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold '>4</div>
                <p>12 awaiting opinions</p>
            </CardContent>
        </Card>
        <Card className=''>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Reading Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.8m from last month
            </p>
          </CardContent>
        </Card>
    </div>
      {/* Recent Articles */}
      <RecentArticles articles={articles} />
 </main>
  )
}

export default BlogDashboard