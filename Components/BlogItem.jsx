'use client'
import Link from 'next/link'
import { useState } from 'react'

const BlogItem = ({ id, image, title, description, category, author, authorImg, date }) => {
  const [imgFailed, setImgFailed] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)

  const showImage = typeof image === 'string' && image.startsWith('http') && !imgFailed
  const showAvatar = typeof authorImg === 'string' && authorImg.startsWith('http') && !avatarFailed
  const hasAuthor = author && author !== 'null'
  const initial = hasAuthor ? author.trim().charAt(0).toUpperCase() : '?'

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <Link
      href={`/blogs/${id}`}
      className='group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
      style={{ width: '100%', maxWidth: 300 }}
    >
      {/* Image: fixed height so it can never blow up */}
      <div style={{ height: 150, overflow: 'hidden', background: '#e5e7eb', position: 'relative' }}>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading='lazy'
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            className='group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 12 }}>
            No image
          </div>
        )}
      </div>

      <div className='flex flex-col flex-1 p-4'>
        {category && (
          <span
            className='self-start text-white font-medium'
            style={{ background: '#2563eb', fontSize: 10, padding: '2px 10px', borderRadius: 999 }}
          >
            {category}
          </span>
        )}

        <h3 className='mt-2 font-semibold text-gray-900 line-clamp-2' style={{ fontSize: 16, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p className='mt-1 text-gray-600 line-clamp-3' style={{ fontSize: 12, lineHeight: 1.5 }}>
          {description}
        </p>

        {/* Author row */}
        <div className='flex items-center gap-2' style={{ marginTop: 'auto', paddingTop: 14 }}>
          {showAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={authorImg}
              alt=''
              onError={() => setAvatarFailed(true)}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 28, height: 28, borderRadius: '50%', background: '#111', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
              }}
            >
              {initial}
            </div>
          )}
          <div style={{ lineHeight: 1.2, minWidth: 0 }}>
            <p className='font-semibold text-gray-900 truncate' style={{ fontSize: 11 }}>
              {hasAuthor ? author : 'Unknown'}
            </p>
            <p className='text-gray-400' style={{ fontSize: 10 }}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem