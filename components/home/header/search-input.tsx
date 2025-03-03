"use client"
import { searchAction } from '@/actions/search'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchInput = () => {
  const params = useSearchParams()
  return (
    <form action={searchAction}>
      <div className=' relative '>
        <Search className=' absolute left-2 h-4 top-1/2 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          type="search"
          name="search"
          defaultValue={params.get('search') || ""}
          placeholder="Search articles..."
          className='pl-10 w-32 md:48 focus-visible:ring-0' />
      </div>
    </form>
  )
}

export default SearchInput