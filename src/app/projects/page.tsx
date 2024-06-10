import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/Projects/ProjectCard';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-red p-10">
        <h1 className="pb-10 text-3xl text-center">Projects</h1>
        <div className="flex w-full flex-wrap gap-10 justify-center pb-8">
          <ProjectCard
            link="/colorflu"
            image="/images/colorflu-splash.png"
            title="ColorFlu"
            description="Web Game using HTML Canvas"
          />
          <ProjectCard
            link="https://givemechoice.com"
            image="/images/gmc-screenshot.png"
            title="Give Me Choice"
            description="Sustainable Ecommerce Platform"
            external
          />
          <ProjectCard
            link="https://github.com/alexp3y/decks"
            image="/images/decksy-screenshot.png"
            title="Decksy"
            description="Flashcard & Education App"
            external
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
