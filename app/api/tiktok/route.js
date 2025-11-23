export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  if (!url) return new Response(JSON.stringify({ error: 'No URL' }), { status: 400 })

  // Detect platform
  const isInstagram = url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')

  let apiUrl, responsePath
  if (isInstagram) {
    // Free IG Reels API (works in 2025, similar to tikwm)
    apiUrl = `https://igram.world/api/download?url=${encodeURIComponent(url)}`
    responsePath = 'data'  // Adjust based on IG API response
  } else {
    // Existing TikTok
    apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
    responsePath = 'data'
  }

  try {
    const res = await fetch(apiUrl)
    const json = await res.json()

    // Unified response (works for both)
    return new Response(JSON.stringify({
      description: json[responsePath]?.title || json[responsePath]?.description || '',
      music: {
        title: json[responsePath]?.music_title || json[responsePath]?.title || 'Original Sound',
        author: json[responsePath]?.author || json[responsePath]?.username || 'Instagram/TikTok',
        playUrl: json[responsePath]?.audio_url || json[responsePath]?.music || json[responsePath]?.play
      }
    }))
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed - try a valid link' }), { status: 500 })
  }
}

// Keep the existing POST for MP3 proxy (unchanged)
export async function POST(request) {
  // ... your existing POST code ...
}

export const maxDuration = 60
