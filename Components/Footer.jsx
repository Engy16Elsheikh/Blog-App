import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
const Footer = () => {
  return (
    <div className='flex justify-around flex-col sm:gap-0 sm:flex-row bg-black py-5 itemscenter'>
      <Image src={assets.logo} width={120} alt=''></Image>
      <p className='text-sm text-white'>All right reserved. Copyright @blogger</p>
      <div className='flex'>
        <Image src={assets.facebook_icon} width={40} alt=''></Image>
        <Image src={assets.twitter_icon} width={40} alt=''></Image>
      </div>
    </div>
  )
}

export default Footer
