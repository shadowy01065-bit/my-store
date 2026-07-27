import './globals.css'

export const metadata = {
  title: 'Suhail Communications',
  verification: {
    google: 'BedPviPTUFe1M4jYhCkVkLoEQmwmf3pPz0O9CtfjnBM',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}