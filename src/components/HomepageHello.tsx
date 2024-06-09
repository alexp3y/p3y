'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="w-full md:text-4xl anta text-p3y-red flex flex-col gap-y-8 md:gap-y-8 text-2xl text-center mb-36">
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
        A software developer based in{' '}
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
        Say hello via{' '}
        <Link
          href="mailto:alexp3y@gmail.com?subject=Hello"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">email</span> ✉️
          </span>
        </Link>
      </span>
      <span>
        Or kill some time with a{' '}
        <Link href="/colorflu">
          <span className="active:text-p3y-blue dark:active:text-p3y-maize ">
            <span className="underline underline-offset-4">game</span> 👾
          </span>
        </Link>
      </span>
    </div>
  );
};

export default HomepageHello;
