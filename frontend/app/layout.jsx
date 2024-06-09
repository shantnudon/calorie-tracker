import "./globals.css";
import { Toaster } from 'sonner'

export const metadata = {
  title: "Calorie Tracker App",
  description: "This is a Calorie tracking app made using MERN stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Toaster richColors/>{children}</body>
    </html>
  );
}
