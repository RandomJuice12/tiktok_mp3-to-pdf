'use client'

import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

export default function TikTokPDFGenerator() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const audioRef = useRef(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
      const result = await res.json()
      setData(result)
    } catch (e) {
      alert('Invalid TikTok link — try another one!')
    }
    setLoading(false)
  }

  const downloadMP3 = async () => {
    if (!data?.music?.playUrl) return
    const filename = `${data.music.title?.slice(0, 50) || 'tiktok-sound'}.mp3`

    try {
      const res = await fetch('/api/tiktok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playUrl: data.music.playUrl })
      })
      if (!res.ok) throw new Error()

      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      a.click()
      a.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      alert('Download failed — try Chrome')
    }
  }

  const generatePDF = async () => {
    if (!data) return
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    let y = 30

    pdf.setFontSize(28)
    pdf.text('TikTok Sound', pageWidth / 2, y, { align: 'center' })
    y += 30
    pdf.setFontSize(18)
    pdf.text(data.music.title || 'Unknown Sound', 20, y)
    y += 15
    pdf.text(`by ${data.music.author || 'Original Audio'}`, 20, y)
    y += 40

    const qr = await QRCode.toDataURL(data.music.playUrl)
    pdf.addImage(qr, 'PNG', pageWidth / 2 - 40, y, 80, 80)

    pdf.save(`${data.music.title?.slice(0, 40) || 'tiktok'}-sound.pdf`)
  }

  return (
  <div style={{ 
    background: 'white', 
    borderRadius: '16px', 
    padding: '40px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
    maxWidth: '600px', 
    margin: '0 auto',
    border: '1px solid #e5e7eb'
  }}>
    <input
      type="text"
      placeholder="Paste TikTok video link here..."
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && fetchData()}
      style={{ 
        width: '100%', 
        padding: '16px', 
        fontSize: '18px', 
        border: '2px solid #d1d5db', 
        borderRadius: '12px', 
        outline: 'none',
        transition: 'border 0.2s'
      }}
      onFocus={(e) => e.target.style.border = '2px solid #6b7280'}
      onBlur={(e) => e.target.style.border = '2px solid #d1d5db'}
    />

    <button
      onClick={fetchData}
      disabled={loading}
      style={{ 
        marginTop: '20px', 
        width: '100%', 
        padding: '18px', 
        background: '#111', 
        color: 'white', 
        fontSize: '22px', 
        fontWeight: 'bold', 
        border: 'none', 
        borderRadius: '12px', 
        cursor: 'pointer',
        transition: 'background 0.2s'
      }}
      onMouseOver={(e) => e.target.style.background = '#333'}
      onMouseOut={(e) => e.target.style.background = '#111'}
    >
      {loading ? 'Loading...' : 'Get Sound'}
    </button>

    {/* AUDIO PLAYER */}
    {data && data.music.playUrl && (
      <div style={{ marginTop: '25px', padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <audio
          ref={audioRef}
          controls
          controlsList="nodownload"
          src={data.music.playUrl}
          style={{ width: '100%', height: '50px', borderRadius: '8px' }}
        />
        <p style={{ margin: '10px 0 0', fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Now playing in browser
        </p>
      </div>
    )}

    {/* DOWNLOAD BUTTONS */}
    {data && (
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111' }}>
          {data.music.title || 'Original Sound'}
        </h3>
        <p style={{ color: '#666', margin: '0 0 30px 0' }}>
          by {data.music.author || 'TikTok'}
        </p>

        <button
          onClick={downloadMP3}
          style={{ 
            padding: '16px 40px', 
            background: '#1f2937', 
            color: 'white', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer', 
            margin: '0 12px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#111'}
          onMouseOut={(e) => e.target.style.background = '#1f2937'}
        >
          Download MP3
        </button>

        <button
          onClick={generatePDF}
          style={{ 
            padding: '16px 40px', 
            background: '#4b5563', 
            color: 'white', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer', 
            margin: '0 12px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#374151'}
          onMouseOut={(e) => e.target.style.background = '#4b5563'}
        >
          Download PDF + QR
        </button>
      </div>
    )}
  </div>
)
