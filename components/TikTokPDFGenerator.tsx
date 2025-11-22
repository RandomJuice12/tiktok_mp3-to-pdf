'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

export default function TikTokPDFGenerator() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const fetchTikTokData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
      const result = await res.json()
      setData(result)
    } catch (err) {
      alert('Invalid TikTok link or try again')
    }
    setLoading(false)
  }

  const generatePDF = async () => {
    if (!data) return

    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    let y = 20

    // Title
    pdf.setFontSize(24)
    pdf.text('TikTok Sound', pageWidth / 2, y, { align: 'center' })
    y += 20

    pdf.setFontSize(16)
    pdf.text(data.music.title || 'Unknown Sound', 20, y)
    y += 15
    pdf.text(`by ${data.music.author || 'Original Audio'}`, 20, y)
    y += 25

    // QR Code
    const qr = await QRCode.toDataURL(data.music.playUrl)
    pdf.addImage(qr, 'PNG', pageWidth / 2 - 30, y, 60, 60)
    y += 75

    // Lyrics (if any)
    if (data.description) {
      pdf.setFontSize(14)
      const lines = pdf.splitTextToSize(data.description, pageWidth - 40)
      pdf.text(lines, 20, y)
    }

    pdf.save(`${data.music.title?.slice(0, 30) || 'tiktok-sound'}.pdf`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <input
        type="text"
        placeholder="Paste TikTok video link here..."
        className="w-full p-4 text-lg border-2 border-purple-300 rounded-xl focus:border-purple-600 outline-none"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && fetchTikTokData()}
      />
      
      <button
        onClick={fetchTikTokData}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-5 rounded-xl text-xl hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Extracting...' : 'Generate PDF'}
      </button>

      {data && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">{data.music.title}</h3>
          <p className="text-gray-600 mt-2">by {data.music.author}</p>
          
          <button
            onClick={generatePDF}
            className="mt-6 bg-green-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-green-700 transition"
          >
            Download PDF with QR Code
          </button>
        </div>
      )}
    </div>
  )
}
