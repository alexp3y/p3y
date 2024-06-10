import Image from 'next/image';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col text-black flex-grow justify-start text-p3y-red p-10">
        <Image
          priority
          className="rounded-2xl shadow-md"
          src="/images/about.jpeg"
          width={200}
          height={400}
          alt="about"
        />
        <h3 className="py-10 text-p3y-red anta text-3xl">More Soon...</h3>
      </div>
      <Footer />
    </main>
  );
}
