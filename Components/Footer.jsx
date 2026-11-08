import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'

const Footer = () => {
  return (
    <footer style={{ background: '#000', color: '#fff', marginTop: 40 }}>
      <div
        style={{
          maxWidth: 1200, margin: '0 auto', padding: '28px 20px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}
      >
        <Image src={assets.logo} width={120} alt='blogger' style={{ height: 'auto', background: '#fff', padding: 6, borderRadius: 6 }} />
        <p style={{ fontSize: 14, margin: 0, color: '#d1d5db' }}>
          © {new Date().getFullYear()} Blogger. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Image src={assets.facebook_icon} width={36} alt='facebook' />
          <Image src={assets.twitter_icon} width={36} alt='twitter' />
        </div>
      </div>
    </footer>
  )
}

export default Footer