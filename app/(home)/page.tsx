import { BlogFooter } from "@/components/home/blog-footer";
import Navbar from "@/components/home/header/navbar";
import HeroSection from "@/components/home/hero-section";
import TopArticles from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { AllAArticleSkeletonPage } from "../articles/page";



export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <section className=" relative py-16 md:py-24">
        <div className="container mx-auto px-4 text-center mb-5">
          <h1 className="text-center font-bold text-3xl tracking-tight text-gray-900 dark:text-white">Featured Articles</h1>
          <p>Our most popular and trending content</p>
        </div>
        <Suspense fallback={<AllAArticleSkeletonPage/>  }> 
          <TopArticles />
          </Suspense>
        <div className="mt-10 text-center">
          <Link href={'/articles'}>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900">
              View all articles
            </Button>
          </Link>
        </div>
      </section>
      <BlogFooter/>
    </div>
  );
}
