export const metadata = {
  title: 'Electro Market',
  description: 'متجرك الأفضل للأجهزة الكهرومنزلية',
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
  );
}
