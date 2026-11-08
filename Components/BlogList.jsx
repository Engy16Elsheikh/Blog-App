'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const categories = ['All', 'Technology', 'Startup', 'Lifestyle']

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 300px))',
  gap: 24,
  justifyContent: 'center',
}

const SkeletonCard = () => (
  <div style={{ maxWidth: 300, border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }} className='animate-pulse'>
    <div style={{ height: 150, background: '#e5e7eb' }} />
    <div style={{ padding: 16 }}>
      <div style={{ height: 14, width: '70%', background: '#e5e7eb', borderRadius: 4 }} />
      <div style={{ height: 10, marginTop: 10, background: '#e5e7eb', borderRadius: 4 }} />
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
        setBlogs([...list].reverse())
      })
      .catch((err) => console.error('Failed to load blogs', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = blogs.filter((b) => menu === 'All' || b.category === menu)

  return (
    <section style={{ maxWidth: 1300, margin: '0 auto', padding: '64px 20px 80px' }}>
      {/* Filters: big space above and below so they never touch the form or cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setMenu(c)}
            style={{
              padding: '8px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              border: menu === c ? '1px solid #000' : '1px solid #e5e7eb',
              background: menu === c ? '#000' : '#fff',
              color: menu === c ? '#fff' : '#374151',
              transition: 'all .2s',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={gridStyle}>{[1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}</div>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#9ca3af', padding: '48px 0' }}>No blogs in this category yet.</p>
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