import type { Metadata } from 'next'
import './globals.css'
import inject from '@stylexjs/dev-runtime'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: "Canto Gallery",
  description: "Gallery generated and pulled from Canto",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (process.env.NODE_ENV !== 'production') {
    inject({
      // configuration options
      classNamePrefix: 'x-',
      dev: true,
      test: false,
      useRemForFontSize: false,
      styleResolution: 'application-order',
    })
  }
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://use.typekit.net/dhb2xzm.css" />
    </head>
    <body>
      <main>
        <Header />
        {children}  
      </main>
    </body>
  </html>
  )
}

