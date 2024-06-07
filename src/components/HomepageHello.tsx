import Link from 'next/link';
import React from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="w-full text-4xl anta text-p3y-red flex flex-col pt-8 gap-y-2">
      <span>
        {"Hi, I'm"}{' '}
        <Link
          href="https://www.linkedin.com/in/alexmperry/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">Alex Perry</span> 👋
          </span>
        </Link>
      </span>
      <span>
        A developer based in{' '}
        <Link
          href="https://www.youtube.com/watch?v=3lqNDCaDWgM"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">Amsterdam</span> 🌷
          </span>
        </Link>
      </span>
      <span>
        Checkout some of{' '}
        <Link
          href="https://github.com/alexp3y"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">my work</span> 💻
          </span>
        </Link>
      </span>
      <span>
        Reach out to me{' '}
        <Link
          href="mailto:alexp3y@gmail.com?subject=Hello"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">here</span> ✉️
          </span>
        </Link>
      </span>
      <span>
        Or kill some time with a{' '}
        <Link href="/colorflu">
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">small game</span> 👾
          </span>
        </Link>
      </span>
    </div>
  );
};

export default HomepageHello;
