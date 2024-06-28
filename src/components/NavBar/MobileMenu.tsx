'use client';
import React, { useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, close }) => {
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };
  const handleLinkClick = () => {
    close();
    return false;
  };

  useEffect(() => {
    function handleClickAway(this: HTMLBodyElement, e: MouseEvent) {
      const menuContainer = (e.target as any).closest('#side-menu');
      if (!menuContainer) {
        close();
      }
    }
    if (isOpen) {
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickAway);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        body.removeEventListener('click', handleClickAway);
        document.removeEventListener('keydown', handleEscapeKey);
        close();
      };
    }
  }, [isOpen]);

  return (
    <div
      id="side-menu"
      className={cn(
        'fixed right-0 top-0 z-10 h-full bg-p3y-ivory dark:bg-p3y-gunmetal font-normal tracking-wide transition-all duration-500 md:transition-width  text-p3y-red border-p3y-red',
        {
          'w-0': !isOpen,
          'w-full sm:w-96 border-l': isOpen,
        }
      )}
    >
      <div
        className={cn(
          'float-right flex h-screen w-full flex-col justify-between overflow-hidden transition-all duration-500 md:transition-all',
          {
            'w-0': !isOpen,
            'w-full sm:w-96': isOpen,
          }
        )}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between pt-10 pb-[100px] px-7">
            <div onClick={close}>
              <Logo />
            </div>
            <button
              className={'w-fit aspect-square rounded-full'}
              onClick={close}
            >
              <div className="w-7 -translate-x-[0px] rotate-45 border-b-2"></div>
              <div className="w-7 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-2" />
            </button>
          </div>
          <Link href={'/about'}>
            <div
              className={cn(
                'group flex w-full cursor-pointer items-center gap-x-[20px] pl-10 transition-none duration-500 md:pl-0 md:transition-all anta'
              )}
              onClick={handleLinkClick}
            >
              <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 md:group-hover:underline">
                About
              </span>
            </div>
          </Link>
          <Link href={'/projects'}>
            <div
              className={cn(
                'group flex w-full cursor-pointer items-center gap-x-[20px] pl-10 transition-none duration-500 md:pl-0 md:transition-all anta'
              )}
              onClick={handleLinkClick}
            >
              <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 md:group-hover:underline">
                Projects
              </span>
            </div>
          </Link>
          <Link
            href="mailto:alexp3y@gmail.com?subject=Hello"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                'group flex w-full cursor-pointer items-center gap-x-[20px] pl-10 transition-none duration-500 md:pl-0 md:transition-all anta'
              )}
              onClick={handleLinkClick}
            >
              <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 md:group-hover:underline">
                Contact
              </span>
            </div>
          </Link>
          <div className="pl-10 pt-16">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
