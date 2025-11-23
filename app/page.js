import TikTokPDFGenerator from '../components/TikTokPDFGenerator'
import { useState, useRef } from 'react'

export default function Home() {
  const [currentTrend, setCurrentTrend] = useState(null)
  const trendAudioRef = useRef(null)

  // Top 5 Trending TikTok Songs (Nov 2025) - Update weekly from Tokchart/Buffer
  const topTrends = [
    {
      id: 1,
      title: 'Gata Only',
      artist: 'FloyyMenor ft. Cris MJ',
      description: 'Reggaeton dance challenges & GRWM videos (25M+ uses)',
      ytLink: 'https://www.youtube.com/watch?v=7yK9OrZf_5w',  // Full version
      playUrl: 'https://example-tiktok-proxy.com/gata-only.mp3'  // Replace with real proxy fetch or direct
    },
    {
      id: 2,
      title: 'Pretty Little Baby',
      artist: 'Connie Francis',
      description: 'Nostalgic edits & day-in-life stories (22.5M+ uses)',
      ytLink: 'https://www.youtube.com/watch?v=example-pretty-baby',
      playUrl: 'https://example-tiktok-proxy.com/pretty-baby.mp3'
    },
    {
      id: 3,
      title: 'Hard Times',
      artist: 'Paramore',
      description: 'Relatable fails & transitions (18M+ uses)',
      ytLink: 'https://www.youtube.com/watch?v=example-hard-times',
      playUrl: 'https://example-tiktok-proxy.com/hard-times.mp3'
    },
    {
      id: 4,
      title: 'Jody Jo',
      artist: 'Unknown Creator',
      description: 'Funny relatable overlays (49k+ videos)',
      ytLink: 'https://www.youtube.com/watch?v=example-jody-jo',
      playUrl: 'https://example-tiktok-proxy.com/jody-jo.mp3'
    },
    {
      id: 5,
      title: 'Falling For You',
      artist: 'Devin Kennedy',
      description: 'Romantic lip-syncs (39k+ videos)',
      ytLink: 'https://www.youtube.com/watch?v=example-falling-for-you',
      playUrl: 'https://example-tiktok-proxy.com/falling-for-you.mp3'
    }
  ]

  const downloadTrendMP3 = async (trend) => {
    // Reuse your existing MP3 proxy logic - call /api/tiktok with POST
    try {
      const res = await fetch('/api/tiktok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playUrl: trend.playUrl })
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `${trend.title}.mp3`
      a.click()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      alert('Download failed - try again!')
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #a855f7, #ec4899)', padding: '16px' }}>
      <div style={{ maxWidth: '1024px', margin: '48px auto', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '16px' }}>
          TikTok Sound → MP3 + PDF
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'white', textAlign: 'center', opacity: 0.95, marginBottom: '48px', lineHeight: '1.5' }}>
          Paste any TikTok link → Get MP3 download <br />
          or QR code to the audio in a beautiful PDF
        </p>

        {/* NEW: Top 5 Trends Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
            🔥 Top 5 Trending TikTok Sounds This Month
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {topTrends.map((trend) => (
              <div key={trend.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>{trend.title}</h3>
                <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '0.9rem' }}>by {trend.artist}</p>
                <p style={{ fontSize: '0.85rem', color: '#999', margin: '0 0 15px 0' }}>{trend.description}</p>
                <audio
                  controls
                  src={trend.playUrl}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => window.open(trend.ytLink, '_blank')}
                    style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    Watch on YT
                  </button>
                  <button
                    onClick={() => downloadTrendMP3(trend)}
                    style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    Download MP3
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Main Tool */}
        <TikTokPDFGenerator />
      </div>
    </main>
  )
}
