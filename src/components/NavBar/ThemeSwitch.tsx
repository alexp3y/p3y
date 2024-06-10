'use client';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
    <div className="flex flex-col items-center justify-center gap-y-2 relative h-[25px] w-[44px]">
      <label className="switch w-1/2 border-p3y-olive dark:border-p3y-ivory border-[1px] rounded-full">
        <input
          checked={
            typeof window !== 'undefined'
              ? theme
                ? theme === 'dark'
                : window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches
              : true
          }
          type="checkbox"
          onChange={toggleTheme}
        />
        <span
          className={
            'slider absolute cursor-pointer bg-p3y-grey dark:bg-p3y-red  rounded-xl before:transition-transform before:duration-300 before:rounded-full before:bg-p3y-ivory'
          }
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
