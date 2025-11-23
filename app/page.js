import TikTokPDFGenerator from '../components/TikTokPDFGenerator'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #a855f7, #ec4899)', padding: '16px' }}>
      <div style={{ maxWidth: '1024px', margin: '48px auto', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '16px' }}>
          TikTok Sound → MP3 + PDF
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'white', textAlign: 'center', opacity: 0.95, marginBottom: '48px', lineHeight: '1.5' }}>
          Paste any TikTok link → Get MP3 download <br />
          ore QR code to the audio in a beautiful PDF <br /><br />
          Notesss: If using mobile device, hold down on the tiktok video, find "more" in dropdown and copy link <br /> Enjoy!!
        </p>
        <TikTokPDFGenerator />
      </div>
    </main>
  )
}
