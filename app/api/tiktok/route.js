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

export const maxDuration = 60
