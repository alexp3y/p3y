import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-p3y-olive justify-between lato">
      <div className="flex flex-col text-black items-center">
        <h1 className="py-10 text-p3y-red anta text-3xl">More Soon...</h1>
        <Link href={'https://github.com/alexp3y'} target="_blank">
          <h1 className="cursor-pointer active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-[36px] leading-[1.2] lato-thin">
            @alexp3y
          </h1>
        </Link>
      </div>
    </main>
  );
}
