"use client"
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { useSearchParams } from 'next/navigation'
import { searchAction } from '@/actions/search'

const ArticleSearchInput = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") || "";
  

  return (
    <form action={searchAction} className='max-w-2xl mx-auto'>
      <div className='relative  '>
        <Search className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ' />
        <Input
          type="search"
          name="search"
          className='h-10 focus-visible:ring-0 px-10 text-gray-800 '
          placeholder='Search Input....'
          defaultValue={searchText} />
      </div>
    </form>

  )
}

export default ArticleSearchInput