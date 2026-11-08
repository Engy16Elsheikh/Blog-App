'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { assets } from '@/Assets/assets'
import Footer from '@/Components/Footer'

const isValidSrc = (src) =>
  typeof src === 'string' && (src.startsWith('http') || src.startsWith('/')) && src !== 'null' && src !== 'undefined'

const Page = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    if (!id) return
    axios
      .get('/api/blog', { params: { id } })
      .then((res) => {
        if (!res.data || Array.isArray(res.data)) throw new Error('Not found')
        setData(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [id])

  if (status === 'loading')
    return <div className='min-h-screen flex items-center justify-center text-gray-400'>Loading...</div>

  if (status === 'error')
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
        <p className='text-lg text-gray-600'>Blog not found.</p>
        <Link href='/' className='px-5 py-2 border border-black font-medium hover:bg-black hover:text-white transition'>
          Back to home
        </Link>
      </div>
    )

  const date = data.date
    ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const initial = (data.author || '?').trim().charAt(0).toUpperCase()

  return (
    <>
      {/* Header + hero */}
      <header className='bg-gradient-to-b from-gray-200 to-gray-100 pt-5 pb-40 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src={assets.logo} width={180} alt='logo' className='w-[130px] sm:w-auto' />
          </Link>
          <Link
            href='/'
            className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black bg-white shadow-[-7px_7px_0px_#000000] hover:shadow-none transition'
          >
            All blogs <Image src={assets.arrow} width={20} alt='' />
          </Link>
        </div>

        <div className='text-center mt-16 sm:mt-20'>
          {data.category && (
            <span className='inline-block bg-black text-white text-xs px-3 py-1 rounded-sm mb-5'>
              {data.category}
            </span>
          )}
          <h1 className='text-3xl sm:text-5xl font-semibold leading-tight max-w-[760px] mx-auto'>
            {data.title}
          </h1>

          <div className='flex items-center justify-center gap-3 mt-8'>
            {isValidSrc(data.authorImg) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.authorImg} alt={data.author} className='w-12 h-12 rounded-full object-cover border-2 border-white' />
            ) : (
              <div className='w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold'>
                {initial}
              </div>
            )}
            <div className='text-left'>
              <p className='font-medium'>{data.author}</p>
              {date && <p className='text-sm text-gray-500'>{date}</p>}
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className='mx-5 max-w-[800px] md:mx-auto -mt-28 mb-16'>
        {isValidSrc(data.image) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.image}
            alt={data.title}
            className='w-full aspect-video object-cover border-4 border-white shadow-lg bg-gray-100'
          />
        )}

        <article className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
          <p className='text-gray-700 text-lg leading-8 whitespace-pre-line'>{data.description}</p>
        </article>

        <div className='mt-12 pt-6 border-t flex justify-between items-center'>
          <Link href='/' className='font-medium hover:underline'>← Back to all blogs</Link>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Page