import Image from 'next/image';
import React from 'react';
import FooterLogo from './Footer/FooterLogo';

const Footer: React.FC = () => {
  return (
    <div className="bg-p3y-grey dark:bg-p3y-gunmetal flex flex-col w-full lato border-t dark:text-p3y-grey">
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
        <div className="flex lato gap-x-2 items-center text-p3y-gunmetal dark:text-p3y-grey">
          <div className="flex items-center gap-x-1">
            <p>&copy;</p>
            <span>2024</span>
          </div>
          <FooterLogo />
        </div>
      </div>
    </div>
  );
};

export default Footer;
