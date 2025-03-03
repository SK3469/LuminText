import BlogDashboard from '@/components/dashboard/blog-dashboard'
import Loader from '@/components/loader'
import React, { Suspense } from 'react'

const Dashboard = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
      <BlogDashboard/>
      </Suspense>
      
      
    </div>
  )
}

export default Dashboard