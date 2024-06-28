'use client';

import Link from 'next/link';
import React from 'react';
import Logo from './NavBar/Logo';
import MobileMenuButton from './NavBar/MobileMenuButton';
import ThemeSwitch from './NavBar/ThemeSwitch';

interface Props {}

const NavBar: React.FC<Props> = () => {
  return (
    <div className="w-full md:px-6 px-4 pt-3 pb-2 border-b border-p3y-red flex justify-between bg-p3y-ivory dark:bg-p3y-gunmetal items-center text-p3y-red lato h-[60px]">
      <Logo />
      <div className="hidden md:flex h-full items-center text-[16px] gap-x-11 lg:gap-x-16 mr-12 uppercase text-sm anta text-p3y-red">
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
      <div className="hidden md:block">
        <ThemeSwitch />
      </div>
      <div className="md:hidden">
        <MobileMenuButton />
      </div>
    </div>
  );
};

export default NavBar;
