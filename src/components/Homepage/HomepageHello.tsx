'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="w-full md:text-3xl anta flex flex-col gap-y-6 text-xl dark:text-p3y-grey text-center mb-16 justify-center p-16">
      <span className="text-4xl md:text-5xl pb-4">
        {"Hi there, I'm"}{' '}
        <Link href="/about">
          <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
            <span className="hover:underline underline-offset-4 decoration-2">
              Alex Perry
            </span>{' '}
            👋
          </span>
        </Link>
      </span>
      <span>
        I build software from my home in{' '}
        <Link
          href="https://www.youtube.com/watch?v=3lqNDCaDWgM"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
            <span className="hover:underline underline-offset-4 decoration-2">
              Amsterdam
            </span>{' '}
            🌷
          </span>
        </Link>
      </span>
      <span>
        Checkout some of my{' '}
        <Link href="/projects">
          <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
            <span className="hover:underline underline-offset-4 decoration-2">
              work
            </span>{' '}
            💻
          </span>
        </Link>
      </span>
      <span>
        Send me a hello via{' '}
        <Link
          href="mailto:alexp3y@gmail.com?subject=Hello"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
            <span className="hover:underline underline-offset-4 decoration-2">
              email
            </span>{' '}
            ✉️
          </span>
        </Link>
      </span>
      <span>
        Or waste some time with a silly{' '}
        <Link href="/colorflu">
          <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
            <span className="hover:underline underline-offset-4 decoration-2">
              game
            </span>{' '}
            👾
          </span>
        </Link>
      </span>
    </div>
  );
};

export default HomepageHello;
