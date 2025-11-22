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
    const a = document.createElement('a')
    a.href = data.music.playUrl
    a.download = `${data.music.title || 'tiktok-sound'}.mp3`
    a.click()
  }

  const generatePDF = async () => {
    if (!data) return
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    let y = 30

    pdf.setFontSize(28)
    pdf.text('TikTok Sound', pageWidth / 2, y, { align: 'center' })
    y += 25

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

    pdf.save(`${data.music.title?.slice(0, 40) || 'tiktok'}.pdf`)
  }

  return (
    <div style Iadd the MP3 download button here ↓
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        {/* input & generate button same as before */}
        <input /* ... same as before ... */ />
        <button onClick={fetchData} disabled={loading} /* ... same ... */>
          {loading ? 'Loading...' : 'Generate PDF'}
        </button>

        {data && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>{data.music.title || 'Original Sound'}</h3>
            <p style={{ color: '#666', margin: '8px 0' }}>by {data.music.author || 'TikTok'}</p>

            {/* NEW: MP3 Download Button */}
            <button 
              onClick={downloadMP3}
              style={{ margin: '12px', padding: '14px 32px', background: '#ef4444', color: 'white', fontSize: '18px', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
              Download MP3
            </button>

            {/* Existing PDF button */}
            <button onClick={generatePDF} style={{ margin: '12px', padding: '14px 32px', background: '#10b981', color: 'white', fontSize: '18px', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
              Download PDF + QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
