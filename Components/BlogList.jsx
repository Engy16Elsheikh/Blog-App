'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const categories = ['All', 'Technology', 'Startup', 'Lifestyle']

const BlogList = () => {
  const [menu, setMenu] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/blog')
      .then((res) => setBlogs(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error('Failed to load blogs', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = blogs.filter((b) => menu === 'All' || b.category === menu)

  return (
    <div>
      <div className='flex flex-wrap justify-center gap-3 my-10'>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setMenu(c)}
            className={`py-1.5 px-5 rounded-full text-sm font-medium transition-colors ${
              menu === c ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className='text-center text-gray-400 mb-16'>Loading...</p>
      ) : filtered.length === 0 ? (
        <p className='text-center text-gray-400 mb-16'>No blogs in this category yet.</p>
      ) : (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16 px-5 xl:mx-24'>
          {filtered.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList