import AllArticlePage from '@/components/articles/all-article'
import AllArticleSkeletonPage from '@/components/articles/all-article-skeleton'
import ArticleSearchInput from '@/components/articles/article-search-input'
import { Button } from '@/components/ui/button'
import { fetchArticleByQuery } from '@/lib/query/featch-article-by-query'
import Link from 'next/link'
import React, { Suspense } from 'react'

type SearchPageProps = {
    searchParams: Promise<{ search?: string; page?: string }>
}
const ITEMS_PER_PAGE = 3;
const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
    const searchText = (await searchParams).search || "";
    const currentPage = Number((await searchParams).page) || 1;

    const skip = (currentPage - 1) * ITEMS_PER_PAGE
    const take = ITEMS_PER_PAGE
    const { articles, total } = await fetchArticleByQuery(searchText, skip, take)
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    return (
        <div className='min-h-screen bg-background'>
            <main className='container mx-auto px-4 py-2 sm:px-6 lg:text-5xl'>
            
                    <Link href={'/articles'}> <Button variant={'link'} className='text-sm '>← Back</Button></Link>
                {/* Page Header */}
                <div className=' text-center space-y-6 mb-12'>
                    <h1 className='font-bold text-4xl '>All Articles</h1>
                    <ArticleSearchInput />
                </div>
                {/* All Article card */}
                <Suspense fallback={<AllArticleSkeletonPage />}>
                    <AllArticlePage articles={articles} />
                </Suspense>
                {/* pagination */}
                <div className='flex justify-center gap-2 mt-5'>
                    <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
                        <Button variant={"ghost"} disabled={currentPage == 1} size={'sm'}>← Prev</Button></Link>
                    {
                        Array.from({ length: totalPages }).map((_, index) => (
                            <Link key={index} href={`?search=${searchText}&page=${index + 1}`}>
                                <Button variant={`${currentPage == index+1 ? "destructive":"ghost"}`} size={'sm'}>{index+1}</Button>
                            </Link>
                        ))
                    }


                    <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
                        <Button variant={"ghost"} disabled={currentPage == totalPages} size={'sm'}>Next → </Button></Link>
                </div>
            </main>
        </div>
    )
}

export default page;


