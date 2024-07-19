import Image from 'next/image';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-gunmetal dark:text-p3y-grey p-10 px-8 items-center">
        <div className="relative pb-11 text-4xl text-center text-p3y-red">
          <h1 className="absolute translate-x-[1px] -translate-y-[1px]">
            About
          </h1>
          <h1 className="text-p3y-blue dark:text-p3y-blue">About</h1>
        </div>
        <div className="bg-p3y-red relative">
          <div className="h-full w-full absolute translate-x-6 -translate-y-4 bg-p3y-blue"></div>
          <div className="translate-x-3 -translate-y-2 border-2 select-none">
            <Image
              priority
              src="/images/about.jpeg"
              width={260}
              height={300}
              alt="about"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-6 py-10 text-[16px] max-w-[800px]">
          <p>Welcome Traveler!</p>
          <p>
            The purpose of{' '}
            <span className="border-[1px] text-p3y- rounded-[1px] py-[1px] pb-[2px] px-[3px]">
              p3y
            </span>{' '}
            is to showcase some of my current and future development projects.
            Check back in from time to time as I continue to build and update my
            work on the{' '}
            <a className="underline underline-offset-2" href="/projects">
              projects page
            </a>
            . Heck, at some point I might even start that blog I&apos;ve always
            talked about.
          </p>
          <p>
            I started developing professionally in 2013 and cut my teeth coding
            SAP business applications in the ABAP language. After working for
            some of the largest manufacturing companies in the US, I moved on to
            Java and cloud-based Shipping & Logistics software. I was a core
            member of the team that built, launched, and scaled a
            highly-successful shipping platform{' '}
            <a
              className="underline underline-offset-2"
              href="https://www.youtube.com/watch?v=Z1ipZmUjYvs"
              target="_blank"
              rel="noreferrer"
            >
              Intelligent Logistics
            </a>
            .
          </p>
          <p>
            In the last few years I&apos;ve become much more interested in the
            Web, blockchain technology, and building user apps. I love trying my
            hand at new things, which is why in my projects you can find games,
            sustainable ecommerce apps, and various other tools that I find fun
            or interesting.
          </p>
          <p>
            Although I started my career in Chicago, I have been happily based
            in Amsterdam since 2017. I love to travel and in 2021 spent 2 years
            wandering the globe working remotely.
          </p>
          <p>
            If you&apos;re interested in a collaboration or want more
            information about any of my projects, please reach out{' '}
            <a
              className="underline underline-offset-2"
              href="mailto:alexp3y@gmail.com?subject=Hello"
              target="_blank"
              rel="noreferrer"
            >
              via email
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
