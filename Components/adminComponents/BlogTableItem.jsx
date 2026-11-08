'use client'
import Image from 'next/image'
import Link from 'next/link'

const BlogTableItem = ({ mongoId, title, author, authorImg, date, deleteBlog }) => {
  const blogDate = date ? new Date(date).toDateString() : '-'

  return (
    <tr className='bg-white border-b text-left hover:bg-gray-50'>
      {/* 1. Author name */}
      <td className='px-6 py-4'>
        <div className='flex items-center gap-3'>
          {authorImg && (
            <Image
              src={authorImg}
              width={32}
              height={32}
              alt=''
              className='rounded-full object-cover w-8 h-8'
            />
          )}
          <span className='font-medium text-gray-700'>{author || 'Unknown'}</span>
        </div>
      </td>

      {/* 2. Blog title (click to open the blog) */}
      <td className='px-6 py-4'>
        <Link
          href={`/blogs/${mongoId}`}
          className='font-medium text-gray-900 hover:text-blue-600 hover:underline'
        >
          {title || 'Untitled'}
        </Link>
      </td>

      {/* 3. Date */}
      <td className='px-6 py-4 whitespace-nowrap text-gray-500'>{blogDate}</td>

      {/* 4. Action */}
      <td className='px-6 py-4'>
        <button
          onClick={() => deleteBlog(mongoId)}
          className='text-red-500 hover:text-red-700 font-medium'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem