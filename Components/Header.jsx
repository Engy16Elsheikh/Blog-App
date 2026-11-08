'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../Assets/assets'

const Header = () => {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const formData = new FormData()
      formData.append('email', email)
      const response = await axios.post('/api/email', formData)
      if (response.data.success) {
        toast.success(response.data.msg)
        setEmail('')
      } else {
        toast.error('Error')
      }
    } catch {
      toast.error('Failed to subscribe')
    } finally {
      setSending(false)
    }
  }

  return (
    <header style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px 0' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Link href='/'>
          <Image src={assets.logo} width={160} alt='logo' style={{ height: 'auto', width: 140 }} />
        </Link>
        <Link
          href='/admin'
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600,
            padding: '10px 20px', border: '1px solid #000', background: '#fff',
            boxShadow: '-5px 5px 0 #000', whiteSpace: 'nowrap',
          }}
        >
          Get Started <Image src={assets.arrow} width={18} alt='arrow' />
        </Link>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginTop: 56 }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 600, lineHeight: 1.1, margin: 0 }}>
          Latest Blogs
        </h1>
        <p style={{ maxWidth: 640, margin: '20px auto 0', color: '#4b5563', fontSize: 16, lineHeight: 1.6 }}>
          Stories, ideas and updates on technology, startups and lifestyle. Subscribe to get new posts in your inbox.
        </p>

        <form
          onSubmit={onSubmitHandler}
          style={{
            display: 'flex', maxWidth: 520, margin: '32px auto 0',
            border: '1px solid #000', background: '#fff', boxShadow: '-6px 6px 0 #000',
          }}
        >
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            style={{ flex: 1, minWidth: 0, padding: '14px 16px', border: 'none', outline: 'none', fontSize: 15, background: 'transparent' }}
          />
          <button
            type='submit'
            disabled={sending}
            style={{
              borderLeft: '1px solid #000', padding: '0 24px', background: '#000', color: '#fff',
              fontWeight: 600, cursor: 'pointer', opacity: sending ? 0.6 : 1,
            }}
          >
            {sending ? '...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header