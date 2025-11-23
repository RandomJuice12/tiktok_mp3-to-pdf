export async function POST(request) {
  const { playUrl, type = 'mp3' } = await request.json()
  if (!playUrl) return new Response('No playUrl', { status: 400 })

  try {
    const response = await fetch(playUrl)
    if (!response.ok) throw new Error('Failed to fetch')

    const arrayBuffer = await response.arrayBuffer()
    const filename = type === 'mp4' ? 'tiktok-video.mp4' : 'tiktok-sound.mp3'

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': type === 'mp4' ? 'video/mp4' : 'audio/mpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    return new Response('Download failed', { status: 500 })
  }
}
