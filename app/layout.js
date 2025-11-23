import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Umami Analytics – starts tracking immediately */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="214893a7-ce04-44fe-acb1-1fabd5cab8b6"
        ></script>
      </head>

      <body>
        {children}
        <Analytics />  {/* ← you can delete this line later if you want */}
      </body>
    </html>
  )
}
