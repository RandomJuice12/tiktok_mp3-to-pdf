import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* === SEO & Google Love === */}
        <title>Free TikTok Sound Downloader 2025 | Save Audio as MP3 No Watermark</title>
        <meta name="google-site-verification" content="0AIykeDTcpImDzbkbeuoR5L4019LiRN9xyFty5ADwj0" />
        <meta name="description" content="Download any TikTok sound as high-quality MP3 in 2 seconds. No app, no login, no watermark. Works perfectly on iPhone & Android." />

        {/* Open Graph – makes your link look pro when shared */}
        <meta property="og:title" content="SaveTikSound – Free TikTok Sound Downloader" />
        <meta property="og:description" content="Instantly save TikTok audio as MP3 – no watermark, no app needed" />
        <meta property="og:url" content="https://savetiksound.com" />
        <meta property="og:type" content="website" />

        {/* Schema markup – tells Google this is a real tool */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SaveTikSound",
            "description": "Free tool to download TikTok sounds as MP3 for personal use",
            "url": "https://savetiksound.com",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0" }
          })}
        </script>

        {/* Umami Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="214893a7-ce04-44fe-acb1-1fabd5cab8b6"
        ></script>
      </head>

      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
