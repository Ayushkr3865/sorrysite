import "./globals.css";
import GlobalAudioPlayer from "../components/GlobalAudioPlayer";

export const metadata = {
  title: "I'm Sorry",
  description: "A heartfelt apology website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* 🎵 Music Player stays across all pages */}
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}
