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
      <main className="flex h-screen max-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-p3y-olive justify-between lato overflow-y-hidden">
        <NavBar />
        <div className="p-24 z-10 max-w-5xl w-full items-center text-sm flex  flex-col justify-between leading-6 flex-grow">
          <div className="flex flex-col items-center gap-y-4">
            <HomepageHello />
          </div>
        </div>
        <div className="flex flex-col w-full lato">
          <div className="w-full p-4 flex-col flex text-[18px] bg-p3y-red min-h-1/2" />
        </div>
      </main>
    </>
  );
}
