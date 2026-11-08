'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const categories = ['All', 'Technology', 'Startup', 'Lifestyle']

const SkeletonCard = () => (
  <div className='rounded-2xl border border-gray-200 overflow-hidden animate-pulse'>
    <div className='aspect-[16/10] bg-gray-200' />
    <div className='p-5 space-y-3'>
      <div className='h-5 bg-gray-200 rounded w-3/4' />
      <div className='h-4 bg-gray-200 rounded' />
      <div className='h-4 bg-gray-200 rounded w-5/6' />
    </div>
  </div>
)

const BlogList = () => {
  const [menu, setMenu] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/blog')
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : []
        setBlogs([...list].reverse()) // newest first
      })
      .catch((err) => console.error('Failed to load blogs', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = blogs.filter((b) => menu === 'All' || b.category === menu)

  return (
    <section className='max-w-7xl mx-auto px-5 pb-20'>
      <div className='flex flex-wrap justify-center gap-3 my-10'>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setMenu(c)}
            className={`py-2 px-6 rounded-full text-sm font-medium transition-all ${
              menu === c
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className='text-center text-gray-400 py-16'>No blogs in this category yet.</p>
      ) : (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              author={item.author}
              date={item.date}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList