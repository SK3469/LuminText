"use client"
import React, { FormEvent, startTransition, useActionState, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css'
import { createArticle } from '@/actions/create-article'

const ReactQuill = dynamic(() => import(`react-quill-new`), { ssr: false }) //bcz we cant use server side rendring 
const CreateArticlesPage = () => {
  const [content, setContent] = useState("")
  const [formState, action, isPending] = useActionState(createArticle, { errors: {} })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("content", content);
    startTransition(() => {
      action(formData)
    })
  }
  return (
    <div className='min-h-screen w-full flex-1 mx-auto my-5 p-4'>
      <Card >
        <CardHeader>
          <h1 className='font-bold text-xl'>Create New Article</h1>
        </CardHeader>
        <CardContent >
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                type='text'
                name='title'
                placeholder='Enter a article title'
              />
              {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span>}
            </div>
            <div >
              <Label className='font-medium text-md'>Category</Label>
              <select className='p-4'
                name="category" id="category">
                <option value="">Select Category</option>
                <option value="technology">Technoloy</option>
                <option value="softwares">Softwares</option>
                <option value="programming">Programming</option>
              </select>
              {formState.errors.category && <span className='text-red-600 text-sm'>{formState.errors.category}</span>}
            </div>
            <div className='flex items-center gap-4 '>
              <Label htmlFor='featuredImage' className='font-medium text-md'>Feature Image</Label>
              <Input
                type='file'
                name='featuredImage'
                accept='image/*'
                className='w-[300px]' />
            </div>
            <div className='my-4'>
              <Label htmlFor='featuredImage' className='font-medium text-md'>Content</Label>
              <ReactQuill
                theme='snow'
                value={content}
                onChange={setContent}
              />
              {formState.errors.content && <span className='text-red-600 text-sm'>{formState.errors.content[0]}</span>}
            </div>
            <div className='text-right mt-5'>
              <Button variant={'outline'}>Cancel</Button>
              <Button type='submit' disabled={isPending}>
                {
                  isPending ? "Loading..." : "Publish Articles"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateArticlesPage