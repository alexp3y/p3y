'use client';
import Link from 'next/link';
import React from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="mb-[20vh] mt-8 rounded-lg bg-p3y-red max-w-xl mx-6">
      <div className="w-fit min-w-full rounded-lg md:text-2xl anta flex flex-col gap-y-6 text-xl dark:text-p3y-grey text-center justify-center border-[3px] border-p3y-red translate-x-[7px] bg-p3y-ivory dark:bg-p3y-gunmetal -translate-y-[7px] p-8 sm:p-10 py-14">
        <span className="text-4xl md:text-5xl pb-6">
          {"Hi there, I'm"}{' '}
          <Link href="/about">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
              <span className="">Alex Perry</span>
            </span>
          </Link>
        </span>
        <span>
          I build software in{' '}
          <Link
            href="https://www.youtube.com/watch?v=3lqNDCaDWgM"
            target="_blank"
            rel="noreferrer"
          >
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
              <span className="">Amsterdam</span> 🌷
            </span>
          </Link>
        </span>
        <span>
          Checkout some of my{' '}
          <Link href="/projects">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
              <span className="">work</span> 💻
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
              <span className="">email</span> 📫
            </span>
          </Link>
        </span>
        <span>
          Or try your hand at a{' '}
          <Link href="/colorflu">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap hover:text-p3y-blue dark:hover:text-p3y-maize">
              <span className="">game</span> 🕹️
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HomepageHello;
