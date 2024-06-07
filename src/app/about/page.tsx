import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col text-black items-center">
      <h1 className="py-10 text-p3y-red anta">Coming Soon...</h1>
      <Link href={'https://github.com/alexp3y'} target="_blank">
        <h1 className="cursor-pointer active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-[36px] leading-[1.2] lato-thin">
          @alexp3y
        </h1>
      </Link>
    </div>
  );
}
