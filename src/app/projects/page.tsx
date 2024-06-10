import ColorfluTitleBar from '@/components/Colorflu/ColorfluTitleBar';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/Projects/ProjectCard';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-red p-10">
        <h1 className="pb-10 text-3xl text-center">Projects</h1>
        <div className="flex w-full flex-wrap gap-8 justify-center">
          <ProjectCard
            link="/colorflu"
            image="/images/colorflu-splash.png"
            title="ColorFlu"
          />
          <ProjectCard
            link="https://givemechoice.com"
            image="/images/gmc-screenshot.png"
            title="Give Me Choice"
            external
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
