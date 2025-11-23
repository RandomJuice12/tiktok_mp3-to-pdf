import TikTokPDFGenerator from '../components/TikTokPDFGenerator'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8f9fa', padding: '16px' }}>
      <div style={{ maxWidth: '1024px', margin: '48px auto', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: '16px' }}>
          Save TikTok Sounds
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#444', textAlign: 'center', marginBottom: '48px', lineHeight: '1.6' }}>
          Paste any TikTok link → instantly play + download as MP3 or PDF with QR code
        </p>

        <TikTokPDFGenerator />
      </div>
    </main>
  )
}
