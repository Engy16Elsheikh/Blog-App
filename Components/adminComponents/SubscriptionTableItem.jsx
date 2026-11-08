import React from 'react'

const SubscriptionTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = date ? new Date(date).toDateString() : '-'

  return (
    <tr className='bg-white border-b text-left hover:bg-gray-50'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-700 whitespace-nowrap'>
        {email || 'No Email'}
      </th>
      <td className='px-6 py-4 hidden sm:table-cell'>{emailDate}</td>
      <td className='px-6 py-4'>
        <button
          onClick={() => deleteEmail(mongoId)}
          className='text-red-500 hover:text-red-700 font-medium'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default SubscriptionTableItem