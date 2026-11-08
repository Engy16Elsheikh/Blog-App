'use client'
import SubscriptionTableItem from '@/Components/adminComponents/SubscriptionTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email')
      setEmails(response.data.emails || [])
    } catch (error) {
      toast.error('Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', { params: { id: mongoId } })
      if (response.data.success) {
        toast.success(response.data.msg)
        setEmails((prev) => prev.filter((e) => e._id !== mongoId))
      } else {
        toast.error('Error deleting email')
      }
    } catch (error) {
      toast.error('Failed to delete email')
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-2xl font-semibold'>All Subscriptions</h1>
      <div className='max-w-[600px] overflow-x-auto mt-4 rounded-lg border border-gray-200 shadow-sm'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Email</th>
              <th scope='col' className='hidden sm:table-cell px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className='px-6 py-8 text-center text-gray-400'>Loading...</td></tr>
            ) : emails.length === 0 ? (
              <tr><td colSpan={3} className='px-6 py-8 text-center text-gray-400'>No subscriptions yet</td></tr>
            ) : (
              emails.map((item) => (
                <SubscriptionTableItem
                  key={item._id}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                  deleteEmail={deleteEmail}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page