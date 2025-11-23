export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  if (!url) return new Response(JSON.stringify({ error: 'No URL' }), { status: 400 })

  const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
  
  try {
    const res = await fetch(apiUrl)
    const json = await res.json()
    
    return new Response(JSON.stringify({
      description: json.data?.title || '',
      music: {
        title: json.data?.music_info?.title || 'Original Sound',
        author: json.data?.music_info?.author || 'TikTok',
        playUrl: json.data?.music || json.data?.play
      }
    }))
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 })
  }
}

// Keep POST for MP3 proxy (unchanged)
export async function POST(request) {
  const { playUrl } = await request.json()
  if (!playUrl) return new Response('No playUrl', { status: 400 })

  try {
    const response = await fetch(playUrl)
    if (!response.ok) throw new Error('Failed to fetch audio')

    const arrayBuffer = await response.arrayBuffer()
    const filename = 'tiktok-sound.mp3'

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    return new Response('Download failed', { status: 500 })
  }
}

export const maxDuration = 60
