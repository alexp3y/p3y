import Image from 'next/image';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-red p-10 items-center">
        <h1 className="pb-10 text-3xl text-center">About</h1>
        <Image
          priority
          className="rounded-2xl shadow-md"
          src="/images/about.jpeg"
          width={300}
          height={400}
          alt="about"
        />
        <div className="flex flex-col gap-y-6 py-10 text-[14px] max-w-[800px]">
          <p>Welcome Traveler!</p>
          <p>
            The purpose of{' '}
            <span className="border border-p3y-red rounded-[2px] py-[1px] pb-[2px] px-[3px]">
              p3y
            </span>{' '}
            is to showcase some of my current and future development projects.
            Check back in from time to time as I continue to build and add more
            side-projects to the{' '}
            <a className="underline underline-offset-2" href="/projects">
              projects page
            </a>
            . Heck, at some point I might even start that blog I&apos;ve always
            talked about.
          </p>
          <p>
            I started developing professionally 12 years ago and cut my teeth
            coding SAP business applications in the ABAP language. After working
            for some of the largest manufacturing companies in the US, I moved
            on to Java and cloud-based Shipping & Logistics software. I was a
            core member of the team that built, launched, and scaled the
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
            or useful.
          </p>
          <p>
            I grew up in Michigan, USA but have been living in Amsterdam since
            2017. I love to travel and in 2021 spent 2 years moving around the
            globe working remotely. Now I&apos;m back in Holland, cycling
            through the canals.
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
