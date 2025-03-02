import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className='className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-indigo-950'>
            <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />
            <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32 '>
                <div className='flex-1 space-y-8 text-center  md:text-left'>
                    <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>Explore the world of code Through
                        <span className='bg-gradient-to-r from-violet-400 bg-clip-text text-transparent'>
                            {" "}
                            LuminText</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                    "Explore a world of knowledge with expert insights, captivating stories, 
                    and the latest trends in technology, lifestyle, and innovation."
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                        <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                            Start Reading
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg dark:text-white"
                        >
                            Explore Topics
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
                        <div className="space-y-2">
                            <div className="text-2xl font-bold text-white text-primary">1K+</div>
                            <div className="text-sm text-gray-200">Published Articles</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl text-white font-bold text-primary">50+</div>
                            <div className="text-sm text-gray-200">Expert Writers</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold text-white text-primary">10M+</div>
                            <div className="text-sm text-gray-200">Monthly Readers</div>
                        </div>
                    </div>
                </div>
                <div className='mt-12 flex-1 md:mt-0'>
                    <div className={cn(
                        "relative mx-auto h-64 w-64 rounded-2xl overflow-hidden",
                        "bg-gradient-to-br from-white/5 to-transparent",
                        "border border-primary/20 backdrop-blur-lg",
                        "shadow-2xl shadow-indigo-500/10"
                    )}>
                        <Image
                            src="https://media.istockphoto.com/id/1042450928/photo/young-handsome-man-wearing-sunglasses-over-isolated-background-afraid-and-shocked-with.jpg?s=2048x2048&w=is&k=20&c=J64HiieIMBDCHxfzIXmYSqZOs_bUdkzP4CEkBJlk_3E="
                            alt="Illustration for the blog"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection