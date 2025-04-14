import './globals.css'

export const metadata = {
  title: 'Digital Health Dashboard',
  description: 'A comprehensive health monitoring dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 