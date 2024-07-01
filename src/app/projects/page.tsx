import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/Projects/ProjectCard';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="relative py-10 text-4xl text-center text-p3y-red">
        <h1 className="absolute translate-x-[1px] -translate-y-[1px]">
          Projects
        </h1>
        <h1 className="text-p3y-blue">Projects</h1>
      </div>
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-red md:p-10 pt-2 max-w-screen pb-12">
        <div className="flex w-full flex-wrap gap-10 lg:gap-14 justify-center pb-8">
          <ProjectCard
            demoUrl="/colorflu"
            repoUrl="https://github.com/alexp3y/p3y/tree/main/src/projects/colorflu"
            image="/images/colorflu-splash.png"
            title="ColorFlu"
            description="Web Game using HTML Canvas"
          />
          <ProjectCard
            demoUrl="https://givemechoice.com"
            repoUrl="https://github.com/GiveMeChoice/gmc-backend"
            image="/images/gmc-screenshot.png"
            title="Give Me Choice"
            description="Sustainable Ecommerce Platform"
          />
          <ProjectCard
            demoUrl="https://decksy.app"
            repoUrl="https://github.com/alexp3y/decksy-backend"
            image="/images/decksy.jpg"
            title="Decksy"
            description="Minimalist Flashcard App"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
