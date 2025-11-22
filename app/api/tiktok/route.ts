import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) return Response.json({ error: 'No URL' }, { status: 400 })

  // Using a free public TikTok scraper API (works great in 2025)
  const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
  
  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    
    return Response.json({
      description: data.data?.title || '',
      music: {
        title: data.data?.music_info?.title || 'Original Sound',
        author: data.data?.music_info?.author || 'TikTok',
        playUrl: data.data?.music || data.data?.play
      }
    })
  } catch (err) {
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}

export const maxDuration = 60
