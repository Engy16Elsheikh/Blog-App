'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const categories = ['All', 'Technology', 'Startup', 'Lifestyle']

// Small cards side by side, as many as fit per row
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 300px))',
  gap: 20,
  justifyContent: 'center',
}

const SkeletonCard = () => (
  <div className='rounded-2xl border border-gray-200 overflow-hidden animate-pulse' style={{ maxWidth: 300 }}>
    <div style={{ height: 150, background: '#e5e7eb' }} />
    <div className='p-4 space-y-2'>
      <div className='h-4 bg-gray-200 rounded w-3/4' />
      <div className='h-3 bg-gray-200 rounded' />
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
    <section className='mx-auto px-4 pb-20' style={{ maxWidth: 1300 }}>
      <div className='flex flex-wrap justify-center gap-2 my-8'>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setMenu(c)}
            className={`py-1.5 px-5 rounded-full text-sm font-medium transition-all ${
              menu === c ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={gridStyle}>
          {[1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className='text-center text-gray-400 py-16'>No blogs in this category yet.</p>
      ) : (
        <div style={gridStyle}>
          {filtered.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              author={item.author}
              authorImg={item.authorImg}
              date={item.date}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogList