'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

export default function TikTokPDFGenerator() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

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

const downloadMP3 = () => {
  if (!data?.music?.playUrl) return

  const url = data.music.playUrl
  const filename = `${data.music.title?.slice(0, 50) || 'tiktok-sound'}.mp3`

  if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(blobUrl)
      })
      .catch(() => {
        const a = document.createElement('a')
        a.href = url + '?download=1'
        a.target = '_blank'
        a.download = filename
        a.click()
      })
  } else {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
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
    y += 100

    if (data.description) {
      pdf.setFontSize(14)
      const lines = pdf.splitTextToSize(data.description, pageWidth - 40)
      pdf.text(lines, 20, y)
    }

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
        style={{ width: '100%', padding: '16px', fontSize: '18px', border: '3px solid #d8b4fe', borderRadius: '12px', outline: 'none' }}
      />

      <button
        onClick={fetchData}
        disabled={loading}
        style={{ marginTop: '20px', width: '100%', padding: '18px', background: 'linear-gradient(to right, #a855f7, #ec4899)', color: 'white', fontSize: '22px', fontWeight: 'bold', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Get Sound Info'}
      </button>

      {data && (
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            {data.music.title || 'Original Sound'}
          </h3>
          <p style={{ color: '#666', margin: '0 0 30px 0' }}>
            by {data.music.author || 'TikTok'}
          </p>

          {/* MP3 DOWNLOAD BUTTON */}
          <button
            onClick={downloadMP3}
            style={{ 
              padding: '16px 40px', 
              background: '#ef4444', 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold',
              border: 'none', 
              borderRadius: '50px', 
              cursor: 'pointer',
              margin: '0 10px'
            }}
          >
            Download MP3
          </button>

          {/* PDF DOWNLOAD BUTTON */}
          <button
            onClick={generatePDF}
            style={{ 
              padding: '16px 40px', 
              background: '#10b981', 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold',
              border: 'none', 
              borderRadius: '50px', 
              cursor: 'pointer',
              margin: '0 10px'
            }}
          >
            Download PDF + QR
          </button>
        </div>
      )}
    </div>
  )
}
