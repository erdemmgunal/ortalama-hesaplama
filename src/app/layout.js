import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: "MÜYYES Ortalama Hesaplama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body className="bg-background flex-grow">
        {children}
        <footer className="text-white p-4 text-center">
          hakkı made it
        </footer>
      </body>
    </html>
  );
}
