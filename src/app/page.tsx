import Footer from '@/components/Footer';
import HomepageHello from '@/components/Homepage/HomepageHello';
import NavBar from '@/components/NavBar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <main className="flex h-screen max-h-screen flex-col items-center text-p3y-olive justify-between lato">
        <NavBar />
        <HomepageHello />
        <Footer />
      </main>
    </>
  );
}
