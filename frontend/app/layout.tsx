import './globals.css';
import Header from '../components/Header'; // ✅ use this path since components folder is outside app folder
import Footer from '@/components/Footer';
import GlobalLoader from '@/components/GlobalLoader';

export const metadata = {
  title: 'NextStep AI',
  description: 'AI-driven career counselor for students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />   {/* 👈 Header added here */}
        <GlobalLoader />
        {children}   {/* 👈 Each page’s content will appear below the header */}
        <Footer /> 
      </body>
    </html>
  );
}

