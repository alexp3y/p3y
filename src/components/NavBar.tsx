'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ColorfluTitleBar from './Colorflu/ColorfluTitleBar';
import Link from 'next/link';
import Logo from './NavBar/Logo';

interface Props {}

const NavBar: React.FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  useEffect(() => {
    setTheme(
      theme && theme !== 'system'
        ? theme
        : window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);

  return (
    <div className="w-full md:px-6 px-4 pt-2 pb-3 border-b border-p3y-red flex justify-between bg-p3y-ivory dark:bg-p3y-gunmetal items-center text-p3y-red lato h-[60px]">
      <Logo />
      <div className="hidden md:flex h-full items-center text-[16px] gap-x-8 mr-12">
        <>
          <Link href="/about">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize">
              About
            </span>
          </Link>
          <Link href="/projects">
            <span className="active:text-p3y-blue dark:active:text-p3y-maize">
              Projects
            </span>
          </Link>
          <Link
            href="mailto:alexp3y@gmail.com?subject=Hello"
            target="_blank"
            rel="noreferrer"
          >
            <span className="active:text-p3y-blue dark:active:text-p3y-maize">
              Contact
            </span>
          </Link>
        </>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2 relative h-[25px] w-[44px]">
        {typeof window !== 'undefined' && (
          <label className="switch w-1/2">
            <input
              checked={
                theme
                  ? theme === 'dark'
                  : window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
              }
              type="checkbox"
              onChange={toggleTheme}
            />
            <span
              className={
                'slider absolute cursor-pointer bg-p3y-red rounded-xl before:transition-transform before:duration-300 before:rounded-full before:bg-p3y-ivory'
              }
            ></span>
          </label>
        )}
      </div>
    </div>
  );
};

export default NavBar;
