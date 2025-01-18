import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import GridBackground from './components/GridBackground'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"

// Define the font using the Google font API
const mono = JetBrains_Mono({ subsets: ['latin'] })

// Define metadata for the page
export const metadata = {
  title: 'Anant Kumar - Software Developer Engineer',
  description: 'Personal portfolio of Anant',
  icons: {
    icon: '/file.svg',
  },
}

// Define types for the RootLayout component props
interface RootLayoutProps {
  children: React.ReactNode; // This defines that the children prop is of type ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${mono.className} bg-[#1c1c1c] text-white min-h-screen relative overflow-x-hidden`}>
        <GridBackground />
        <div className="relative z-0">
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
