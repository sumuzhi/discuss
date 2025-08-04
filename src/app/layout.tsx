// app/layout.tsx

// globals.css includes @tailwind directives
// adjust the path if necessary
import Header from "@/components/header/header";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <div className='max-w-[1024px] px-6 mt-5 mx-auto'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
