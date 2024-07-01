'use client';
import Link from 'next/link';
import React from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="mb-[20vh] mt-12 rounded-none sm:bg-p3y-red sm:dark:bg-p3y-red max-w-xl ml-8 mr-12 relative">
      <div className="absolute h-full w-full sm:bg-p3y-blue rounded-none translate-x-4 -translate-y-4"></div>
      <div className="cursor-default w-fit min-w-full rounded-none md:text-2xl anta flex flex-col gap-y-6 text-2xl dark:text-p3y-grey text-center justify-center sm:border-2 border-p3y-gunmetal translate-x-2 bg-p3y-grey dark:bg-p3y-gunmetal -translate-y-2 p-7 sm:p-10  py-10 sm:py-14 dark:border-p3y-grey relative">
        <div className="text-4xl sm:text-5xl pb-5 flex flex-col justify-center items-center">
          <span className="text-nowrap">{"Hi there, I'm"} </span>
          <Link href="/about">
            <span className="relative active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[3px] hover:-translate-y-[2px] duration-150 text-nowrap">
                Alex Perry
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue text-nowrap">
                Alex Perry
              </span>
            </span>
          </Link>
        </div>
        <span>
          I build software in{' '}
          <Link
            href="https://www.youtube.com/watch?v=sEON08d76oE"
            target="_blank"
            rel="noreferrer"
          >
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[2px] hover:-translate-y-[2px] duration-150 ">
                AMSTERDAM
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">
                AMSTERDAM
              </span>
            </span>
          </Link>
        </span>
        <span>
          Checkout some of my{' '}
          <Link href="/projects">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap ">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[2px] hover:-translate-y-[2px] duration-150 ">
                WORK
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">WORK</span>
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
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap ">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[2px] hover:-translate-y-[2px] duration-150 ">
                EMAIL
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">EMAIL</span>
            </span>
          </Link>
        </span>
        <span>
          Or try your hand at a{' '}
          <Link href="/colorflu">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap ">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[2px] hover:-translate-y-[2px] duration-150 ">
                GAME
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">GAME</span>
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HomepageHello;
