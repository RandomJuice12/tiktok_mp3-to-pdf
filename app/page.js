import TikTokPDFGenerator from '../components/TikTokPDFGenerator'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8f9fa', padding: '16px' }}>
      <div style={{ maxWidth: '1024px', margin: '48px auto', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: '16px' }}>
          Free TikTok Sound Downloaderr
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#444', textAlign: 'center', marginBottom: '48px', lineHeight: '1.6' }}>
          Paste any TikTok link → instantly play + download as MP3 or PDF with QR code<br />
          No app • No login • No watermark
        </p>

        <TikTokPDFGenerator />

        {/* Trust & Legal Footer */}
   <footer style={{ marginTop: '80px', textAlign: 'center', color: '#666', fontSize: '14px', padding: '20px' }}>
  <p>For personal, non-commercial use only • Made with ❤️ for music</p>
  <p>© 2025 SaveTikSound.com</p>
</footer>
