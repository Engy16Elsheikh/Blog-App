'use client'
import Link from 'next/link'
import { useState } from 'react'

const BlogItem = ({ id, image, title, description, category, author, date }) => {
  const [failed, setFailed] = useState(false)
  const showImage = typeof image === 'string' && image.startsWith('http') && !failed

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : ''

  return (
    <Link
      href={`/blogs/${id}`}
      className='group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200'
    >
      <div className='relative w-full aspect-[4/3] bg-gray-100 overflow-hidden'>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading='lazy'
            onError={() => setFailed(true)}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500 text-xs'>
            No image
          </div>
        )}
        {category && (
          <span className='absolute top-2 left-2 bg-black/85 text-white text-[10px] font-medium px-2 py-0.5 rounded-full'>
            {category}
          </span>
        )}
      </div>

      <div className='flex flex-col flex-1 p-3'>
        <h3 className='text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {title}
        </h3>
        <p className='mt-1 text-xs text-gray-600 line-clamp-2'>{description}</p>

        <div className='mt-auto pt-3 flex items-center justify-between text-[11px] text-gray-500'>
          <span className='truncate'>
            {author && author !== 'null' ? author : ''}
            {author && author !== 'null' && formattedDate ? ' · ' : ''}
            {formattedDate}
          </span>
          <span className='font-semibold text-gray-900 group-hover:translate-x-0.5 transition-transform'>
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem