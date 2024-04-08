'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import cn from 'classnames';

interface Props {}

const NavBar: React.FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    console.log(theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="w-full px-6 py-2 border-b border-p3y-red flex justify-between items-center text-p3y-red">
      <span className="text-3xl tracking-tighter text-p3y-red border-2 border-p3y-red rounded-[4px] px-[8px] pt-0 pb-[4px] dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer active:border-p3y-maize active:text-p3y-maize active:bg-p3y-blue">
        p3y
      </span>
      <div className="flex h-full items-center text-[18px] gap-x-8 mr-12">
        <span>About</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
      <div className="">
        <div className="flex flex-col items-center justify-center gap-y-2 relative h-[25px] w-[44px]">
          <label className="switch w-1/2">
            <input
              checked={theme === 'dark'}
              type="checkbox"
              onChange={toggleTheme}
            />
            <span
              className={cn(
                'slider absolute cursor-pointer bg-p3y-red rounded-xl before:transition-transform before:duration-300 before:rounded-full',
                {
                  'before:translate-x-0 before:bg-p3y-ivory': theme !== 'dark',
                  'before:translate-x-[18px] before:bg-p3y-gunmetal':
                    theme === 'dark',
                }
              )}
            ></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
