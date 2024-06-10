import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="bg-p3y-gunmetal dark:bg-p3y-blue rounded-[3px]">
        <span className="text-[30px] tracking-[0px] leading-none text-p3y-red border-[2px] border-p3y-red rounded-[3px] px-[4px] pb-[6px] pt-[2px]  dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer active:border-p3y-blue active:text-p3y-blue dark:active:border-p3y-maize dark:active:text-p3y-maize -translate-y-[4px] translate-x-[4px] z-20 flex shadow-xl">
          p3y
        </span>
      </div>
    </Link>
  );
};

export default Logo;
