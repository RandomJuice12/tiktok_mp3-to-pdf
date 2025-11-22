import TikTokPDFGenerator from '../components/TikTokPDFGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          TikTok Sound → PDF
        </h1>
        <p className="text-xl text-white text-center mb-12 opacity-90">
          Paste any TikTok link → Get lyrics + QR code to the audio in a beautiful PDF
        </p>
        <TikTokPDFGenerator />
      </div>
    </main>
  )
}
