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
    const tiktokRegex = /(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i
    if (!url.trim() || !tiktokRegex.test(url)) {
      alert('Please enter a valid TikTok video URL 😊\n\nExample:\nhttps://www.tiktok.com/@username/video/123456789')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
      const result = await res.json()
      if (result.error || !result.music?.playUrl) {
        alert('Sorry, that video is private, deleted, or has no sound.\nPlease try a different public TikTok! 🙏')
        setData(null)
      } else {
        setData(result)
      }
    } catch (e) {
      alert('Something went wrong. Please check your link and try again.')
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
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
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
    <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxWidth: '600px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Paste TikTok video link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && fetchData()}
        style={{ width: '100%', padding: '16px 18px', fontSize: '18px', border: '2px solid #d1d5db', borderRadius: '12px', outline: 'none', boxSizing: 'border-box' }}
      />
      <button
        onClick={fetchData}
        disabled={loading}
        style={{ marginTop: '20px', width: '100%', padding: '18px', background: '#111', color: 'white', fontSize: '22px', fontWeight: 'bold', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Get Sound'}
      </button>

      {data && data.music.playUrl && (
        <div style={{ marginTop: '20px', marginBottom: '20px', padding: '20px', background: '#f9fafb', borderRadius: '12px', textAlign: 'center' }}>
          <audio ref={audioRef} controls controlsList="nodownload" src={data.music.playUrl} style={{ width: '100%', height: '50px' }} />
          <p style={{ margin: '10px 0 0', fontSize: '14px', color: '#666' }}>Now playing in browser</p>
        </div>
      )}

      {data && (
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#111' }}>
            {data.music.title || 'Original Sound'}
          </h3>
          <p style={{ color: '#666', margin: '0 0 24px 0', fontSize: '16px' }}>
            by {data.music.author || 'TikTok'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={downloadMP3} style={{ padding: '16px 40px', background: '#ef4444', color: 'white', fontSize: '20px', fontWeight: 'bold', border: 'none', borderRadius: '50px', cursor: 'pointer', minWidth: '220px', height: '56px' }}>
              Download MP3
            </button>
            <button onClick={generatePDF} style={{ padding: '16px 40px', background: '#10b981', color: 'white', fontSize: '20px', fontWeight: 'bold', border: 'none', borderRadius: '100px', cursor: 'pointer', minWidth: '220px', height: '56px' }}>
              Download PDF + QR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
