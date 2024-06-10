import Footer from '@/components/Footer';
import HomepageHello from '@/components/HomepageHello';
import NavBar from '@/components/NavBar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <main className="flex h-screen max-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-p3y-olive justify-between lato">
        <NavBar />
        <div className="p-24 z-10 max-w-5xl w-full items-center text-sm flex  flex-col justify-between leading-6 flex-grow bg-p3y-ivory dark:bg-p3y-gunmetal">
          <div className="flex flex-col items-center gap-y-4">
            <HomepageHello />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
