"use client"
import BlogTableItem from '@/Components/adminComponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [blogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog')
    setBlogs(response.data)
  }
  const deleteBlogs = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      await fetchBlogs(); // Refresh blog list
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to delete blog');
    }
  };
  
  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className='flex-1 pt-5 sm:pt:12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='  px-6 py-3'> Author name </th>
              <th scope='col' className='   px-6 py-3'>Blog title</th>
              <th scope='col' className='   px-6 py-3'>Blog Date</th>
              <th scope='col' className='   px-6 py-3'>Action</th>
            </tr>

          </thead>
          <tbody>
            {blogs?.length ? (
              blogs.map((item, index) => (
                <BlogTableItem key={index} mongoId={item._id} title={item.title}  author={item.author} date={item.date} deleteBlogs={deleteBlogs}/>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No blogs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
