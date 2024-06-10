import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-p3y-ivory dark:bg-p3y-gunmetal text-p3y-olive justify-between lato">
      <NavBar />
      <div className="flex flex-col text-black items-center">
        <h3 className="py-10 text-p3y-red anta text-3xl">More Soon...</h3>
      </div>
      <Footer />
    </main>
  );
}
