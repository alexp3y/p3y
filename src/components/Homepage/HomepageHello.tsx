'use client';
import Link from 'next/link';
import React from 'react';

const HomepageHello: React.FC = () => {
  return (
    <div className="mb-[20vh] mt-12 rounded-none sm:bgp3y-red sm:dark:bgp3y-red max-w-xl ml-8 mr-12 relative sm:shadowlg">
      <div className="absolute h-full w-full sm:bgp3y-blue rounded-none translate-x-6 -translate-y-8 sm:shadowlg"></div>
      <div className="cursor-default w-fit min-w-full rounded-none md:text-2xl anta flex flex-col gap-y-4 text-2xl dark:text-p3y-grey text-center justify-center sm:border2 sm:shadowlg border-p3y-gunmetal translate-x-3 bg-p3y-grey dark:bg-p3y-gunmetal -translate-y-4 p-6 sm:p-6  py-6 sm4 dark:border-p3y-grey relative">
        <Link href="/about">
          <div className="group text-5xl pb-2 flex flex-col justify-center items-center">
            <span className="text-nowrap group-hover:bg-opacity-80 px-4 rounded-sm">
              {"Hi there, I'm"}{' '}
            </span>
            <span className="relative group-hover:bg-opacity-80 active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap px-4 rounded-sm">
              <span className="absolute translate-x-[2px] -translate-y-[2px] group-hover:translate-x-[4px] group-hover:-translate-y-[4px] duration-500 text-nowrap">
                Alex Perry
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue text-nowrap">
                Alex Perry
              </span>
            </span>
          </div>
        </Link>
        <Link
          href="https://www.youtube.com/watch?v=sEON08d76oE"
          target="_blank"
          rel="noreferrer"
        >
          <span className="group hover:bg-opacity-80 rounded-md px-4 py-2 hover:border dark:hover:border-p3y-maize hover:border-p3y-red">
            I build software in{' '}
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap">
              <span className="absolute translate-x-[1px] -translate-y-[1px] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] duration-500">
                Amsterdam
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">
                Amsterdam
              </span>
            </span>
          </span>
        </Link>
        <Link href="/projects">
          <span className="group hover:bg-opacity-80 rounded-md px-4 py-2 hover:border dark:hover:border-p3y-maize hover:border-p3y-red">
            Checkout some of my{' '}
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap ">
              <span className="absolute translate-x-[1px] -translate-y-[1px] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] duration-500">
                work
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">work</span>
            </span>
          </span>
        </Link>
        <Link
          href="mailto:alexp3y@gmail.com?subject=Hello"
          target="_blank"
          rel="noreferrer"
        >
          <span className="group hover:bg-opacity-80 rounded-md px-4 py-2 hover:border dark:hover:border-p3y-maize hover:border-p3y-red">
            Send me a hello via{' '}
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap ">
              <span className="absolute translate-x-[1px] -translate-y-[1px] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] duration-500">
                email
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">email</span>
            </span>
          </span>
        </Link>
        <Link href="/colorflu">
          <span className="group hover:bg-opacity-80 rounded-md px-4 py-2 hover:border dark:hover:border-p3y-maize hover:border-p3y-red">
            Or try your hand at a{' '}
            <span className="active:text-p3y-blue dark:active:text-p3y-maize text-p3y-red text-nowrap">
              <span className="absolute translate-x-[1px] -translate-y-[1px] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] duration-500">
                game
              </span>
              <span className="text-p3y-blue dark:text-p3y-blue">game</span>
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomepageHello;
