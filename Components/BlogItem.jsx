import Image from 'next/image'
import Link from 'next/link'

const BlogItem = ({ id, image, title, description, category }) => {
  return (
    <Link
      href={`/blogs/${id}`}
      className='group flex flex-col bg-white border border-black overflow-hidden transition-all hover:shadow-[-7px_7px_0px_#000000]'
    >
      <div className='relative w-full aspect-[16/10] border-b border-black'>
        <Image
          src={image}
          alt={title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='object-cover'
        />
      </div>

      <div className='flex flex-col flex-1 p-5'>
        <span className='self-start bg-black text-white text-xs px-3 py-1 rounded-sm'>
          {category}
        </span>
        <h5 className='mt-4 mb-2 text-lg font-semibold tracking-tight text-gray-900 group-hover:underline line-clamp-2'>
          {title}
        </h5>
        <p
          className='text-sm text-gray-700 line-clamp-3'
          dangerouslySetInnerHTML={{ __html: description?.slice(0, 160) }}
        />
        <span className='mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold'>
          Read more
          <Image src='/arrow.png' alt='' width={12} height={12} />
        </span>
      </div>
    </Link>
  )
}

export default BlogItem