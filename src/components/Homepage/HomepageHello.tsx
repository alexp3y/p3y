'use client';
import Link from 'next/link';
import React from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="mb-[20vh] mt-8 rounded-lg bg-p3y-gunmetal dark:bg-p3y-grey max-w-xl mx-6">
      <div className="cursor-default w-fit min-w-full rounded-lg md:text-2xl anta flex flex-col gap-y-6 text-2xl dark:text-p3y-grey text-center justify-center border-2 border-p3y-gunmetal translate-x-[5px] bg-p3y-ivory dark:bg-p3y-gunmetal -translate-y-[5px] p-8 sm:p-10 py-14 dark:border-p3y-grey">
        <div className="text-5xl pb-5 flex flex-col justify-center items-center">
          <span className="text-nowrap">{"Hi there, I'm"} </span>
          <Link href="/about">
            <span className="relative active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap">
              <span className="absolute translate-x-[1px] -translate-y-[1px] hover:translate-x-[3px] hover:-translate-y-[2px] duration-150 text-nowrap">
                Alex Perry
              </span>
              <span className="text-p3y-gunmetal dark:text-p3y-grey text-nowrap">
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
              <span className="text-p3y-gunmetal dark:text-p3y-grey">
                AMSTERDAM
              </span>
              <span className="pl-3">🌷</span>
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
              <span className="text-p3y-gunmetal dark:text-p3y-grey">WORK</span>
              <span className="pl-3">💻</span>
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
              <span className="text-p3y-gunmetal dark:text-p3y-grey">
                EMAIL
              </span>
              <span className="pl-3">📫</span>
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
              <span className="text-p3y-gunmetal dark:text-p3y-grey">GAME</span>
              <span className="pl-3">🕹️</span>
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HomepageHello;
