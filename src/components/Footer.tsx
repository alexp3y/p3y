'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col w-full lato border-t-p3y-red border-t text-p3y-red">
      <div className="w-full p-4 flex text-[18px] h-[60px] justify-between items-center px-8">
        {/* social links container*/}
        <div className="flex items-center justify-between  md:items-center gap-4">
          <div>
            <a
              href="https://www.linkedin.com/in/alexmperry/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/images/linkedin.svg"
                alt="LinkedIn"
                height="36"
                width="36"
              />
            </a>
          </div>
          <div>
            <a
              href="https://github.com/alexp3y"
              target="_blank"
              rel="noreferrer noopener"
            >
              {theme === 'dark' ? (
                <Image
                  src="/images/github-light.svg"
                  alt="GitHub"
                  height="36"
                  width="36"
                />
              ) : (
                <Image
                  src="/images/github.svg"
                  alt="GitHub"
                  height="36"
                  width="36"
                />
              )}
            </a>
          </div>
        </div>
        <div className="flex lato gap-x-1 items-center">
          <p>&copy;</p>
          <span>2024</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
