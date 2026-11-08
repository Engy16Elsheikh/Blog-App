'use client'
import Link from 'next/link'
import { useState } from 'react'

const BlogItem = ({ id, image, title, description, category, author, date }) => {
  const [failed, setFailed] = useState(false)
  const showImage = typeof image === 'string' && image.startsWith('http') && !failed

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <Link
      href={`/blogs/${id}`}
      className='group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
    >
      <div className='relative w-full aspect-[16/10] bg-gray-100 overflow-hidden'>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading='lazy'
            onError={() => setFailed(true)}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500 text-sm'>
            No image
          </div>
        )}
        {category && (
          <span className='absolute top-3 left-3 bg-black/85 text-white text-xs font-medium px-3 py-1 rounded-full'>
            {category}
          </span>
        )}
      </div>

      <div className='flex flex-col flex-1 p-5'>
        <h3 className='text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {title}
        </h3>
        <p className='mt-2 text-sm text-gray-600 line-clamp-3'>{description}</p>

        <div className='mt-auto pt-5 flex items-center justify-between text-sm'>
          <span className='text-gray-500 truncate'>
            {author && author !== 'null' ? author : ''}
            {author && author !== 'null' && formattedDate ? ' · ' : ''}
            {formattedDate}
          </span>
          <span className='inline-flex items-center gap-1 font-semibold text-gray-900 group-hover:gap-2 transition-all'>
            Read
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem