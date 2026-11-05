import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
const BlogTableItem = ({authorImg,title,author,date,deleteBlogs,mongoId}) => {
   let  BlogDate=new Date(date)
  return (
     <tr className='bg-white border'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font font-medium text-gray-500 whitespace-nowrap'>
            <Image src={authorImg?authorImg:assets.profile1} className='rounded-full' width={40}></Image>
            <p>{author?author:"no author"}</p>
        </th>
        <td className='px-6 py-4'>
          {title?title:"no title"}
        </td>
        <td className='px-6 py-4'>
          {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlogs(mongoId)} className='px-6 py-4 cursor-pointer'>
           x
        </td>
     </tr>
  )
}

export default BlogTableItem
