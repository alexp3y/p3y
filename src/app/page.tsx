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
      <main className="flex min-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-[#41463D] justify-between lato">
        <NavBar />
        <div className="p-24 z-10 max-w-5xl w-full items-center text-sm flex text-[#41463d] flex-col leading-6 flex-grow">
          <div className="flex flex-col items-center gap-y-6">
            <span className="text-7xl tracking-tighter text-[#ff5e5b] border-[3px] border-[#ff5e5b] rounded-[5px] px-[8px] pt-0 pb-[11px] dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer active:border-[#00cecb] active:text-[#00cecb] active:bg[#ffed66]">
              p3y
            </span>
            <div className="flex flex-col text-black items-center">
              <Link href={'https://github.com/alexp3y'} target="_blank">
                <h1 className="cursor-pointer active:text-[#ff5e5b] text-[#41463D] dark:text-p3y-red text-[36px] leading-[1.2] lato-thin">
                  @alexp3y
                </h1>
              </Link>
              <span className="cursor-pointer hover:text-[#ff5e5b] active:text-[#00cecb] text-[#41463D] text-base lato text-[18px]">
                {/* alexp3y@gmail.com */}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lato">
          <div className="w-full p-4 flex-col flex text-[18px] bg-[#ff5e5b]" />
          {/* <div className="w-full border-t border-[#ffed66] flex-col flex text-[18px] bg-[#00cecb] p-10"></div> */}
        </div>
      </main>
    </>
  );
}
