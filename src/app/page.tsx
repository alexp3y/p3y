import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// border-[#ffed66]
export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-p3y-olive justify-between lato">
        <NavBar />
        <div className="p-24 z-10 max-w-5xl w-full items-center text-sm flex  flex-col justify-between leading-6 flex-grow">
          <div className="flex flex-col items-center gap-y-4">
            <span className="text-7xl tracking-tighter text-p3y-red border-[3px] border-p3y-red rounded-[5px] px-[8px] pt-0 pb-[11px] dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer active:border-p3y-blue active:text-p3y-blue">
              p3y
            </span>
            <div className="flex flex-col text-black items-center">
              <Link href={'https://github.com/alexp3y'} target="_blank">
                <h1 className="cursor-pointer active:text-p3y-red dark:text-p3y-red text-[36px] leading-[1.2] lato-thin">
                  @alexp3y
                </h1>
              </Link>
            </div>
          </div>
          <div className="w-full text-4xl anta text-p3y-red flex flex-col pt-8 gap-y-2">
            {/* <span>{"Hi, I'm Alex Perry."}</span> */}
            {/* <span>A Software Engineer</span>
            <span>based in Amsterdam.</span> */}
          </div>
        </div>
        <div className="flex flex-col w-full lato">
          <div className="w-full p-4 flex-col flex text-[18px] bg-p3y-red min-h-1/2" />
        </div>
      </main>
    </>
  );
}
