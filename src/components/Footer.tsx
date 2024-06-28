import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-p3y-ivory dark:bg-p3y-gunmetal flex flex-col w-full lato border-t-p3y-red border-t text-p3y-red">
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
                className="dark:hidden block"
                src={'/images/linkedin.svg'}
                alt="GitHub"
                height="34"
                width="34"
              />
              <Image
                className="dark:block hidden"
                src={'/images/linkedin-light.svg'}
                alt="GitHub"
                height="34"
                width="34"
              />
            </a>
          </div>
          <div>
            <a
              href="https://github.com/alexp3y"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                className="dark:hidden block"
                src={'/images/github.svg'}
                alt="GitHub"
                height="36"
                width="36"
              />
              <Image
                className="dark:block hidden"
                src={'/images/github-light.svg'}
                alt="GitHub"
                height="36"
                width="36"
              />
            </a>
          </div>
        </div>
        <div className="flex lato gap-x-1 items-center">
          <p>&copy;</p>
          <span>2024</span>{' '}
          <span className="border border-p3y-red rounded-[2px] pt-[0px] pb-[1px] px-[4px] text-base anta ml-1 ">
            p3y
          </span>{' '}
        </div>
      </div>
    </div>
  );
};

export default Footer;
